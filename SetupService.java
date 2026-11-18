package com.internship.setup.service;

import com.internship.setup.dto.EnvironmentReportDto;
import com.internship.setup.dto.HelloResponse;
import com.internship.setup.dto.OnboardingMilestoneDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringBootVersion;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

/**
 * Business logic layer providing greeting verification, runtime diagnostics,
 * and Phase 1 onboarding curriculum milestones.
 */
@Service
public class SetupService {

    @Value("${spring.application.name:phase1-setup-backend}")
    private String applicationName;

    @Value("${app.internship.phase:Phase 1 - Fundamentals and Setup}")
    private String phase;

    @Value("${app.internship.role:Java Full-Stack Developer}")
    private String role;

    @Value("${app.internship.stack:Spring Boot 3 + React 19}")
    private String stack;

    /**
     * Builds the Phase 1 Hello World verification greeting.
     *
     * @param name optional intern name query parameter
     * @return structured greeting payload
     */
    public HelloResponse buildHelloResponse(String name) {
        String cleanName = (name == null || name.isBlank()) ? "World" : name.trim();
        String message = String.format(
                "Hello, %s! Your %s development environment is active and verified.",
                cleanName,
                role
        );

        return new HelloResponse(
                message,
                cleanName,
                role,
                phase,
                stack,
                "VERIFIED",
                Instant.now()
        );
    }

    /**
     * Collects live JVM, OS, Spring Boot, and architectural convention details.
     *
     * @return environment diagnostic DTO
     */
    public EnvironmentReportDto getEnvironmentReport() {
        return new EnvironmentReportDto(
                applicationName,
                "UP",
                phase,
                role,
                System.getProperty("java.version"),
                System.getProperty("java.vendor"),
                SpringBootVersion.getVersion(),
                System.getProperty("os.name"),
                "Controller -> Service -> DTO (Layered REST Architecture)",
                List.of(
                        "Package-by-layer (config, controller, dto, service) with PascalCase classes",
                        "camelCase methods/variables and kebab-case REST endpoints (/api/onboarding)",
                        "Immutable Java records for API DTO contracts",
                        "Environment-driven configuration via application.properties and .env",
                        "Conventional Commits (feat:, fix:, docs:, test:, chore:) on feature branches"
                ),
                Instant.now()
        );
    }

    /**
     * Returns all 11 objectives for Internship Phase 1: Fundamentals and Setup.
     *
     * @return immutable list of onboarding milestones
     */
    public List<OnboardingMilestoneDto> getOnboardingMilestones() {
        return List.of(
                new OnboardingMilestoneDto(1, "Internship Orientation & Workspace Prep", "Onboarding",
                        "Understand program goals, expectations, and establish a dedicated local workspace.",
                        "README.md", true),
                new OnboardingMilestoneDto(2, "Install Role-Specific Tools & SDKs", "Environment",
                        "Install and verify Java JDK, Apache Maven, Node.js, and npm.",
                        "scripts/verify-environment.ps1", true),
                new OnboardingMilestoneDto(3, "Configure Code Editor & Frameworks", "Tooling",
                        "Configure VS Code extensions, debugger launch configs, Spring Boot, and React + Vite.",
                        ".vscode/extensions.json", true),
                new OnboardingMilestoneDto(4, "Master Project Structure & Conventions", "Architecture",
                        "Organize backend (Controller -> Service -> DTO) and frontend (components/services/styles) cleanly.",
                        "docs/ARCHITECTURE.md", true),
                new OnboardingMilestoneDto(5, "Study Java Full-Stack Fundamentals", "Fundamentals",
                        "Apply OOP, REST API design, dependency injection, React hooks, and component state.",
                        "backend/.../SetupService.java", true),
                new OnboardingMilestoneDto(6, "Set Up Git & GitHub Version Control", "Version Control",
                        "Configure .gitignore, branching strategy, Conventional Commits, and GitHub PR workflow.",
                        "docs/GIT_WORKFLOW.md", true),
                new OnboardingMilestoneDto(7, "Build & Verify 'Hello World' Milestone", "Milestone",
                        "Serve GET /api/hello from Spring Boot and render live API verification in React.",
                        "GET /api/hello + App.jsx", true),
                new OnboardingMilestoneDto(8, "Adopt Team Workflows & Communication Protocols", "Collaboration",
                        "Follow daily standup structure, PR review etiquette, and mentor escalation protocols.",
                        "docs/TEAM_PROTOCOLS.md", true),
                new OnboardingMilestoneDto(9, "Review Curated Documentation & Resources", "Learning",
                        "Bookmark official Spring Boot, React, Git, and Java 21 documentation guides.",
                        "docs/LEARNING_RESOURCES.md", true),
                new OnboardingMilestoneDto(10, "Complete Initial Onboarding & CI Checks", "Quality",
                        "Run automated JUnit 5 backend tests, Vitest/Vite frontend build, and CI workflow.",
                        ".github/workflows/ci.yml", true),
                new OnboardingMilestoneDto(11, "Validate Full Environment Readiness", "Sign-off",
                        "Confirm full-stack end-to-end communication and generate Phase 1 submission artifacts.",
                        "Internship_Task1_Report.docx", true)
        );
    }
}
