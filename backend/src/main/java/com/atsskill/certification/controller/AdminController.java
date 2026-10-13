package com.atsskill.certification.controller;

import com.atsskill.certification.dto.*;
import com.atsskill.certification.model.CertificateTemplate;
import com.atsskill.certification.model.QuizAttempt;
import com.atsskill.certification.security.UserPrincipal;
import com.atsskill.certification.service.*;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;
    private final CourseService courseService;
    private final QuestionService questionService;
    private final CertificateService certificateService;
    private final QuizService quizService;

    public AdminController(
            AdminService adminService,
            CourseService courseService,
            QuestionService questionService,
            CertificateService certificateService,
            QuizService quizService) {
        this.adminService = adminService;
        this.courseService = courseService;
        this.questionService = questionService;
        this.certificateService = certificateService;
        this.quizService = quizService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<AdminDashboardDto>> getDashboardStats() {
        AdminDashboardDto stats = adminService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.ok(stats));
    }

    // Courses Management
    @GetMapping("/courses")
    public ResponseEntity<ApiResponse<Page<CourseDto>>> getCourses(
            @PageableDefault(size = 20) Pageable pageable) {
        Page<CourseDto> courses = courseService.getAllCoursesAdmin(pageable);
        return ResponseEntity.ok(ApiResponse.ok(courses));
    }

    @PostMapping("/courses")
    public ResponseEntity<ApiResponse<CourseDto>> createCourse(
            @Valid @RequestBody CourseCreateRequest request,
            @AuthenticationPrincipal UserPrincipal admin) {
        CourseDto course = courseService.createCourse(request, admin.getId());
        return ResponseEntity.ok(ApiResponse.ok("Course created successfully", course));
    }

    @PutMapping("/courses/{courseId}")
    public ResponseEntity<ApiResponse<CourseDto>> updateCourse(
            @PathVariable String courseId,
            @Valid @RequestBody CourseCreateRequest request,
            @AuthenticationPrincipal UserPrincipal admin) {
        CourseDto course = courseService.updateCourse(courseId, request, admin.getId());
        return ResponseEntity.ok(ApiResponse.ok("Course updated successfully", course));
    }

    @DeleteMapping("/courses/{courseId}")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(
            @PathVariable String courseId,
            @AuthenticationPrincipal UserPrincipal admin) {
        courseService.deleteCourse(courseId, admin.getId());
        return ResponseEntity.ok(ApiResponse.ok("Course deleted successfully", null));
    }

    // Question Bank Management
    @GetMapping("/courses/{courseId}/questions")
    public ResponseEntity<ApiResponse<List<QuestionAdminDto>>> getCourseQuestions(
            @PathVariable String courseId) {
        List<QuestionAdminDto> questions = questionService.getQuestionsByCourse(courseId);
        return ResponseEntity.ok(ApiResponse.ok(questions));
    }

    @PostMapping("/courses/{courseId}/questions")
    public ResponseEntity<ApiResponse<QuestionAdminDto>> createQuestion(
            @PathVariable String courseId,
            @Valid @RequestBody QuestionCreateRequest request,
            @AuthenticationPrincipal UserPrincipal admin) {
        QuestionAdminDto question = questionService.createQuestion(courseId, request, admin.getId());
        return ResponseEntity.ok(ApiResponse.ok("Question created successfully", question));
    }

    @PutMapping("/questions/{questionId}")
    public ResponseEntity<ApiResponse<QuestionAdminDto>> updateQuestion(
            @PathVariable String questionId,
            @Valid @RequestBody QuestionCreateRequest request,
            @AuthenticationPrincipal UserPrincipal admin) {
        QuestionAdminDto question = questionService.updateQuestion(questionId, request, admin.getId());
        return ResponseEntity.ok(ApiResponse.ok("Question updated successfully", question));
    }

    @DeleteMapping("/questions/{questionId}")
    public ResponseEntity<ApiResponse<Void>> deleteQuestion(
            @PathVariable String questionId,
            @AuthenticationPrincipal UserPrincipal admin) {
        questionService.deleteQuestion(questionId, admin.getId());
        return ResponseEntity.ok(ApiResponse.ok("Question deleted successfully", null));
    }

    // Students Directory
    @GetMapping("/students")
    public ResponseEntity<ApiResponse<Page<UserProfileResponse>>> getStudents(
            @PageableDefault(size = 20) Pageable pageable) {
        Page<UserProfileResponse> students = adminService.getStudentsPaged(pageable);
        return ResponseEntity.ok(ApiResponse.ok(students));
    }

    // Quiz Attempts Log
    @GetMapping("/attempts")
    public ResponseEntity<ApiResponse<Page<QuizAttempt>>> getAttempts(
            @PageableDefault(size = 20) Pageable pageable) {
        Page<QuizAttempt> attempts = quizService.getAllAttemptsAdmin(pageable);
        return ResponseEntity.ok(ApiResponse.ok(attempts));
    }

    // Certificates Administration
    @GetMapping("/certificates")
    public ResponseEntity<ApiResponse<Page<CertificateDto>>> getCertificates(
            @RequestParam(required = false) String search,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<CertificateDto> certificates = certificateService.getAllCertificatesAdmin(search, pageable);
        return ResponseEntity.ok(ApiResponse.ok(certificates));
    }

    @PostMapping("/certificates/{certificateId}/revoke")
    public ResponseEntity<ApiResponse<CertificateDto>> revokeCertificate(
            @PathVariable String certificateId,
            @Valid @RequestBody RevokeCertificateRequest request,
            @AuthenticationPrincipal UserPrincipal admin) {
        CertificateDto cert = certificateService.revokeCertificate(certificateId, request, admin.getId());
        return ResponseEntity.ok(ApiResponse.ok("Certificate revoked successfully", cert));
    }

    // Certificate Template Studio
    @GetMapping("/certificate-templates/active")
    public ResponseEntity<ApiResponse<CertificateTemplate>> getActiveTemplate() {
        CertificateTemplate template = adminService.getActiveTemplate();
        return ResponseEntity.ok(ApiResponse.ok(template));
    }

    @PutMapping("/certificate-templates/active")
    public ResponseEntity<ApiResponse<CertificateTemplate>> updateActiveTemplate(
            @RequestBody CertificateTemplate template) {
        CertificateTemplate updated = adminService.updateActiveTemplate(template);
        return ResponseEntity.ok(ApiResponse.ok("Template updated successfully", updated));
    }

    @PostMapping("/courses/{courseId}/questions/bulk")
    public ResponseEntity<ApiResponse<List<QuestionAdminDto>>> bulkCreateQuestions(
            @PathVariable String courseId,
            @Valid @RequestBody List<QuestionCreateRequest> requests,
            @AuthenticationPrincipal UserPrincipal admin) {
        List<QuestionAdminDto> created = questionService.bulkCreateQuestions(courseId, requests, admin.getId());
        return ResponseEntity.ok(ApiResponse.ok("Questions imported successfully: " + created.size() + " added", created));
    }

    @PostMapping(value = "/certificate-templates/upload-background", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<CertificateTemplate>> uploadTemplateBackground(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal UserPrincipal admin) {
        CertificateTemplate updated = adminService.uploadTemplateBackground(file, admin.getId());
        return ResponseEntity.ok(ApiResponse.ok("Certificate background updated successfully", updated));
    }

    @PostMapping("/certificate-templates/preview")
    public ResponseEntity<byte[]> previewTemplate(@RequestBody CertificateTemplate template) {
        byte[] pdfBytes = certificateService.renderPreviewPdf(template);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"preview-certificate.pdf\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
}
