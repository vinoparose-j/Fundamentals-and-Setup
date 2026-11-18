import { Cpu, Layers } from "lucide-react";

const DEFAULT_ENV = {
  applicationName: "phase1-setup-backend",
  status: "LOCAL_PREVIEW",
  phase: "Phase 1 - Fundamentals and Setup",
  role: "Java Full-Stack Developer",
  javaVersion: "25.0.1 (Target: Java 21)",
  javaVendor: "Oracle Corporation",
  springBootVersion: "3.5.6",
  osName: "Windows 11",
  architecturePattern: "Controller -> Service -> DTO (Layered REST Architecture)",
  conventions: [
    "Package-by-layer (config, controller, dto, service) with PascalCase classes",
    "camelCase methods/variables and kebab-case REST endpoints (/api/onboarding)",
    "Immutable Java records for API DTO contracts",
    "Environment-driven configuration via application.properties and .env",
    "Conventional Commits (feat:, fix:, docs:, test:, chore:) on feature branches",
  ],
};

export function EnvironmentCard({ environment }) {
  const env = environment || DEFAULT_ENV;

  return (
    <section className="card" aria-labelledby="env-heading">
      <div className="card-header">
        <div>
          <span className="section-tag">Objectives #2, #3 &amp; #4</span>
          <h2 id="env-heading">Environment &amp; Stack Diagnostics</h2>
        </div>
        <Cpu className="icon-accent" size={20} />
      </div>

      <div className="spec-grid">
        <div className="spec-item">
          <span className="spec-label">Role Specialization</span>
          <span className="spec-value">{env.role}</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">Java Runtime</span>
          <span className="spec-value">{env.javaVersion}</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">Spring Boot</span>
          <span className="spec-value">{env.springBootVersion}</span>
        </div>
        <div className="spec-item">
          <span className="spec-label">Frontend Stack</span>
          <span className="spec-value">React 19 + Vite 6 + Axios</span>
        </div>
      </div>

      <div className="conventions-box">
        <div className="conventions-title">
          <Layers size={15} />
          <span>{env.architecturePattern}</span>
        </div>
        <ul className="conventions-list">
          {env.conventions.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
