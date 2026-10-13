package com.atsskill.certification.dto;

import java.util.List;

public class AdminDashboardDto {
    private long totalStudents;
    private long totalCourses;
    private long totalPublishedCourses;
    private long totalQuizAttempts;
    private long totalCertificatesIssued;
    private long totalRevokedCertificates;
    private double overallPassRatePercentage;
    private List<CourseSummaryDto> popularCourses;

    public AdminDashboardDto() {
    }

    public long getTotalStudents() { return totalStudents; }
    public void setTotalStudents(long totalStudents) { this.totalStudents = totalStudents; }
    public long getTotalCourses() { return totalCourses; }
    public void setTotalCourses(long totalCourses) { this.totalCourses = totalCourses; }
    public long getTotalPublishedCourses() { return totalPublishedCourses; }
    public void setTotalPublishedCourses(long totalPublishedCourses) { this.totalPublishedCourses = totalPublishedCourses; }
    public long getTotalQuizAttempts() { return totalQuizAttempts; }
    public void setTotalQuizAttempts(long totalQuizAttempts) { this.totalQuizAttempts = totalQuizAttempts; }
    public long getTotalCertificatesIssued() { return totalCertificatesIssued; }
    public void setTotalCertificatesIssued(long totalCertificatesIssued) { this.totalCertificatesIssued = totalCertificatesIssued; }
    public long getTotalRevokedCertificates() { return totalRevokedCertificates; }
    public void setTotalRevokedCertificates(long totalRevokedCertificates) { this.totalRevokedCertificates = totalRevokedCertificates; }
    public double getOverallPassRatePercentage() { return overallPassRatePercentage; }
    public void setOverallPassRatePercentage(double overallPassRatePercentage) { this.overallPassRatePercentage = overallPassRatePercentage; }
    public List<CourseSummaryDto> getPopularCourses() { return popularCourses; }
    public void setPopularCourses(List<CourseSummaryDto> popularCourses) { this.popularCourses = popularCourses; }
}
