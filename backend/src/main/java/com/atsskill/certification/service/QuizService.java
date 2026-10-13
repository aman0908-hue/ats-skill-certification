package com.atsskill.certification.service;

import com.atsskill.certification.dto.*;
import com.atsskill.certification.exception.BadRequestException;
import com.atsskill.certification.exception.ConflictException;
import com.atsskill.certification.exception.ResourceNotFoundException;
import com.atsskill.certification.model.*;
import com.atsskill.certification.repository.CertificateRepository;
import com.atsskill.certification.repository.CourseRepository;
import com.atsskill.certification.repository.QuestionRepository;
import com.atsskill.certification.repository.QuizAttemptRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
public class QuizService {

    private final QuizAttemptRepository attemptRepository;
    private final CourseRepository courseRepository;
    private final QuestionRepository questionRepository;
    private final CertificateRepository certificateRepository;
    private final CertificateService certificateService;

    // Grace period of 60 seconds for slow network latency during submission
    private static final long GRACE_PERIOD_SECONDS = 60;

    public QuizService(
            QuizAttemptRepository attemptRepository,
            CourseRepository courseRepository,
            QuestionRepository questionRepository,
            CertificateRepository certificateRepository,
            CertificateService certificateService) {
        this.attemptRepository = attemptRepository;
        this.courseRepository = courseRepository;
        this.questionRepository = questionRepository;
        this.certificateRepository = certificateRepository;
        this.certificateService = certificateService;
    }

