package com.atsskill.certification.dto;

import com.atsskill.certification.model.Certificate;
import com.atsskill.certification.model.CertificateStatus;

import java.time.Instant;

public class PublicVerificationDto {
    private boolean verified;
    private CertificateStatus status;
    private String certificateNumber;
    private String studentName;
    private String courseName;
    private Instant issueDate;
    private double scorePercentage;
    private String issuerName = "ATS Skill Certification";
    private String revocationReason;
    private Instant revokedAt;

    public PublicVerificationDto() {
    }

    public static PublicVerificationDto valid(Certificate cert) {
        PublicVerificationDto dto = new PublicVerificationDto();
        dto.verified = (cert.getStatus() == CertificateStatus.VALID);
        dto.status = cert.getStatus();
        dto.certificateNumber = cert.getCertificateNumber();
        dto.studentName = cert.getStudentNameSnapshot();
        dto.courseName = cert.getCourseNameSnapshot();
        dto.issueDate = cert.getIssueDate();
        dto.scorePercentage = cert.getScorePercentage();
        dto.issuerName = "ATS Skill Certification";
        dto.revocationReason = cert.getRevocationReason();
        dto.revokedAt = cert.getRevokedAt();
        return dto;
    }

    public static PublicVerificationDto invalid(String message) {
        PublicVerificationDto dto = new PublicVerificationDto();
        dto.verified = false;
        dto.status = CertificateStatus.REVOKED;
        dto.revocationReason = message;
        return dto;
    }

    public boolean isVerified() { return verified; }
    public void setVerified(boolean verified) { this.verified = verified; }
    public CertificateStatus getStatus() { return status; }
    public void setStatus(CertificateStatus status) { this.status = status; }
    public String getCertificateNumber() { return certificateNumber; }
    public void setCertificateNumber(String certificateNumber) { this.certificateNumber = certificateNumber; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }
    public Instant getIssueDate() { return issueDate; }
    public void setIssueDate(Instant issueDate) { this.issueDate = issueDate; }
    public double getScorePercentage() { return scorePercentage; }
    public void setScorePercentage(double scorePercentage) { this.scorePercentage = scorePercentage; }
    public String getIssuerName() { return issuerName; }
    public void setIssuerName(String issuerName) { this.issuerName = issuerName; }
    public String getRevocationReason() { return revocationReason; }
    public void setRevocationReason(String revocationReason) { this.revocationReason = revocationReason; }
    public Instant getRevokedAt() { return revokedAt; }
    public void setRevokedAt(Instant revokedAt) { this.revokedAt = revokedAt; }
}
