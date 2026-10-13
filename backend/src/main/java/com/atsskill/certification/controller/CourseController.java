package com.atsskill.certification.controller;

import com.atsskill.certification.dto.ApiResponse;
import com.atsskill.certification.dto.CourseDto;
import com.atsskill.certification.dto.CourseEligibilityDto;
import com.atsskill.certification.security.UserPrincipal;
import com.atsskill.certification.service.CourseService;
import com.atsskill.certification.service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/courses")
public class CourseController {

    private final CourseService courseService;
    private final QuizService quizService;

    public CourseController(CourseService courseService, QuizService quizService) {
        this.courseService = courseService;
        this.quizService = quizService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CourseDto>>> getCourses(
            @RequestParam(required = false) String category) {
        List<CourseDto> courses = courseService.getPublishedCourses(category);
        return ResponseEntity.ok(ApiResponse.ok(courses));
    }

    @GetMapping("/{idOrSlug}")
    public ResponseEntity<ApiResponse<CourseDto>> getCourse(@PathVariable String idOrSlug) {
        CourseDto course = courseService.getCourseByIdOrSlug(idOrSlug);
        return ResponseEntity.ok(ApiResponse.ok(course));
    }

    @GetMapping("/{courseId}/eligibility")
    public ResponseEntity<ApiResponse<CourseEligibilityDto>> checkEligibility(
            @PathVariable String courseId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        if (userPrincipal == null) {
            return ResponseEntity.ok(ApiResponse.ok(new CourseEligibilityDto(false, "Login required to check eligibility", 0, 1, false, null, null)));
        }
        CourseEligibilityDto eligibility = quizService.checkEligibility(courseId, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.ok(eligibility));
    }
}
