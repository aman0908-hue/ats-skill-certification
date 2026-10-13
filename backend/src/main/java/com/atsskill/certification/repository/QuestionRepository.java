package com.atsskill.certification.repository;

import com.atsskill.certification.model.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
    List<Question> findByCourseIdAndActiveTrue(String courseId);
    Page<Question> findByCourseId(String courseId, Pageable pageable);
    long countByCourseId(String courseId);
    long countByCourseIdAndActiveTrue(String courseId);
    void deleteByCourseId(String courseId);
}
