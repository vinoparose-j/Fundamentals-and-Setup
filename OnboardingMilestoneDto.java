package com.internship.setup.dto;

/**
 * Represents one Phase 1 internship onboarding objective and verification status.
 */
public record OnboardingMilestoneDto(
        int stepNumber,
        String title,
        String category,
        String description,
        String verificationArtifact,
        boolean completedByDefault
) {
}
