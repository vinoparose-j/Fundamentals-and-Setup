package com.internship.setup.controller;

import com.internship.setup.dto.EnvironmentReportDto;
import com.internship.setup.dto.HelloResponse;
import com.internship.setup.dto.OnboardingMilestoneDto;
import com.internship.setup.service.SetupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;
import java.util.Map;

/**
 * REST Controller exposing Phase 1 verification, Hello World milestone,
 * runtime environment telemetry, and onboarding checklist endpoints.
 */
@RestController
@RequestMapping("/api")
public class SetupController {

    private final SetupService setupService;

    public SetupController(SetupService setupService) {
        this.setupService = setupService;
    }

    /**
     * Phase 1 Hello World milestone endpoint.
     */
    @GetMapping("/hello")
    public ResponseEntity<HelloResponse> sayHello(
            @RequestParam(name = "name", defaultValue = "World") String name) {
        return ResponseEntity.ok(setupService.buildHelloResponse(name));
    }

    /**
     * Lightweight API health check endpoint.
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "phase1-setup-backend",
                "timestamp", Instant.now().toString()
        ));
    }

    /**
     * Returns live runtime and architectural convention details.
     */
    @GetMapping("/environment")
    public ResponseEntity<EnvironmentReportDto> environment() {
        return ResponseEntity.ok(setupService.getEnvironmentReport());
    }

    /**
     * Returns the 11 Phase 1 onboarding objectives and artifact mapping.
     */
    @GetMapping("/onboarding")
    public ResponseEntity<List<OnboardingMilestoneDto>> onboarding() {
        return ResponseEntity.ok(setupService.getOnboardingMilestones());
    }
}
