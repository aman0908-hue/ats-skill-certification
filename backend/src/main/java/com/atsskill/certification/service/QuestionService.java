package com.atsskill.certification.service;

import com.atsskill.certification.dto.QuestionAdminDto;
import com.atsskill.certification.dto.QuestionCreateRequest;
import com.atsskill.certification.exception.BadRequestException;
import com.atsskill.certification.exception.ResourceNotFoundException;
import com.atsskill.certification.model.Question;
import com.atsskill.certification.model.QuestionOption;
import com.atsskill.certification.repository.CourseRepository;
import com.atsskill.certification.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final CourseRepository courseRepository;
    private final AuditLogService auditLogService;

    public QuestionService(QuestionRepository questionRepository, CourseRepository courseRepository, AuditLogService auditLogService) {
        this.questionRepository = questionRepository;
        this.courseRepository = courseRepository;
        this.auditLogService = auditLogService;
    }

    public List<QuestionAdminDto> getQuestionsByCourse(String courseId) {
        return questionRepository.findByCourseIdAndActiveTrue(courseId).stream()
                .map(QuestionAdminDto::fromEntity)
                .toList();
    }

    public Page<QuestionAdminDto> getQuestionsByCoursePaged(String courseId, Pageable pageable) {
        return questionRepository.findByCourseId(courseId, pageable)
                .map(QuestionAdminDto::fromEntity);
    }

    public QuestionAdminDto createQuestion(String courseId, QuestionCreateRequest request, String adminId) {
        if (!courseRepository.existsById(courseId)) {
            throw new ResourceNotFoundException("Course not found with id: " + courseId);
        }

        validateQuestionData(request.getOptions(), request.getCorrectOptionIds());

        Question question = new Question(
                courseId,
                request.getQuestionText().trim(),
                request.getOptions(),
                request.getCorrectOptionIds(),
                request.getExplanation(),
                request.getDifficulty()
        );
        question.setCreatedAt(Instant.now());

        Question saved = questionRepository.save(question);
        auditLogService.logAction(adminId, "QUESTION_CREATED", "QUESTION", saved.getId(), Map.of("courseId", courseId));
        return QuestionAdminDto.fromEntity(saved);
    }

    public QuestionAdminDto updateQuestion(String questionId, QuestionCreateRequest request, String adminId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + questionId));

        validateQuestionData(request.getOptions(), request.getCorrectOptionIds());

        question.setQuestionText(request.getQuestionText().trim());
        question.setOptions(request.getOptions());
        question.setCorrectOptionIds(request.getCorrectOptionIds());
        question.setExplanation(request.getExplanation());
        question.setDifficulty(request.getDifficulty());
        question.setUpdatedAt(Instant.now());

        Question saved = questionRepository.save(question);
        auditLogService.logAction(adminId, "QUESTION_UPDATED", "QUESTION", saved.getId(), Map.of("courseId", saved.getCourseId()));
        return QuestionAdminDto.fromEntity(saved);
    }

    public void deleteQuestion(String questionId, String adminId) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + questionId));
        questionRepository.delete(question);
        auditLogService.logAction(adminId, "QUESTION_DELETED", "QUESTION", questionId, Map.of("courseId", question.getCourseId()));
    }

    public List<QuestionAdminDto> bulkCreateQuestions(String courseId, List<QuestionCreateRequest> requests, String adminId) {
        if (!courseRepository.existsById(courseId)) {
            throw new ResourceNotFoundException("Course not found with id: " + courseId);
        }
        if (requests == null || requests.isEmpty()) {
            throw new BadRequestException("Questions list cannot be empty");
        }

        java.util.List<Question> questionsToSave = new java.util.ArrayList<>();
        for (QuestionCreateRequest req : requests) {
            validateQuestionData(req.getOptions(), req.getCorrectOptionIds());
            Question q = new Question(
                    courseId,
                    req.getQuestionText().trim(),
                    req.getOptions(),
                    req.getCorrectOptionIds(),
                    req.getExplanation(),
                    req.getDifficulty() != null ? req.getDifficulty() : "MEDIUM"
            );
            q.setCreatedAt(Instant.now());
            questionsToSave.add(q);
        }

        List<Question> saved = questionRepository.saveAll(questionsToSave);
        auditLogService.logAction(adminId, "QUESTIONS_BULK_CREATED", "QUESTION", courseId, Map.of("count", saved.size()));
        return saved.stream().map(QuestionAdminDto::fromEntity).toList();
    }

    private void validateQuestionData(List<QuestionOption> options, List<String> correctOptionIds) {
        if (options == null || options.size() < 2) {
            throw new BadRequestException("A question must have at least 2 options");
        }
        if (correctOptionIds == null || correctOptionIds.isEmpty()) {
            throw new BadRequestException("At least one correct answer option must be specified");
        }

        Set<String> optionIds = options.stream().map(QuestionOption::getId).collect(Collectors.toSet());
        for (String correctId : correctOptionIds) {
            if (!optionIds.contains(correctId)) {
                throw new BadRequestException("Correct option ID '" + correctId + "' does not match any provided option");
            }
        }
    }
}
