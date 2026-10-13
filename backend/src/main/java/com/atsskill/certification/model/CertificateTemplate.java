package com.atsskill.certification.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Document(collection = "certificateTemplates")
public class CertificateTemplate {

    @Id
    private String id;

    private String name = "Default ATS Certificate Template";

    private String templateAssetPath; // File path or relative URL to the background image/PDF

    private int pageWidth = 1123; // A4 Landscape default in points/px (842 x 595 pt, or 1123 x 794 at 96dpi)

    private int pageHeight = 794;

    private String orientation = "LANDSCAPE"; // LANDSCAPE or PORTRAIT

    // Field key -> FieldCoordinate (e.g. "studentName", "courseName", "certificateNumber", "issueDate", "qrCode")
    private Map<String, FieldCoordinate> fieldPositions = new HashMap<>();

    private boolean active = true;

    private String version = "v1.0";

    @CreatedDate
    private Instant createdAt;

    public CertificateTemplate() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTemplateAssetPath() {
        return templateAssetPath;
    }

    public void setTemplateAssetPath(String templateAssetPath) {
        this.templateAssetPath = templateAssetPath;
    }

    public int getPageWidth() {
        return pageWidth;
    }

    public void setPageWidth(int pageWidth) {
        this.pageWidth = pageWidth;
    }

    public int getPageHeight() {
        return pageHeight;
    }

    public void setPageHeight(int pageHeight) {
        this.pageHeight = pageHeight;
    }

    public String getOrientation() {
        return orientation;
    }

    public void setOrientation(String orientation) {
        this.orientation = orientation;
    }

    public Map<String, FieldCoordinate> getFieldPositions() {
        return fieldPositions;
    }

    public void setFieldPositions(Map<String, FieldCoordinate> fieldPositions) {
        this.fieldPositions = fieldPositions;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
