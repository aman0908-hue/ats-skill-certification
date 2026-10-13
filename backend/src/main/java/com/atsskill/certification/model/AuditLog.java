package com.atsskill.certification.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Document(collection = "auditLogs")
public class AuditLog {

    @Id
    private String id;

    private String actorId;

    private String action;

    private String entityType;

    private String entityId;

    @CreatedDate
    private Instant timestamp;

    private Map<String, Object> safeMetadata = new HashMap<>();

    public AuditLog() {
    }

    public AuditLog(String actorId, String action, String entityType, String entityId, Map<String, Object> safeMetadata) {
        this.actorId = actorId;
        this.action = action;
        this.entityType = entityType;
        this.entityId = entityId;
        this.safeMetadata = safeMetadata != null ? safeMetadata : new HashMap<>();
        this.timestamp = Instant.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getActorId() {
        return actorId;
    }

    public void setActorId(String actorId) {
        this.actorId = actorId;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public String getEntityId() {
        return entityId;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Map<String, Object> getSafeMetadata() {
        return safeMetadata;
    }

    public void setSafeMetadata(Map<String, Object> safeMetadata) {
        this.safeMetadata = safeMetadata;
    }
}
