import { useEffect, useState } from "react";
import { CheckSquare, ClipboardList, Square } from "lucide-react";

const STORAGE_KEY = "phase1_onboarding_completed_steps";

export function OnboardingChecklist({ milestones }) {
  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore storage access failures in restricted environments
    }
    return milestones.filter((m) => m.completedByDefault).map((m) => m.stepNumber);
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedSteps));
    } catch {
      // Ignore storage persistence errors
    }
  }, [completedSteps]);

  function toggleStep(stepNumber) {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber)
        ? prev.filter((step) => step !== stepNumber)
        : [...prev, stepNumber]
    );
  }

  const completedCount = completedSteps.length;
  const totalCount = milestones.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section className="card card-full" aria-labelledby="checklist-heading">
      <div className="card-header">
        <div>
          <span className="section-tag">Objectives #1 – #11 • Progress Tracker</span>
          <h2 id="checklist-heading">Phase 1 Onboarding &amp; Setup Checklist</h2>
        </div>
        <div className="progress-summary">
          <ClipboardList size={18} className="icon-accent" />
          <span>
            {completedCount}/{totalCount} Completed ({progressPct}%)
          </span>
        </div>
      </div>

      <div className="progress-bar-track" aria-hidden="true">
        <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
      </div>

      <div className="milestone-grid">
        {milestones.map((item) => {
          const isDone = completedSteps.includes(item.stepNumber);
          return (
            <button
              key={item.stepNumber}
              type="button"
              className={`milestone-item ${isDone ? "milestone-done" : ""}`}
              onClick={() => toggleStep(item.stepNumber)}
              aria-pressed={isDone}
            >
              <div className="milestone-top">
                <span className="milestone-check">
                  {isDone ? <CheckSquare size={17} /> : <Square size={17} />}
                </span>
                <span className="milestone-step">#{item.stepNumber}</span>
                <span className="milestone-cat">{item.category}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="artifact-pill">Artifact: {item.verificationArtifact}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
