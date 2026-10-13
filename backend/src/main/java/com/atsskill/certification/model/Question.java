package com.atsskill.certification.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "questions")
public class Question {

    @Id
    private String id;

    @Indexed
    private String courseId;

    private String questionText;

    private List<QuestionOption> options = new ArrayList<>();

    // Kept confidential on backend, never exposed in public student APIs
    private List<String> correctOptionIds = new ArrayList<>();

    private String explanation;

    private String difficulty = "MEDIUM"; // EASY, MEDIUM, HARD

    private boolean active = true;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public Question() {
    }

    public Question(String courseId, String questionText, List<QuestionOption> options, List<String> correctOptionIds, String explanation, String difficulty) {
        this.courseId = courseId;
        this.questionText = questionText;
        this.options = options;
        this.correctOptionIds = correctOptionIds;
        this.explanation = explanation;
        this.difficulty = difficulty != null ? difficulty : "MEDIUM";
        this.active = true;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public List<QuestionOption> getOptions() {
        return options;
    }

    public void setOptions(List<QuestionOption> options) {
        this.options = options;
    }

    public List<String> getCorrectOptionIds() {
        return correctOptionIds;
    }

    public void setCorrectOptionIds(List<String> correctOptionIds) {
        this.correctOptionIds = correctOptionIds;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
