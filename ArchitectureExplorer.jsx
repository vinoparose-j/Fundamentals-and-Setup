import { FolderTree, GitBranch, Users } from "lucide-react";

const STRUCTURE_SNIPPET = `Internship-Phase1-Java-FullStack/
├── backend/                     # Spring Boot 3.5 REST API
│   └── src/main/java/com/internship/setup/
│       ├── SetupApplication.java
│       ├── config/CorsConfig.java
│       ├── controller/SetupController.java
│       ├── dto/                 # Java 21 Immutable Records
│       └── service/SetupService.java
├── frontend/                    # React 19 + Vite SPA
│   └── src/
│       ├── components/          # Modular UI components
│       ├── services/            # Axios REST API client
│       └── styles/              # Design tokens & layout
├── docs/                        # Architecture, Git, Team & Learning Guides
├── scripts/                     # Environment verification & dev launcher
└── .github/workflows/ci.yml     # Automated Maven + Vite CI`;

export function ArchitectureExplorer() {
  return (
    <section className="card card-full" aria-labelledby="arch-heading">
      <div className="card-header">
        <div>
          <span className="section-tag">Objectives #4, #6, #8 &amp; #9</span>
          <h2 id="arch-heading">Project Architecture, Git Workflow &amp; Team Standards</h2>
        </div>
        <FolderTree className="icon-accent" size={20} />
      </div>

      <div className="arch-grid">
        <div>
          <h3 className="subhead">Monorepo Folder Conventions</h3>
          <pre className="code-block">{STRUCTURE_SNIPPET}</pre>
        </div>

        <div className="standards-stack">
          <div className="standard-box">
            <div className="standard-title">
              <GitBranch size={16} className="icon-accent" />
              <h3>Git &amp; GitHub Branching Protocol</h3>
            </div>
            <ul>
              <li><code>main</code> — Protected, deployable Phase 1 baseline</li>
              <li><code>feat/phase1-setup</code> — Feature development branch</li>
              <li><code>docs/onboarding-report</code> — Documentation updates</li>
              <li>Conventional Commits: <code>feat:</code>, <code>fix:</code>, <code>docs:</code>, <code>test:</code></li>
            </ul>
          </div>

          <div className="standard-box">
            <div className="standard-title">
              <Users size={16} className="icon-accent" />
              <h3>Team &amp; Mentor Communication</h3>
            </div>
            <ul>
              <li>Daily Standup: Yesterday, Today, Blockers (concise &amp; async-ready)</li>
              <li>PR Etiquette: Small focused diffs, passing CI checks, clear description</li>
              <li>Mentor Escalation: Share reproducible error logs &amp; attempted steps</li>
              <li>Documentation: Update <code>README.md</code> &amp; <code>docs/</code> alongside code</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
