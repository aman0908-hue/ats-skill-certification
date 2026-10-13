package com.atsskill.certification.dto;

public class CourseSummaryDto {
    private String id;
    private String title;
    private String category;
    private long attemptCount;
    private long certificateCount;

    public CourseSummaryDto() {
    }

    public CourseSummaryDto(String id, String title, String category, long attemptCount, long certificateCount) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.attemptCount = attemptCount;
        this.certificateCount = certificateCount;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public long getAttemptCount() { return attemptCount; }
    public void setAttemptCount(long attemptCount) { this.attemptCount = attemptCount; }
    public long getCertificateCount() { return certificateCount; }
    public void setCertificateCount(long certificateCount) { this.certificateCount = certificateCount; }
}
