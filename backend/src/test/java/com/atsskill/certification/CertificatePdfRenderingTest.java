package com.atsskill.certification;

import com.atsskill.certification.model.CertificateTemplate;
import com.atsskill.certification.service.CertificateService;
import com.atsskill.certification.service.QrCodeService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CertificatePdfRenderingTest {

    @Test
    @DisplayName("Verify renderPreviewPdf executes without SAX or XML parsing errors")
    void testRenderPreviewPdf() throws Exception {
        CertificateService certificateService = new CertificateService(
                null,
                null,
                new QrCodeService(),
                null
        );

        CertificateTemplate template = new CertificateTemplate();
        template.setName("Test Template");

        byte[] pdfBytes = certificateService.renderPreviewPdf(template);

        assertNotNull(pdfBytes, "PDF byte array must not be null");
        assertTrue(pdfBytes.length > 500, "PDF byte array must be valid size");

        java.nio.file.Files.write(java.nio.file.Path.of("/tmp/official-rendered-cert.pdf"), pdfBytes);
        // Verify PDF magic header %PDF-
        assertEquals('%', (char) pdfBytes[0]);
        assertEquals('P', (char) pdfBytes[1]);
        assertEquals('D', (char) pdfBytes[2]);
        assertEquals('F', (char) pdfBytes[3]);
    }
}