    public CourseEligibilityDto checkEligibility(String courseId, String studentId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseId));

        if (course.getStatus() != CourseStatus.PUBLISHED) {
            return new CourseEligibilityDto(false, "Course is currently not published", 0, course.getMaxAttempts(), false, null, null);
        }

        // Check if student already earned a valid certificate
        Optional<Certificate> existingCert = certificateRepository.findByStudentIdAndCourseId(studentId, courseId);
        if (existingCert.isPresent() && existingCert.get().getStatus() == CertificateStatus.VALID) {
            return new CourseEligibilityDto(false, "You have already completed this course and earned your certificate",
                    1, course.getMaxAttempts(), true, existingCert.get().getId(), null);
        }

        // Check active in-progress attempt
        Optional<QuizAttempt> inProgress = attemptRepository.findByStudentIdAndCourseIdAndStatus(studentId, courseId, AttemptStatus.IN_PROGRESS);
        if (inProgress.isPresent()) {
            QuizAttempt attempt = inProgress.get();
            if (Instant.now().isAfter(attempt.getExpiresAt().plusSeconds(GRACE_PERIOD_SECONDS))) {
                // Auto-expire overdue attempt
                attempt.setStatus(AttemptStatus.EXPIRED);
                attemptRepository.save(attempt);
            } else {
                return new CourseEligibilityDto(true, "In-progress attempt can be resumed",
                        (int) attemptRepository.countByStudentIdAndCourseId(studentId, courseId),
                        course.getMaxAttempts(), false, null, attempt.getId());
            }
        }

        long pastAttempts = attemptRepository.countByStudentIdAndCourseId(studentId, courseId);
        if (pastAttempts >= course.getMaxAttempts()) {
            return new CourseEligibilityDto(false, "Maximum attempts reached (" + course.getMaxAttempts() + " max)",
                    (int) pastAttempts, course.getMaxAttempts(), false, null, null);
        }

        return new CourseEligibilityDto(true, "Eligible to take the quiz", (int) pastAttempts, course.getMaxAttempts(), false, null, null);
    }

    public StartQuizResponse startQuiz(String courseId, User student) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        CourseEligibilityDto eligibility = checkEligibility(courseId, student.getId());
        if (!eligibility.isEligible()) {
            throw new BadRequestException(eligibility.getReason());
        }

        // If resuming existing in-progress attempt
        if (eligibility.getActiveAttemptId() != null) {
            QuizAttempt existing = attemptRepository.findById(eligibility.getActiveAttemptId())
                    .orElseThrow(() -> new ResourceNotFoundException("Attempt not found"));

            List<QuestionDto> questions = existing.getQuestionSnapshots().stream()
                    .map(QuestionDto::fromSnapshot)
                    .toList();

            return new StartQuizResponse(
                    existing.getId(),
                    course.getId(),
                    course.getTitle(),
                    course.getDurationMinutes(),
                    existing.getStartedAt(),
                    existing.getExpiresAt(),
                    questions
            );
        }

        List<Question> activeQuestions = questionRepository.findByCourseIdAndActiveTrue(courseId);
        if (activeQuestions.size() < course.getQuestionCount()) {
            throw new BadRequestException("This course does not have sufficient active questions to begin");
        }

        // Shuffle questions and select the configured count
        Collections.shuffle(activeQuestions);
        List<Question> selected = activeQuestions.subList(0, Math.min(course.getQuestionCount(), activeQuestions.size()));

        List<QuestionSnapshot> snapshots = new ArrayList<>();
        List<QuestionDto> publicQuestions = new ArrayList<>();

        for (Question q : selected) {
            List<QuestionOption> shuffledOptions = new ArrayList<>(q.getOptions());
            Collections.shuffle(shuffledOptions);

            QuestionSnapshot snapshot = new QuestionSnapshot(q.getId(), q.getQuestionText(), shuffledOptions, q.getCorrectOptionIds());
            snapshots.add(snapshot);

            publicQuestions.add(new QuestionDto(q.getId(), q.getQuestionText(), shuffledOptions));
        }

        Instant now = Instant.now();
        Instant expiresAt = now.plusSeconds((long) course.getDurationMinutes() * 60);

        QuizAttempt attempt = new QuizAttempt();
        attempt.setStudentId(student.getId());
        attempt.setCourseId(course.getId());
        attempt.setAttemptNumber((int) attemptRepository.countByStudentIdAndCourseId(student.getId(), course.getId()) + 1);
        attempt.setStatus(AttemptStatus.IN_PROGRESS);
        attempt.setStartedAt(now);
        attempt.setExpiresAt(expiresAt);
        attempt.setTotalQuestions(snapshots.size());
        attempt.setPassingPercentageSnapshot(course.getPassingPercentage());
        attempt.setQuestionSnapshots(snapshots);
        attempt.setCreatedAt(now);

        QuizAttempt saved = attemptRepository.save(attempt);

        return new StartQuizResponse(
                saved.getId(),
                course.getId(),
                course.getTitle(),
                course.getDurationMinutes(),
                saved.getStartedAt(),
                saved.getExpiresAt(),
                publicQuestions
        );
    }

    public StartQuizResponse getAttempt(String attemptId, String studentId) {
        QuizAttempt attempt = attemptRepository.findById(attemptId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz attempt not found: " + attemptId));

        if (!attempt.getStudentId().equals(studentId)) {
            throw new BadRequestException("Unauthorized access to this attempt");
        }

        Course course = courseRepository.findById(attempt.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        List<QuestionDto> questions = attempt.getQuestionSnapshots().stream()
                .map(QuestionDto::fromSnapshot)
                .toList();

        return new StartQuizResponse(
                attempt.getId(),
                course.getId(),
                course.getTitle(),
                course.getDurationMinutes(),
                attempt.getStartedAt(),
                attempt.getExpiresAt(),
                questions
        );
    }

    public QuizResultDto submitQuiz(String attemptId, SubmitQuizRequest request, User student) {
        QuizAttempt attempt = attemptRepository.findById(attemptId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz attempt not found: " + attemptId));

        if (!attempt.getStudentId().equals(student.getId())) {
            throw new BadRequestException("Unauthorized access to attempt");
        }

        if (attempt.getStatus() == AttemptStatus.SUBMITTED) {
            return getAttemptResult(attemptId, student.getId());
        }

        Course course = courseRepository.findById(attempt.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        Instant now = Instant.now();
        Instant deadline = attempt.getExpiresAt().plusSeconds(GRACE_PERIOD_SECONDS);

        Map<String, List<String>> userAnswers = request.getAnswers() != null ? request.getAnswers() : new HashMap<>();
        attempt.setAnswers(userAnswers);
        attempt.setSubmittedAt(now);

        // Grade attempt
        int correctCount = 0;
        for (QuestionSnapshot snapshot : attempt.getQuestionSnapshots()) {
            List<String> chosen = userAnswers.get(snapshot.getId());
            if (chosen != null && !chosen.isEmpty()) {
                Set<String> chosenSet = new HashSet<>(chosen);
                Set<String> correctSet = new HashSet<>(snapshot.getCorrectOptionIds());
                if (chosenSet.equals(correctSet)) {
                    correctCount++;
                }
            }
        }

        double scorePercentage = ((double) correctCount / attempt.getTotalQuestions()) * 100.0;
        scorePercentage = Math.round(scorePercentage * 100.0) / 100.0; // 2 decimal precision

        boolean passed = scorePercentage >= attempt.getPassingPercentageSnapshot();

        attempt.setCorrectAnswers(correctCount);
        attempt.setScorePercentage(scorePercentage);
        attempt.setStatus(AttemptStatus.SUBMITTED);
        attempt.setResult(passed ? QuizResult.PASS : QuizResult.FAIL);

        attemptRepository.save(attempt);

        String certificateId = null;
        String certificateNumber = null;

        if (passed) {
            Certificate certificate = certificateService.issueCertificate(student, course, scorePercentage);
            certificateId = certificate.getId();
            certificateNumber = certificate.getCertificateNumber();
        }

        QuizResultDto resultDto = new QuizResultDto();
        resultDto.setAttemptId(attempt.getId());
        resultDto.setCourseId(course.getId());
        resultDto.setCourseTitle(course.getTitle());
        resultDto.setTotalQuestions(attempt.getTotalQuestions());
        resultDto.setCorrectAnswers(correctCount);
        resultDto.setScorePercentage(scorePercentage);
        resultDto.setPassingPercentage(attempt.getPassingPercentageSnapshot());
        resultDto.setResult(attempt.getResult());
        resultDto.setPassed(passed);
        resultDto.setCertificateId(certificateId);
        resultDto.setCertificateNumber(certificateNumber);
        resultDto.setSubmittedAt(now);

        return resultDto;
    }

    public QuizResultDto getAttemptResult(String attemptId, String studentId) {
        QuizAttempt attempt = attemptRepository.findById(attemptId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz attempt not found: " + attemptId));

        if (!attempt.getStudentId().equals(studentId)) {
            throw new BadRequestException("Unauthorized access to result");
        }

        Course course = courseRepository.findById(attempt.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        Optional<Certificate> certOpt = certificateRepository.findByStudentIdAndCourseId(studentId, course.getId());

        QuizResultDto resultDto = new QuizResultDto();
        resultDto.setAttemptId(attempt.getId());
        resultDto.setCourseId(course.getId());
        resultDto.setCourseTitle(course.getTitle());
        resultDto.setTotalQuestions(attempt.getTotalQuestions());
        resultDto.setCorrectAnswers(attempt.getCorrectAnswers());
        resultDto.setScorePercentage(attempt.getScorePercentage());
        resultDto.setPassingPercentage(attempt.getPassingPercentageSnapshot());
        resultDto.setResult(attempt.getResult());
        resultDto.setPassed(attempt.getResult() == QuizResult.PASS);
        resultDto.setSubmittedAt(attempt.getSubmittedAt());

        certOpt.ifPresent(cert -> {
            resultDto.setCertificateId(cert.getId());
            resultDto.setCertificateNumber(cert.getCertificateNumber());
        });

        return resultDto;
    }

    public Page<QuizAttempt> getAllAttemptsAdmin(Pageable pageable) {
        return attemptRepository.findAllByOrderByCreatedAtDesc(pageable);
    }
}
