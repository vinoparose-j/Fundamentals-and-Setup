package com.internship.setup.dto;

import java.time.Instant;
import java.util.List;

/**
 * Runtime environment diagnostics returned by the backend to verify JDK,
 * Spring Boot, architecture conventions, and readiness.
 */
public record EnvironmentReportDto(
        String applicationName,
        String status,
        String phase,
        String role,
        String javaVersion,
        String javaVendor,
        String springBootVersion,
        String osName,
        String architecturePattern,
        List<String> conventions,
        Instant checkedAt
) {
}
