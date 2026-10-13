package com.atsskill.certification.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "certificates")
@CompoundIndex(name = "student_course_cert_idx", def = "{'studentId': 1, 'courseId': 1}", unique = true)
public class Certificate {

    @Id
    private String id;

    @Indexed(unique = true)
    private String certificateNumber; // e.g. ATS-SC-2026-X8Y7Z6W5

    @Indexed(unique = true)
    private String verificationToken; // Raw unguessable token for URL generation

    @Indexed(unique = true)
    private String verificationTokenHash; // Cryptographic SHA-256 hash for secure token lookup

    @Indexed
    private String studentId;

    private String studentNameSnapshot;

    @Indexed
    private String courseId;

    private String courseNameSnapshot;

    private Instant issueDate;

    private double scorePercentage;

    @Indexed
    private CertificateStatus status = CertificateStatus.VALID;

    private Instant revokedAt;

    private String revocationReason;

    private String templateVersion = "v1.0";

    @CreatedDate
    private Instant createdAt;

    public Certificate() {
    }

    public Certificate(String certificateNumber, String verificationToken, String verificationTokenHash,
                       String studentId, String studentNameSnapshot, String courseId, String courseNameSnapshot,
                       Instant issueDate, double scorePercentage) {
        this.certificateNumber = certificateNumber;
        this.verificationToken = verificationToken;
        this.verificationTokenHash = verificationTokenHash;
        this.studentId = studentId;
        this.studentNameSnapshot = studentNameSnapshot;
        this.courseId = courseId;
        this.courseNameSnapshot = courseNameSnapshot;
        this.issueDate = issueDate != null ? issueDate : Instant.now();
        this.scorePercentage = scorePercentage;
        this.status = CertificateStatus.VALID;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCertificateNumber() {
        return certificateNumber;
    }

    public void setCertificateNumber(String certificateNumber) {
        this.certificateNumber = certificateNumber;
    }

    public String getVerificationToken() {
        return verificationToken;
    }

    public void setVerificationToken(String verificationToken) {
        this.verificationToken = verificationToken;
    }

    public String getVerificationTokenHash() {
        return verificationTokenHash;
    }

    public void setVerificationTokenHash(String verificationTokenHash) {
        this.verificationTokenHash = verificationTokenHash;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentNameSnapshot() {
        return studentNameSnapshot;
    }

    public void setStudentNameSnapshot(String studentNameSnapshot) {
        this.studentNameSnapshot = studentNameSnapshot;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseNameSnapshot() {
        return courseNameSnapshot;
    }

    public void setCourseNameSnapshot(String courseNameSnapshot) {
        this.courseNameSnapshot = courseNameSnapshot;
    }

    public Instant getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(Instant issueDate) {
        this.issueDate = issueDate;
    }

    public double getScorePercentage() {
        return scorePercentage;
    }

    public void setScorePercentage(double scorePercentage) {
        this.scorePercentage = scorePercentage;
    }

    public CertificateStatus getStatus() {
        return status;
    }

    public void setStatus(CertificateStatus status) {
        this.status = status;
    }

    public Instant getRevokedAt() {
        return revokedAt;
    }

    public void setRevokedAt(Instant revokedAt) {
        this.revokedAt = revokedAt;
    }

    public String getRevocationReason() {
        return revocationReason;
    }

    public void setRevocationReason(String revocationReason) {
        this.revocationReason = revocationReason;
    }

    public String getTemplateVersion() {
        return templateVersion;
    }

    public void setTemplateVersion(String templateVersion) {
        this.templateVersion = templateVersion;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
