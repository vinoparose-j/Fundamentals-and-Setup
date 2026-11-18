package com.internship.setup.dto;

import java.time.Instant;

/**
 * Response payload for the Phase 1 "Hello World" verification milestone.
 */
public record HelloResponse(
        String message,
        String internName,
        String role,
        String phase,
        String stack,
        String status,
        Instant timestamp
) {
}
