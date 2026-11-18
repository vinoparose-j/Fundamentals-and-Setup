import { CheckCircle2, Terminal, Wifi, WifiOff } from "lucide-react";

export function Header({ backendOnline, onRefresh, refreshing }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <div className="brand-icon" aria-hidden="true">
            <Terminal size={20} />
          </div>
          <div>
            <span className="phase-pill">Internship Phase 1 • Fundamentals &amp; Setup</span>
            <h1>Java Full-Stack Workspace Verification</h1>
          </div>
        </div>

        <div className="topbar-actions">
          <div
            className={`status-badge ${backendOnline ? "status-online" : "status-offline"}`}
            role="status"
          >
            {backendOnline ? <Wifi size={15} /> : <WifiOff size={15} />}
            <span>
              {backendOnline ? "Spring Boot API Connected" : "Frontend Preview (Backend Offline)"}
            </span>
          </div>

          <button
            type="button"
            className="btn-secondary"
            onClick={onRefresh}
            disabled={refreshing}
          >
            <CheckCircle2 size={15} />
            {refreshing ? "Checking..." : "Re-verify Stack"}
          </button>
        </div>
      </div>
    </header>
  );
}
