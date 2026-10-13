package com.atsskill.certification.dto;

import java.time.Instant;
import java.util.List;

public class StartQuizResponse {
    private String attemptId;
    private String courseId;
    private String courseTitle;
    private int durationMinutes;
    private Instant startedAt;
    private Instant expiresAt;
    private List<QuestionDto> questions;

    public StartQuizResponse() {
    }

    public StartQuizResponse(String attemptId, String courseId, String courseTitle, int durationMinutes, Instant startedAt, Instant expiresAt, List<QuestionDto> questions) {
        this.attemptId = attemptId;
        this.courseId = courseId;
        this.courseTitle = courseTitle;
        this.durationMinutes = durationMinutes;
        this.startedAt = startedAt;
        this.expiresAt = expiresAt;
        this.questions = questions;
    }

    public String getAttemptId() { return attemptId; }
    public void setAttemptId(String attemptId) { this.attemptId = attemptId; }
    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }
    public String getCourseTitle() { return courseTitle; }
    public void setCourseTitle(String courseTitle) { this.courseTitle = courseTitle; }
    public int getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(int durationMinutes) { this.durationMinutes = durationMinutes; }
    public Instant getStartedAt() { return startedAt; }
    public void setStartedAt(Instant startedAt) { this.startedAt = startedAt; }
    public Instant getExpiresAt() { return expiresAt; }
    public void setExpiresAt(Instant expiresAt) { this.expiresAt = expiresAt; }
    public List<QuestionDto> getQuestions() { return questions; }
    public void setQuestions(List<QuestionDto> questions) { this.questions = questions; }
}
