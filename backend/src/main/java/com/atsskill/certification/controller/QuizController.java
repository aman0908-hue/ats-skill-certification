package com.atsskill.certification.controller;

import com.atsskill.certification.dto.ApiResponse;
import com.atsskill.certification.dto.QuizResultDto;
import com.atsskill.certification.dto.StartQuizResponse;
import com.atsskill.certification.dto.SubmitQuizRequest;
import com.atsskill.certification.model.User;
import com.atsskill.certification.repository.UserRepository;
import com.atsskill.certification.security.UserPrincipal;
import com.atsskill.certification.service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class QuizController {

    private final QuizService quizService;
    private final UserRepository userRepository;

    public QuizController(QuizService quizService, UserRepository userRepository) {
        this.quizService = quizService;
        this.userRepository = userRepository;
    }

    @PostMapping("/courses/{courseId}/attempts")
    public ResponseEntity<ApiResponse<StartQuizResponse>> startQuiz(
            @PathVariable String courseId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        User student = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        StartQuizResponse response = quizService.startQuiz(courseId, student);
        return ResponseEntity.ok(ApiResponse.ok("Quiz started successfully", response));
    }

    @GetMapping("/attempts/{attemptId}")
    public ResponseEntity<ApiResponse<StartQuizResponse>> getAttempt(
            @PathVariable String attemptId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        StartQuizResponse response = quizService.getAttempt(attemptId, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.ok(response));
    }

    @PostMapping("/attempts/{attemptId}/submit")
    public ResponseEntity<ApiResponse<QuizResultDto>> submitQuiz(
            @PathVariable String attemptId,
            @RequestBody SubmitQuizRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        User student = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        QuizResultDto result = quizService.submitQuiz(attemptId, request, student);
        return ResponseEntity.ok(ApiResponse.ok("Quiz submitted successfully", result));
    }

    @GetMapping("/attempts/{attemptId}/result")
    public ResponseEntity<ApiResponse<QuizResultDto>> getAttemptResult(
            @PathVariable String attemptId,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        QuizResultDto result = quizService.getAttemptResult(attemptId, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.ok(result));
    }
}
