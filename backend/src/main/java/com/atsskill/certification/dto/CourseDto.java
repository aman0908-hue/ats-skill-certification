package com.atsskill.certification.dto;

import com.atsskill.certification.model.Course;
import com.atsskill.certification.model.CourseStatus;

import java.time.Instant;
import java.util.List;

public class CourseDto {
    private String id;
    private String title;
    private String slug;
    private String category;
    private String description;
    private List<String> syllabus;
    private int durationMinutes;
    private int questionCount;
    private int passingPercentage;
    private int maxAttempts;
    private CourseStatus status;
    private Instant createdAt;

    public CourseDto() {
    }

    public static CourseDto fromEntity(Course c) {
        CourseDto dto = new CourseDto();
        dto.id = c.getId();
        dto.title = c.getTitle();
        dto.slug = c.getSlug();
        dto.category = c.getCategory();
        dto.description = c.getDescription();
        dto.syllabus = c.getSyllabus();
        dto.durationMinutes = c.getDurationMinutes();
        dto.questionCount = c.getQuestionCount();
        dto.passingPercentage = c.getPassingPercentage();
        dto.maxAttempts = c.getMaxAttempts();
        dto.status = c.getStatus();
        dto.createdAt = c.getCreatedAt();
        return dto;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<String> getSyllabus() { return syllabus; }
    public void setSyllabus(List<String> syllabus) { this.syllabus = syllabus; }
    public int getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(int durationMinutes) { this.durationMinutes = durationMinutes; }
    public int getQuestionCount() { return questionCount; }
    public void setQuestionCount(int questionCount) { this.questionCount = questionCount; }
    public int getPassingPercentage() { return passingPercentage; }
    public void setPassingPercentage(int passingPercentage) { this.passingPercentage = passingPercentage; }
    public int getMaxAttempts() { return maxAttempts; }
    public void setMaxAttempts(int maxAttempts) { this.maxAttempts = maxAttempts; }
    public CourseStatus getStatus() { return status; }
    public void setStatus(CourseStatus status) { this.status = status; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
