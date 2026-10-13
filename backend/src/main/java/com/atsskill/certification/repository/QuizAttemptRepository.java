package com.atsskill.certification.repository;

import com.atsskill.certification.model.AttemptStatus;
import com.atsskill.certification.model.QuizAttempt;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizAttemptRepository extends MongoRepository<QuizAttempt, String> {
    List<QuizAttempt> findByStudentId(String studentId);
    Page<QuizAttempt> findByStudentId(String studentId, Pageable pageable);
    List<QuizAttempt> findByStudentIdAndCourseId(String studentId, String courseId);
    Optional<QuizAttempt> findByStudentIdAndCourseIdAndStatus(String studentId, String courseId, AttemptStatus status);
    long countByStudentIdAndCourseId(String studentId, String courseId);
    long countByCourseId(String courseId);
    Page<QuizAttempt> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
