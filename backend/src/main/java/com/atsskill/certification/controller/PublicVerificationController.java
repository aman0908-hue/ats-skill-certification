package com.atsskill.certification.controller;

import com.atsskill.certification.dto.ApiResponse;
import com.atsskill.certification.dto.PublicVerificationDto;
import com.atsskill.certification.service.CertificateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/certificates")
public class PublicVerificationController {

    private final CertificateService certificateService;

    public PublicVerificationController(CertificateService certificateService) {
        this.certificateService = certificateService;
    }

    @GetMapping("/verify/{token}")
    public ResponseEntity<ApiResponse<PublicVerificationDto>> verifyCertificate(@PathVariable String token) {
        PublicVerificationDto result = certificateService.verifyCertificate(token);
        return ResponseEntity.ok(ApiResponse.ok(result));
    }
}
