package com.atsskill.certification.service;

import com.atsskill.certification.dto.CertificateDto;
import com.atsskill.certification.dto.PublicVerificationDto;
import com.atsskill.certification.dto.RevokeCertificateRequest;
import com.atsskill.certification.exception.BadRequestException;
import com.atsskill.certification.exception.ConflictException;
import com.atsskill.certification.exception.ResourceNotFoundException;
import com.atsskill.certification.model.*;
import com.atsskill.certification.repository.CertificateRepository;
import com.atsskill.certification.repository.CertificateTemplateRepository;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class CertificateService {

    private static final Logger logger = LoggerFactory.getLogger(CertificateService.class);

    private final CertificateRepository certificateRepository;
    private final CertificateTemplateRepository templateRepository;
    private final QrCodeService qrCodeService;
    private final AuditLogService auditLogService;

    @Value("${app.public-url:http://localhost:5173}")
    private String publicBaseUrl;

    private static final String HEX_CHARS = "0123456789ABCDEF";
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("dd MMMM yyyy")
            .withZone(ZoneId.of("Asia/Kolkata"));

    public CertificateService(
            CertificateRepository certificateRepository,
            CertificateTemplateRepository templateRepository,
            QrCodeService qrCodeService,
            AuditLogService auditLogService) {
        this.certificateRepository = certificateRepository;
        this.templateRepository = templateRepository;
        this.qrCodeService = qrCodeService;
        this.auditLogService = auditLogService;
    }

    public Certificate issueCertificate(User student, Course course, double scorePercentage) {
        // Idempotency: check if certificate already exists
        Optional<Certificate> existing = certificateRepository.findByStudentIdAndCourseId(student.getId(), course.getId());
        if (existing.isPresent()) {
            return existing.get();
        }

        String certificateNumber = generateCertificateNumber();
        String verificationToken = UUID.randomUUID().toString().replace("-", "") + generateRandomHex(12);
        String tokenHash = hashToken(verificationToken);

        Certificate certificate = new Certificate(
                certificateNumber,
                verificationToken,
                tokenHash,
                student.getId(),
                student.getFullName(),
                course.getId(),
                course.getTitle(),
                Instant.now(),
                scorePercentage
        );

        Certificate saved = certificateRepository.save(certificate);
        logger.info(">>> Certificate issued successfully. Cert Number: {}, Student: {}, Course: {}",
                certificateNumber, student.getFullName(), course.getTitle());
        return saved;
    }

    public CertificateDto getCertificateById(String certificateId) {
        Certificate cert = certificateRepository.findById(certificateId)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate not found with id: " + certificateId));
        return CertificateDto.fromEntity(cert, publicBaseUrl);
    }

    public List<CertificateDto> getCertificatesByStudent(String studentId) {
        return certificateRepository.findByStudentId(studentId).stream()
                .map(cert -> CertificateDto.fromEntity(cert, publicBaseUrl))
                .toList();
    }

    public Page<CertificateDto> getAllCertificatesAdmin(String search, Pageable pageable) {
        Page<Certificate> certPage;
        if (search != null && !search.trim().isEmpty()) {
            String s = search.trim();
            certPage = certificateRepository.findByCertificateNumberContainingIgnoreCaseOrStudentNameSnapshotContainingIgnoreCaseOrCourseNameSnapshotContainingIgnoreCase(s, s, s, pageable);
        } else {
            certPage = certificateRepository.findAll(pageable);
        }
        return certPage.map(cert -> CertificateDto.fromEntity(cert, publicBaseUrl));
    }

    public PublicVerificationDto verifyCertificate(String token) {
        if (token == null || token.trim().isEmpty()) {
            return PublicVerificationDto.invalid("Invalid verification token format");
        }

        String trimmed = token.trim();
        String hashed = hashToken(trimmed);

        // Lookup by token or token hash or certificate number
        Optional<Certificate> certOpt = certificateRepository.findByVerificationToken(trimmed)
                .or(() -> certificateRepository.findByVerificationTokenHash(hashed))
                .or(() -> certificateRepository.findByCertificateNumber(trimmed));

        if (certOpt.isEmpty()) {
            return PublicVerificationDto.invalid("Certificate not found. The token may be invalid or tampered with.");
        }

        return PublicVerificationDto.valid(certOpt.get());
    }

    public CertificateDto revokeCertificate(String certificateId, RevokeCertificateRequest request, String adminId) {
        Certificate cert = certificateRepository.findById(certificateId)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate not found with id: " + certificateId));

        if (cert.getStatus() == CertificateStatus.REVOKED) {
            throw new BadRequestException("Certificate is already revoked");
        }

        cert.setStatus(CertificateStatus.REVOKED);
        cert.setRevokedAt(Instant.now());
        cert.setRevocationReason(request.getReason().trim());

        Certificate updated = certificateRepository.save(cert);
        auditLogService.logAction(adminId, "CERTIFICATE_REVOKED", "CERTIFICATE", certificateId,
                Map.of("certificateNumber", cert.getCertificateNumber(), "reason", request.getReason()));

        return CertificateDto.fromEntity(updated, publicBaseUrl);
    }

    public byte[] generateCertificatePdf(String certificateId) {
        Certificate cert = certificateRepository.findById(certificateId)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate not found with id: " + certificateId));

        CertificateTemplate template = templateRepository.findByActiveTrue()
                .orElseGet(this::createDefaultTemplate);

        return renderPdf(cert, template);
    }

    public byte[] renderPreviewPdf(CertificateTemplate template) {
        Certificate mockCert = new Certificate(
                "ATS-SC-2026-PREVIEW1",
                "preview_token_123456",
                "preview_hash",
                "mock_student_id",
                "Aman Kumar Yadav",
                "mock_course_id",
                "B.Tech: Core Computer Science & Algorithms",
                Instant.now(),
                92.5
        );
        return renderPdf(mockCert, template);
    }

    private byte[] renderPdf(Certificate cert, CertificateTemplate template) {
        try {
            String baseUrl = (publicBaseUrl != null && !publicBaseUrl.isBlank()) ? publicBaseUrl : "http://localhost:5173";
            String verificationUrl = baseUrl + "/verify/" + cert.getVerificationToken();
            String qrBase64 = qrCodeService.generateQrCodeBase64(verificationUrl, 260, 260);
            String formattedDate = DATE_FORMATTER.format(cert.getIssueDate());

            String templateBgBase64 = getTemplateImageBase64();

            String html = generateCertificateHtml(cert, template, qrBase64, formattedDate, templateBgBase64);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();
            builder.withHtmlContent(html, null);
            builder.toStream(outputStream);
            builder.run();

            return outputStream.toByteArray();
        } catch (Exception e) {
            logger.error("Error generating certificate PDF", e);
            throw new RuntimeException("Could not render certificate PDF: " + e.getMessage(), e);
        }
    }

    private String getTemplateImageBase64() {
        try {
            // Check classpath first
            try (InputStream is = getClass().getResourceAsStream("/static/certificate-template.jpg")) {
                if (is != null) {
                    byte[] bytes = is.readAllBytes();
                    return "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(bytes);
                }
            }
            // Check relative paths
            File[] candidateFiles = new File[] {
                    new File("src/main/resources/static/certificate-template.jpg"),
                    new File("backend/src/main/resources/static/certificate-template.jpg"),
                    new File("frontend/public/certificate-template.jpg"),
                    new File("../frontend/public/certificate-template.jpg")
            };
            for (File file : candidateFiles) {
                if (file.exists() && file.isFile()) {
                    byte[] bytes = java.nio.file.Files.readAllBytes(file.toPath());
                    return "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(bytes);
                }
            }
        } catch (Exception ignored) {
        }
        return "";
    }

    private String generateCertificateHtml(Certificate cert, CertificateTemplate template, String qrBase64, String formattedDate, String templateBgBase64) {
        Map<String, FieldCoordinate> coords = (template != null && template.getFieldPositions() != null)
                ? template.getFieldPositions()
                : java.util.Collections.emptyMap();
        FieldCoordinate studentNamePos = coords.getOrDefault("studentName", new FieldCoordinate(50.0, 48.0, 36, "Georgia, serif", "#0F1D40", "center"));
        FieldCoordinate courseNamePos = coords.getOrDefault("courseName", new FieldCoordinate(50.0, 61.6, 20, "Helvetica, Arial, sans-serif", "#0F1D40", "center"));

        int nameTop = studentNamePos.getY() < 100 ? (int) (studentNamePos.getY() * 724.0 / 100.0) : (int) studentNamePos.getY();
        int courseTop = courseNamePos.getY() < 100 ? (int) (courseNamePos.getY() * 724.0 / 100.0) : (int) courseNamePos.getY();
        int nameSize = studentNamePos.getFontSize() > 0 ? studentNamePos.getFontSize() : 36;
        int courseSize = courseNamePos.getFontSize() > 0 ? courseNamePos.getFontSize() : 20;

        String templateHtml = """
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8"/>
          <style>
            @page {
              size: 1024px 724px;
              margin: 0;
            }
            * {
              box-sizing: border-box;
            }
            body {
              margin: 0;
              padding: 0;
              width: 1024px;
              height: 724px;
              background-color: #FFFFFF;
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              position: relative;
              overflow: hidden;
            }
            .background-img {
              position: absolute;
              top: 0;
              left: 0;
              width: 1024px;
              height: 724px;
              z-index: 1;
            }
            .overlay-layer {
              position: absolute;
              top: 0;
              left: 0;
              width: 1024px;
              height: 724px;
              z-index: 2;
            }
            .student-name {
              position: absolute;
              top: {{NAME_TOP}}px;
              left: 150px;
              width: 724px;
              text-align: center;
              font-family: 'Georgia', 'Playfair Display', serif;
              font-style: italic;
              font-size: {{NAME_SIZE}}px;
              font-weight: 700;
              color: #0F1D40;
              line-height: 1.1;
            }
            .course-name {
              position: absolute;
              top: {{COURSE_TOP}}px;
              left: 150px;
              width: 724px;
              text-align: center;
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              font-weight: 800;
              font-size: {{COURSE_SIZE}}px;
              color: #0F1D40;
              letter-spacing: 0.5px;
            }
            .date-val {
              position: absolute;
              top: 602px;
              left: 175px;
              width: 244px;
              text-align: center;
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              font-size: 11px;
              font-weight: 700;
              color: #1E293B;
            }
            .cert-id-val {
              position: absolute;
              top: 602px;
              left: 390px;
              width: 244px;
              text-align: center;
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              font-size: 11px;
              font-weight: 700;
              color: #1E293B;
              letter-spacing: 0.5px;
            }
            .qr-box {
              position: absolute;
              top: 546px;
              left: 654px;
              width: 76px;
              text-align: center;
            }
            .qr-img {
              width: 68px;
              height: 68px;
              background: #FFFFFF;
              border: 1px solid #CBD5E1;
              padding: 2px;
            }
            .qr-label {
              font-size: 7px;
              color: #64748B;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-top: 1px;
            }
          </style>
        </head>
        <body>
          <img class="background-img" src="{{TEMPLATE_BG_BASE64}}"/>
          <div class="overlay-layer">
            <div class="student-name">{{STUDENT_NAME}}</div>
            <div class="course-name">— {{COURSE_NAME}} —</div>
            <div class="date-val">{{ISSUE_DATE}}</div>
            <div class="cert-id-val">{{CERT_NUMBER}}</div>
            <div class="qr-box">
              <img class="qr-img" src="{{QR_BASE64}}"/>
              <div class="qr-label">Scan to Verify</div>
            </div>
          </div>
        </body>
        </html>
        """;

        return templateHtml
                .replace("{{NAME_TOP}}", String.valueOf(nameTop))
                .replace("{{NAME_SIZE}}", String.valueOf(nameSize))
                .replace("{{COURSE_TOP}}", String.valueOf(courseTop))
                .replace("{{COURSE_SIZE}}", String.valueOf(courseSize))
                .replace("{{TEMPLATE_BG_BASE64}}", templateBgBase64)
                .replace("{{STUDENT_NAME}}", escapeXml(cert.getStudentNameSnapshot()))
                .replace("{{COURSE_NAME}}", escapeXml(cert.getCourseNameSnapshot()))
                .replace("{{CERT_NUMBER}}", escapeXml(cert.getCertificateNumber()))
                .replace("{{ISSUE_DATE}}", escapeXml(formattedDate))
                .replace("{{QR_BASE64}}", qrBase64);
    }

    private String escapeXml(String text) {
        if (text == null) return "";
        return text.replace("&", "&amp;")
                   .replace("<", "&lt;")
                   .replace(">", "&gt;")
                   .replace("\"", "&quot;")
                   .replace("'", "&apos;");
    }

    private CertificateTemplate createDefaultTemplate() {
        CertificateTemplate template = new CertificateTemplate();
        template.setName("Default ATS Certificate Template");
        template.setPageWidth(1024);
        template.setPageHeight(724);
        template.setOrientation("LANDSCAPE");
        template.setActive(true);
        template.setVersion("v2.0");

        Map<String, FieldCoordinate> fieldPositions = new HashMap<>();
        fieldPositions.put("studentName", new FieldCoordinate(50.0, 48.0, 36, "Georgia, serif", "#0F1D40", "center"));
        fieldPositions.put("courseName", new FieldCoordinate(50.0, 61.6, 20, "Helvetica, Arial, sans-serif", "#0F1D40", "center"));
        fieldPositions.put("certificateNumber", new FieldCoordinate(50.0, 83.1, 11, "Helvetica, sans-serif", "#1E293B", "center"));
        fieldPositions.put("issueDate", new FieldCoordinate(29.0, 83.1, 11, "Helvetica, sans-serif", "#1E293B", "center"));
        fieldPositions.put("qrCode", new FieldCoordinate(67.5, 75.4, 0, "", "#000000", "center"));

        template.setFieldPositions(fieldPositions);
        return template;
    }

    private String generateCertificateNumber() {
        return "ATS-SC-2026-" + generateRandomHex(8);
    }

    private String generateRandomHex(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(HEX_CHARS.charAt(SECURE_RANDOM.nextInt(HEX_CHARS.length())));
        }
        return sb.toString();
    }

    private String hashToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }
}
