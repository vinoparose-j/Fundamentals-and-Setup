import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./services/apiClient", () => ({
  fetchHelloGreeting: vi.fn().mockResolvedValue({
    message: "Hello, World! Your Java Full-Stack Developer development environment is active and verified.",
    internName: "World",
    role: "Java Full-Stack Developer",
    phase: "Phase 1 - Fundamentals and Setup",
    stack: "Spring Boot 3 + React 19",
    status: "VERIFIED",
    timestamp: "2026-11-10T15:00:00Z",
  }),
  fetchEnvironmentReport: vi.fn().mockResolvedValue({
    applicationName: "phase1-setup-backend",
    status: "UP",
    phase: "Phase 1 - Fundamentals and Setup",
    role: "Java Full-Stack Developer",
    javaVersion: "25.0.1",
    javaVendor: "Oracle Corporation",
    springBootVersion: "3.5.6",
    osName: "Windows 11",
    architecturePattern: "Controller -> Service -> DTO",
    conventions: ["Package-by-layer", "Conventional Commits"],
  }),
  fetchOnboardingMilestones: vi.fn().mockResolvedValue([]),
}));

describe("Phase 1 Fundamentals and Setup App", () => {
  it("renders dashboard heading and all 11 onboarding milestones", async () => {
    render(<App />);
    expect(screen.getByText(/Java Full-Stack Workspace Verification/i)).toBeInTheDocument();
    expect(screen.getByText(/Interactive .*Hello World.* API Check/i)).toBeInTheDocument();
    expect(screen.getByText(/11\/11 Completed/i)).toBeInTheDocument();
    expect(await screen.findByText(/Spring Boot API Connected/i)).toBeInTheDocument();
  });
});
