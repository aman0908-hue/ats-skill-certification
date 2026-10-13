package com.atsskill.certification.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Document(collection = "quizAttempts")
@CompoundIndex(name = "student_course_attempt_idx", def = "{'studentId': 1, 'courseId': 1, 'attemptNumber': 1}", unique = true)
public class QuizAttempt {

    @Id
    private String id;

    @Indexed
    private String studentId;

    @Indexed
    private String courseId;

    private int attemptNumber = 1;

    @Indexed
    private AttemptStatus status = AttemptStatus.IN_PROGRESS;

    private Instant startedAt;

    private Instant expiresAt;

    private Instant submittedAt;

    // questionId -> list of selectedOptionIds
    private Map<String, List<String>> answers = new HashMap<>();

    private int totalQuestions;

    private int correctAnswers;

    private double scorePercentage;

    private int passingPercentageSnapshot;

    private QuizResult result;

    private List<QuestionSnapshot> questionSnapshots = new ArrayList<>();

    @CreatedDate
    private Instant createdAt;

    public QuizAttempt() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public int getAttemptNumber() {
        return attemptNumber;
    }

    public void setAttemptNumber(int attemptNumber) {
        this.attemptNumber = attemptNumber;
    }

    public AttemptStatus getStatus() {
        return status;
    }

    public void setStatus(AttemptStatus status) {
        this.status = status;
    }

    public Instant getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(Instant startedAt) {
        this.startedAt = startedAt;
    }

    public Instant getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(Instant expiresAt) {
        this.expiresAt = expiresAt;
    }

    public Instant getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(Instant submittedAt) {
        this.submittedAt = submittedAt;
    }

    public Map<String, List<String>> getAnswers() {
        return answers;
    }

    public void setAnswers(Map<String, List<String>> answers) {
        this.answers = answers;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(int correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public double getScorePercentage() {
        return scorePercentage;
    }

    public void setScorePercentage(double scorePercentage) {
        this.scorePercentage = scorePercentage;
    }

    public int getPassingPercentageSnapshot() {
        return passingPercentageSnapshot;
    }

    public void setPassingPercentageSnapshot(int passingPercentageSnapshot) {
        this.passingPercentageSnapshot = passingPercentageSnapshot;
    }

    public QuizResult getResult() {
        return result;
    }

    public void setResult(QuizResult result) {
        this.result = result;
    }

    public List<QuestionSnapshot> getQuestionSnapshots() {
        return questionSnapshots;
    }

    public void setQuestionSnapshots(List<QuestionSnapshot> questionSnapshots) {
        this.questionSnapshots = questionSnapshots;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
