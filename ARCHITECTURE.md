# Architecture & Coding Conventions

## 1. Monorepo Layout

This repository separates the **Java Spring Boot REST API (`backend/`)** and the **React + Vite Single Page Application (`frontend/`)** inside a single cohesive Phase 1 baseline.

```text
Internship-Phase1-Java-FullStack/
├── backend/                     # Spring Boot 3.5 REST API (Maven)
├── frontend/                    # React 19 + Vite 6 SPA (npm)
├── docs/                        # Engineering guides & onboarding protocols
├── scripts/                     # Local environment verification & dev startup
└── .github/                     # PR templates & GitHub Actions CI
```

## 2. Backend Layered Architecture

The backend follows a clean three-tier REST structure:

1. **Configuration Layer (`com.internship.setup.config`)**
   - Centralizes cross-cutting framework wiring such as `CorsConfig` (`WebMvcConfigurer`).
2. **Controller Layer (`com.internship.setup.controller`)**
   - Handles HTTP routing, request parameter binding, and status codes (`SetupController`).
   - Contains zero business logic; delegates immediately to the service layer.
3. **Service Layer (`com.internship.setup.service`)**
   - Implements business rules and constructs structured DTOs (`SetupService`).
4. **DTO Layer (`com.internship.setup.dto`)**
   - Uses Java 21 `record` classes (`HelloResponse`, `EnvironmentReportDto`, `OnboardingMilestoneDto`) for immutable, self-documenting JSON contracts.

## 3. Naming & Style Conventions

| Layer / Scope | Convention | Example |
| :--- | :--- | :--- |
| Java Packages | Lowercase reverse-domain | `com.internship.setup.controller` |
| Java Classes & Records | PascalCase | `SetupController`, `HelloResponse` |
| Java Methods & Variables | camelCase | `buildHelloResponse`, `cleanName` |
| REST API Endpoints | Lowercase kebab-case under `/api` | `/api/hello`, `/api/environment`, `/api/onboarding` |
| React Components | PascalCase JSX modules | `HelloWorldCard.jsx`, `OnboardingChecklist.jsx` |
| Frontend Services | camelCase helper modules | `apiClient.js`, `fetchHelloGreeting` |
| CSS Custom Properties | Lowercase kebab-case | `--primary-soft`, `--code-bg` |

## 4. Environment & Configuration Hygiene

- Backend settings live in `backend/src/main/resources/application.properties`.
- Frontend settings use `VITE_*` variables documented in `frontend/.env.example`.
- Secrets and machine-specific `.env` files are excluded via `.gitignore`.
