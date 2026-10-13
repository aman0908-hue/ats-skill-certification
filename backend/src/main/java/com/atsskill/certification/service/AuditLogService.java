package com.atsskill.certification.service;

import com.atsskill.certification.model.AuditLog;
import com.atsskill.certification.repository.AuditLogRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public void logAction(String actorId, String action, String entityType, String entityId, Map<String, Object> safeMetadata) {
        AuditLog log = new AuditLog(actorId, action, entityType, entityId, safeMetadata);
        auditLogRepository.save(log);
    }
}
