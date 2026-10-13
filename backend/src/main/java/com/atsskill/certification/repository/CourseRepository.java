package com.atsskill.certification.repository;

import com.atsskill.certification.model.Course;
import com.atsskill.certification.model.CourseStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {
    Optional<Course> findBySlug(String slug);
    boolean existsBySlug(String slug);
    List<Course> findByStatus(CourseStatus status);
    Page<Course> findByStatus(CourseStatus status, Pageable pageable);
    List<Course> findByCategoryAndStatus(String category, CourseStatus status);
    Page<Course> findByTitleContainingIgnoreCaseOrCategoryContainingIgnoreCase(String title, String category, Pageable pageable);
    long countByStatus(CourseStatus status);
}
