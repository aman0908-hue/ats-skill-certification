package com.atsskill.certification.service;

import com.atsskill.certification.dto.AdminDashboardDto;
import com.atsskill.certification.dto.CourseSummaryDto;
import com.atsskill.certification.dto.UserProfileResponse;
import com.atsskill.certification.exception.ResourceNotFoundException;
import com.atsskill.certification.model.CertificateStatus;
import com.atsskill.certification.model.CertificateTemplate;
import com.atsskill.certification.model.CourseStatus;
import com.atsskill.certification.model.Role;
import com.atsskill.certification.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final QuizAttemptRepository attemptRepository;
    private final CertificateRepository certificateRepository;
    private final CertificateTemplateRepository templateRepository;

    private final AuditLogService auditLogService;

    public AdminService(
            UserRepository userRepository,
            CourseRepository courseRepository,
            QuizAttemptRepository attemptRepository,
            CertificateRepository certificateRepository,
            CertificateTemplateRepository templateRepository,
            AuditLogService auditLogService) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.attemptRepository = attemptRepository;
        this.certificateRepository = certificateRepository;
        this.templateRepository = templateRepository;
        this.auditLogService = auditLogService;
    }

    public AdminDashboardDto getDashboardStats() {
        AdminDashboardDto dto = new AdminDashboardDto();
        dto.setTotalStudents(userRepository.countByRole(Role.STUDENT));
        dto.setTotalCourses(courseRepository.count());
        dto.setTotalPublishedCourses(courseRepository.countByStatus(CourseStatus.PUBLISHED));
        long attemptsCount = attemptRepository.count();
        dto.setTotalQuizAttempts(attemptsCount);

        long certCount = certificateRepository.count();
        dto.setTotalCertificatesIssued(certCount);
        dto.setTotalRevokedCertificates(certificateRepository.countByStatus(CertificateStatus.REVOKED));

        double passRate = (attemptsCount > 0) ? ((double) certCount / attemptsCount) * 100.0 : 0.0;
        dto.setOverallPassRatePercentage(Math.round(passRate * 10.0) / 10.0);

        List<CourseSummaryDto> popular = courseRepository.findAll().stream()
                .map(c -> new CourseSummaryDto(
                        c.getId(),
                        c.getTitle(),
                        c.getCategory(),
                        attemptRepository.countByCourseId(c.getId()),
                        0
                ))
                .limit(6)
                .toList();
        dto.setPopularCourses(popular);

        return dto;
    }

    public Page<UserProfileResponse> getStudentsPaged(Pageable pageable) {
        return userRepository.findByRole(Role.STUDENT, pageable)
                .map(u -> new UserProfileResponse(u.getId(), u.getFullName(), u.getEmail(), u.getRole(), u.getAcademicBranch(), u.isEmailVerified(), u.getCreatedAt()));
    }

    public CertificateTemplate getActiveTemplate() {
        return templateRepository.findByActiveTrue()
                .orElseThrow(() -> new ResourceNotFoundException("Active certificate template not found"));
    }

    public CertificateTemplate updateActiveTemplate(CertificateTemplate updated) {
        CertificateTemplate existing = getActiveTemplate();
        existing.setFieldPositions(updated.getFieldPositions());
        existing.setName(updated.getName());
        return templateRepository.save(existing);
    }

    public CertificateTemplate uploadTemplateBackground(org.springframework.web.multipart.MultipartFile file, String adminId) {
        if (file == null || file.isEmpty()) {
            throw new com.atsskill.certification.exception.BadRequestException("Uploaded file cannot be empty");
        }

        try {
            byte[] bytes = file.getBytes();
            java.io.File[] targets = new java.io.File[] {
                    new java.io.File("backend/src/main/resources/static/certificate-template.jpg"),
                    new java.io.File("src/main/resources/static/certificate-template.jpg"),
                    new java.io.File("backend/target/classes/static/certificate-template.jpg"),
                    new java.io.File("target/classes/static/certificate-template.jpg"),
                    new java.io.File("frontend/public/certificate-template.jpg"),
                    new java.io.File("../frontend/public/certificate-template.jpg")
            };

            for (java.io.File target : targets) {
                if (target.getParentFile() != null && !target.getParentFile().exists()) {
                    target.getParentFile().mkdirs();
                }
                if (target.getParentFile() != null && target.getParentFile().exists()) {
                    java.nio.file.Files.write(target.toPath(), bytes);
                }
            }

            CertificateTemplate template = getActiveTemplate();
            template.setVersion("v" + System.currentTimeMillis());
            CertificateTemplate saved = templateRepository.save(template);

            auditLogService.logAction(adminId, "CERTIFICATE_TEMPLATE_UPLOADED", "TEMPLATE", saved.getId(),
                    java.util.Map.of("filename", file.getOriginalFilename() != null ? file.getOriginalFilename() : "custom.jpg",
                            "size", bytes.length));

            return saved;
        } catch (java.io.IOException e) {
            throw new RuntimeException("Failed to store uploaded certificate background: " + e.getMessage(), e);
        }
    }
}
