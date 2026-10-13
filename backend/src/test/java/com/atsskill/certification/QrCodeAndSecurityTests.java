package com.atsskill.certification;

import com.atsskill.certification.service.QrCodeService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

class QrCodeAndSecurityTests {

    @Test
    @DisplayName("Verify BCrypt password hashing produces secure distinct hashes")
    void testPasswordHashing() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "SecurePassword@2026";
        String hash1 = encoder.encode(rawPassword);
        String hash2 = encoder.encode(rawPassword);

        // Hashes should differ due to dynamic salts
        assertNotEquals(hash1, hash2);
        assertTrue(encoder.matches(rawPassword, hash1));
        assertTrue(encoder.matches(rawPassword, hash2));
        assertFalse(encoder.matches("WrongPassword", hash1));
    }

    @Test
    @DisplayName("Verify QR Code generator produces valid non-empty PNG bytes")
    void testQrCodeGeneration() {
        QrCodeService qrCodeService = new QrCodeService();
        String testUrl = "http://localhost:5173/verify/TEST-TOKEN-123456";

        byte[] pngBytes = qrCodeService.generateQrCodePng(testUrl, 200, 200);
        assertNotNull(pngBytes);
        assertTrue(pngBytes.length > 100);

        // Verify PNG magic header: 89 50 4E 47 0D 0A 1A 0A
        assertEquals((byte) 0x89, pngBytes[0]);
        assertEquals((byte) 'P', pngBytes[1]);
        assertEquals((byte) 'N', pngBytes[2]);
        assertEquals((byte) 'G', pngBytes[3]);

        String base64 = qrCodeService.generateQrCodeBase64(testUrl, 200, 200);
        assertTrue(base64.startsWith("data:image/png;base64,"));
    }
}
