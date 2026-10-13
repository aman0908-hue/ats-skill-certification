package com.atsskill.certification.security;

import com.atsskill.certification.model.*;
import com.atsskill.certification.repository.CertificateTemplateRepository;
import com.atsskill.certification.repository.CourseRepository;
import com.atsskill.certification.repository.QuestionRepository;
import com.atsskill.certification.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.*;

@Component
public class AdminBootstrapService implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(AdminBootstrapService.class);

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final QuestionRepository questionRepository;
    private final CertificateTemplateRepository templateRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email:admin@atsskill.com}")
    private String adminEmail;

    @Value("${app.admin.password:Admin@ATS2026}")
    private String adminPassword;

    @Value("${app.admin.name:ATS Administrator}")
    private String adminName;

    public AdminBootstrapService(
            UserRepository userRepository,
            CourseRepository courseRepository,
            QuestionRepository questionRepository,
            CertificateTemplateRepository templateRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.questionRepository = questionRepository;
        this.templateRepository = templateRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        bootstrapAdminUser();
        bootstrapCertificateTemplate();
        bootstrapSampleCoursesAndQuestions();
    }

    private void bootstrapAdminUser() {
        if (!userRepository.existsByEmail(adminEmail.toLowerCase().trim())) {
            User admin = new User(
                    adminName,
                    adminEmail.toLowerCase().trim(),
                    passwordEncoder.encode(adminPassword),
                    Role.ADMIN
            );
            admin.setEmailVerified(true);
            admin.setActive(true);
            admin.setCreatedAt(Instant.now());
            userRepository.save(admin);
            logger.info(">>> Initial Administrator account bootstrapped for email: {}", adminEmail);
        }
    }

    private void bootstrapCertificateTemplate() {
        if (templateRepository.findByActiveTrue().isEmpty()) {
            CertificateTemplate template = new CertificateTemplate();
            template.setName("Official ATS Skill Certification Template");
            template.setTemplateAssetPath("templates/certificate-template.png");
            template.setPageWidth(1123);
            template.setPageHeight(794);
            template.setOrientation("LANDSCAPE");
            template.setActive(true);
            template.setVersion("v1.0");

            Map<String, FieldCoordinate> fieldPositions = new HashMap<>();
            fieldPositions.put("studentName", new FieldCoordinate(50.0, 48.0, 36, "Playfair Display, Georgia, serif", "#0F172A", "center"));
            fieldPositions.put("courseName", new FieldCoordinate(50.0, 61.6, 20, "Outfit, Inter, sans-serif", "#0D9488", "center"));
            fieldPositions.put("certificateNumber", new FieldCoordinate(22.0, 82.0, 12, "Inter, monospace", "#475569", "left"));
            fieldPositions.put("issueDate", new FieldCoordinate(50.0, 82.0, 12, "Inter, sans-serif", "#475569", "center"));
            fieldPositions.put("qrCode", new FieldCoordinate(82.0, 78.0, 0, "", "#000000", "center"));

            template.setFieldPositions(fieldPositions);
            templateRepository.save(template);
            logger.info(">>> Active certificate template initialized.");
        }
    }

    private void bootstrapSampleCoursesAndQuestions() {
        logger.info(">>> Verifying and seeding domain specialization courses (Cyber Job Simulation, Python Data Science, DevOps, etc.)...");

        for (CourseSeedData.SeedCoursePackage pkg : CourseSeedData.getSeedPackages()) {
            Optional<Course> existingOpt = courseRepository.findBySlug(pkg.course.getSlug());
            Course course;
            if (existingOpt.isEmpty()) {
                course = courseRepository.save(pkg.course);
                logger.info(">>> Seeded industry certification course: {} (Duration: {} mins, Questions: {})",
                        course.getTitle(), course.getDurationMinutes(), course.getQuestionCount());
            } else {
                course = existingOpt.get();
                course.setTitle(pkg.course.getTitle());
                course.setCategory(pkg.course.getCategory());
                course.setDescription(pkg.course.getDescription());
                course.setSyllabus(pkg.course.getSyllabus());
                course.setDurationMinutes(35);
                course.setQuestionCount(30);
                course.setPassingPercentage(60);
                course = courseRepository.save(course);
            }

            long currentQCount = questionRepository.countByCourseId(course.getId());
            if (currentQCount < 30) {
                for (Question q : pkg.questions) {
                    q.setCourseId(course.getId());
                    q.setCreatedAt(Instant.now());
                }
                questionRepository.saveAll(pkg.questions);
                logger.info(">>> Seeded {} MCQs for course: {}", pkg.questions.size(), course.getTitle());
            }
        }
    }
}
