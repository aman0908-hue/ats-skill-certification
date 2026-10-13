package com.atsskill.certification.dto;

import com.atsskill.certification.model.Certificate;
import com.atsskill.certification.model.CertificateStatus;

import java.time.Instant;

public class CertificateDto {
    private String id;
    private String certificateNumber;
    private String verificationToken;
    private String studentId;
    private String studentName;
    private String courseId;
    private String courseName;
    private Instant issueDate;
    private double scorePercentage;
    private CertificateStatus status;
    private String revocationReason;
    private Instant revokedAt;
    private String verificationUrl;

    public CertificateDto() {
    }

    public static CertificateDto fromEntity(Certificate cert, String publicBaseUrl) {
        CertificateDto dto = new CertificateDto();
        dto.id = cert.getId();
        dto.certificateNumber = cert.getCertificateNumber();
        dto.verificationToken = cert.getVerificationToken();
        dto.studentId = cert.getStudentId();
        dto.studentName = cert.getStudentNameSnapshot();
        dto.courseId = cert.getCourseId();
        dto.courseName = cert.getCourseNameSnapshot();
        dto.issueDate = cert.getIssueDate();
        dto.scorePercentage = cert.getScorePercentage();
        dto.status = cert.getStatus();
        dto.revocationReason = cert.getRevocationReason();
        dto.revokedAt = cert.getRevokedAt();
        dto.verificationUrl = publicBaseUrl + "/verify/" + cert.getVerificationToken();
        return dto;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getCertificateNumber() { return certificateNumber; }
    public void setCertificateNumber(String certificateNumber) { this.certificateNumber = certificateNumber; }
    public String getVerificationToken() { return verificationToken; }
    public void setVerificationToken(String verificationToken) { this.verificationToken = verificationToken; }
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }
    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }
    public Instant getIssueDate() { return issueDate; }
    public void setIssueDate(Instant issueDate) { this.issueDate = issueDate; }
    public double getScorePercentage() { return scorePercentage; }
    public void setScorePercentage(double scorePercentage) { this.scorePercentage = scorePercentage; }
    public CertificateStatus getStatus() { return status; }
    public void setStatus(CertificateStatus status) { this.status = status; }
    public String getRevocationReason() { return revocationReason; }
    public void setRevocationReason(String revocationReason) { this.revocationReason = revocationReason; }
    public Instant getRevokedAt() { return revokedAt; }
    public void setRevokedAt(Instant revokedAt) { this.revokedAt = revokedAt; }
    public String getVerificationUrl() { return verificationUrl; }
    public void setVerificationUrl(String verificationUrl) { this.verificationUrl = verificationUrl; }
}
