package com.atsskill.certification.repository;

import com.atsskill.certification.model.Certificate;
import com.atsskill.certification.model.CertificateStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CertificateRepository extends MongoRepository<Certificate, String> {
    Optional<Certificate> findByCertificateNumber(String certificateNumber);
    Optional<Certificate> findByVerificationToken(String verificationToken);
    Optional<Certificate> findByVerificationTokenHash(String verificationTokenHash);
    Optional<Certificate> findByStudentIdAndCourseId(String studentId, String courseId);
    List<Certificate> findByStudentId(String studentId);
    Page<Certificate> findByStudentId(String studentId, Pageable pageable);
    Page<Certificate> findByStatus(CertificateStatus status, Pageable pageable);
    Page<Certificate> findByCertificateNumberContainingIgnoreCaseOrStudentNameSnapshotContainingIgnoreCaseOrCourseNameSnapshotContainingIgnoreCase(
            String certNum, String studentName, String courseName, Pageable pageable);
    long countByStatus(CertificateStatus status);
}
