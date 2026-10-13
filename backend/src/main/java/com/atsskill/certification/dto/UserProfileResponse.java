package com.atsskill.certification.dto;

import com.atsskill.certification.model.Role;

import java.time.Instant;

public class UserProfileResponse {
    private String id;
    private String fullName;
    private String email;
    private Role role;
    private String academicBranch;
    private boolean emailVerified;
    private Instant createdAt;

    public UserProfileResponse() {
    }

    public UserProfileResponse(String id, String fullName, String email, Role role, String academicBranch, boolean emailVerified, Instant createdAt) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.academicBranch = academicBranch;
        this.emailVerified = emailVerified;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getAcademicBranch() {
        return academicBranch;
    }

    public void setAcademicBranch(String academicBranch) {
        this.academicBranch = academicBranch;
    }
}
