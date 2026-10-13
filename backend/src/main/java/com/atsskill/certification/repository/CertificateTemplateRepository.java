package com.atsskill.certification.repository;

import com.atsskill.certification.model.CertificateTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CertificateTemplateRepository extends MongoRepository<CertificateTemplate, String> {
    Optional<CertificateTemplate> findByActiveTrue();
    Optional<CertificateTemplate> findByVersion(String version);
}
