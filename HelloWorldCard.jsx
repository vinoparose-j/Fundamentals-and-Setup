import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { fetchHelloGreeting } from "../services/apiClient";

export function HelloWorldCard({ initialGreeting, backendOnline }) {
  const [nameInput, setNameInput] = useState("World");
  const [greeting, setGreeting] = useState(initialGreeting);
  const [loading, setLoading] = useState(false);
  const [sourceMode, setSourceMode] = useState(backendOnline ? "LIVE_API" : "LOCAL_PREVIEW");

  const activeGreeting = greeting || initialGreeting;

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const cleanName = nameInput.trim() || "World";

    try {
      const liveData = await fetchHelloGreeting(cleanName);
      setGreeting(liveData);
      setSourceMode("LIVE_API");
    } catch {
      setGreeting({
        message: `Hello, ${cleanName}! Your Java Full-Stack Developer development environment is active (local preview).`,
        internName: cleanName,
        role: "Java Full-Stack Developer",
        phase: "Phase 1 - Fundamentals and Setup",
        stack: "Spring Boot 3 + React 19",
        status: "PREVIEW_MODE",
        timestamp: new Date().toISOString(),
      });
      setSourceMode("LOCAL_PREVIEW");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card" aria-labelledby="hello-world-heading">
      <div className="card-header">
        <div>
          <span className="section-tag">Milestone #7 • Verification</span>
          <h2 id="hello-world-heading">Interactive &ldquo;Hello World&rdquo; API Check</h2>
        </div>
        <Sparkles className="icon-accent" size={20} />
      </div>

      <p className="card-subtitle">
        Tests full-stack connectivity between React (Vite) and Spring Boot (<code>GET /api/hello</code>).
      </p>

      <form className="hello-form" onSubmit={handleSubmit}>
        <label htmlFor="intern-name-input" className="sr-only">
          Intern or target name
        </label>
        <input
          id="intern-name-input"
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Enter your name (e.g., World or Alex)"
          className="text-input"
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          <Send size={15} />
          {loading ? "Sending..." : "Test Hello World"}
        </button>
      </form>

      {activeGreeting && (
        <div className="hello-output">
          <div className="hello-banner">
            <strong>{activeGreeting.message}</strong>
            <span className="mini-tag">
              {sourceMode === "LIVE_API" || backendOnline ? "Live Spring Boot JSON" : "Local Preview"}
            </span>
          </div>
          <pre className="code-block">
            {JSON.stringify(activeGreeting, null, 2)}
          </pre>
        </div>
      )}
    </section>
  );
}
