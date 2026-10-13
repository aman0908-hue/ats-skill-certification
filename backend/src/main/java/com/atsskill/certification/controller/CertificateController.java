package com.atsskill.certification.controller;

import com.atsskill.certification.dto.ApiResponse;
import com.atsskill.certification.dto.CertificateDto;
import com.atsskill.certification.security.UserPrincipal;
import com.atsskill.certification.service.CertificateService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/certificates")
public class CertificateController {

    private final CertificateService certificateService;

    public CertificateController(CertificateService certificateService) {
        this.certificateService = certificateService;
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<CertificateDto>>> getMyCertificates(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<CertificateDto> certificates = certificateService.getCertificatesByStudent(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.ok(certificates));
    }

    @GetMapping("/{certificateId}")
    public ResponseEntity<ApiResponse<CertificateDto>> getCertificate(
            @PathVariable String certificateId) {
        CertificateDto cert = certificateService.getCertificateById(certificateId);
        return ResponseEntity.ok(ApiResponse.ok(cert));
    }

    @GetMapping("/{certificateId}/download")
    public ResponseEntity<byte[]> downloadCertificatePdf(
            @PathVariable String certificateId) {
        CertificateDto cert = certificateService.getCertificateById(certificateId);
        byte[] pdfBytes = certificateService.generateCertificatePdf(certificateId);

        String filename = "ATS-Certificate-" + cert.getCertificateNumber() + ".pdf";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdfBytes);
    }
}
