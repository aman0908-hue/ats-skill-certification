package com.atsskill.certification.dto;

public class CourseEligibilityDto {
    private boolean eligible;
    private String reason;
    private int attemptsCount;
    private int maxAttempts;
    private boolean alreadyPassed;
    private String certificateId;
    private String activeAttemptId;

    public CourseEligibilityDto() {
    }

    public CourseEligibilityDto(boolean eligible, String reason, int attemptsCount, int maxAttempts, boolean alreadyPassed, String certificateId, String activeAttemptId) {
        this.eligible = eligible;
        this.reason = reason;
        this.attemptsCount = attemptsCount;
        this.maxAttempts = maxAttempts;
        this.alreadyPassed = alreadyPassed;
        this.certificateId = certificateId;
        this.activeAttemptId = activeAttemptId;
    }

    public boolean isEligible() { return eligible; }
    public void setEligible(boolean eligible) { this.eligible = eligible; }
    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
    public int getAttemptsCount() { return attemptsCount; }
    public void setAttemptsCount(int attemptsCount) { this.attemptsCount = attemptsCount; }
    public int getMaxAttempts() { return maxAttempts; }
    public void setMaxAttempts(int maxAttempts) { this.maxAttempts = maxAttempts; }
    public boolean isAlreadyPassed() { return alreadyPassed; }
    public void setAlreadyPassed(boolean alreadyPassed) { this.alreadyPassed = alreadyPassed; }
    public String getCertificateId() { return certificateId; }
    public void setCertificateId(String certificateId) { this.certificateId = certificateId; }
    public String getActiveAttemptId() { return activeAttemptId; }
    public void setActiveAttemptId(String activeAttemptId) { this.activeAttemptId = activeAttemptId; }
}
