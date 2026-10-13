package com.atsskill.certification.service;

import com.atsskill.certification.dto.CourseCreateRequest;
import com.atsskill.certification.dto.CourseDto;
import com.atsskill.certification.exception.BadRequestException;
import com.atsskill.certification.exception.ConflictException;
import com.atsskill.certification.exception.ResourceNotFoundException;
import com.atsskill.certification.model.Course;
import com.atsskill.certification.model.CourseStatus;
import com.atsskill.certification.repository.CourseRepository;
import com.atsskill.certification.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final QuestionRepository questionRepository;
    private final AuditLogService auditLogService;

    public CourseService(CourseRepository courseRepository, QuestionRepository questionRepository, AuditLogService auditLogService) {
        this.courseRepository = courseRepository;
        this.questionRepository = questionRepository;
        this.auditLogService = auditLogService;
    }

    public List<CourseDto> getPublishedCourses(String category) {
        List<Course> courses;
        if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("ALL")) {
            courses = courseRepository.findByCategoryAndStatus(category.trim(), CourseStatus.PUBLISHED);
        } else {
            courses = courseRepository.findByStatus(CourseStatus.PUBLISHED);
        }
        return courses.stream().map(CourseDto::fromEntity).toList();
    }

    public CourseDto getCourseByIdOrSlug(String identifier) {
        Course course = courseRepository.findById(identifier)
                .or(() -> courseRepository.findBySlug(identifier))
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id or slug: " + identifier));
        return CourseDto.fromEntity(course);
    }

    public Course getCourseEntity(String courseId) {
        return courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));
    }

    public Page<CourseDto> getAllCoursesAdmin(Pageable pageable) {
        return courseRepository.findAll(pageable).map(CourseDto::fromEntity);
    }

    public CourseDto createCourse(CourseCreateRequest request, String adminId) {
        String slug = request.getSlug();
        if (slug == null || slug.trim().isEmpty()) {
            slug = generateSlug(request.getTitle());
        } else {
            slug = slug.trim().toLowerCase().replaceAll("[^a-z0-9]+", "-");
        }

        if (courseRepository.existsBySlug(slug)) {
            slug = slug + "-" + System.currentTimeMillis() % 10000;
        }

        Course course = new Course(
                request.getTitle().trim(),
                slug,
                request.getCategory().trim(),
                request.getDescription().trim(),
                request.getDurationMinutes(),
                request.getQuestionCount(),
                request.getPassingPercentage(),
                request.getMaxAttempts(),
                request.getStatus()
        );
        course.setSyllabus(request.getSyllabus() != null ? request.getSyllabus() : List.of());
        course.setCreatedBy(adminId);
        course.setCreatedAt(Instant.now());

        if (course.getStatus() == CourseStatus.PUBLISHED) {
            validatePublicationPrerequisites(course);
        }

        Course saved = courseRepository.save(course);
        auditLogService.logAction(adminId, "COURSE_CREATED", "COURSE", saved.getId(), Map.of("title", saved.getTitle(), "slug", saved.getSlug()));
        return CourseDto.fromEntity(saved);
    }

    public CourseDto updateCourse(String courseId, CourseCreateRequest request, String adminId) {
        Course course = getCourseEntity(courseId);

        course.setTitle(request.getTitle().trim());
        course.setCategory(request.getCategory().trim());
        course.setDescription(request.getDescription().trim());
        course.setSyllabus(request.getSyllabus() != null ? request.getSyllabus() : List.of());
        course.setDurationMinutes(request.getDurationMinutes());
        course.setQuestionCount(request.getQuestionCount());
        course.setPassingPercentage(request.getPassingPercentage());
        course.setMaxAttempts(request.getMaxAttempts());
        course.setStatus(request.getStatus());
        course.setUpdatedAt(Instant.now());

        if (course.getStatus() == CourseStatus.PUBLISHED) {
            validatePublicationPrerequisites(course);
        }

        Course saved = courseRepository.save(course);
        auditLogService.logAction(adminId, "COURSE_UPDATED", "COURSE", saved.getId(), Map.of("title", saved.getTitle()));
        return CourseDto.fromEntity(saved);
    }

    public void deleteCourse(String courseId, String adminId) {
        Course course = getCourseEntity(courseId);
        questionRepository.deleteByCourseId(courseId);
        courseRepository.delete(course);
        auditLogService.logAction(adminId, "COURSE_DELETED", "COURSE", courseId, Map.of("title", course.getTitle()));
    }

    private void validatePublicationPrerequisites(Course course) {
        if (course.getId() != null) {
            long activeQuestions = questionRepository.countByCourseIdAndActiveTrue(course.getId());
            if (activeQuestions < course.getQuestionCount()) {
                throw new BadRequestException("Cannot publish course: Available active questions ("
                        + activeQuestions + ") is less than required question count (" + course.getQuestionCount() + ")");
            }
        }
    }

    private String generateSlug(String title) {
        return title.toLowerCase().trim()
                .replaceAll("[^a-z0-9\\s]", "")
                .replaceAll("\\s+", "-");
    }
}
