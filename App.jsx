import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { HelloWorldCard } from "./components/HelloWorldCard";
import { EnvironmentCard } from "./components/EnvironmentCard";
import { OnboardingChecklist } from "./components/OnboardingChecklist";
import { ArchitectureExplorer } from "./components/ArchitectureExplorer";
import {
  fetchEnvironmentReport,
  fetchHelloGreeting,
  fetchOnboardingMilestones,
} from "./services/apiClient";
import { DEFAULT_MILESTONES } from "./services/defaultOnboardingData";

const DEFAULT_HELLO = {
  message: "Hello, World! Your Java Full-Stack Developer development environment is ready.",
  internName: "World",
  role: "Java Full-Stack Developer",
  phase: "Phase 1 - Fundamentals and Setup",
  stack: "Spring Boot 3 + React 19",
  status: "LOCAL_PREVIEW",
  timestamp: new Date().toISOString(),
};

export function App() {
  const [backendOnline, setBackendOnline] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [helloData, setHelloData] = useState(DEFAULT_HELLO);
  const [environmentData, setEnvironmentData] = useState(null);
  const [milestones, setMilestones] = useState(DEFAULT_MILESTONES);

  const verifyBackend = useCallback(async () => {
    setRefreshing(true);
    try {
      const [hello, env, onboarding] = await Promise.all([
        fetchHelloGreeting("World"),
        fetchEnvironmentReport(),
        fetchOnboardingMilestones(),
      ]);
      setHelloData(hello);
      setEnvironmentData(env);
      if (Array.isArray(onboarding) && onboarding.length > 0) {
        setMilestones(onboarding);
      }
      setBackendOnline(true);
    } catch {
      setBackendOnline(false);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    verifyBackend();
  }, [verifyBackend]);

  return (
    <div className="app-shell">
      <Header
        backendOnline={backendOnline}
        onRefresh={verifyBackend}
        refreshing={refreshing}
      />

      <main className="dashboard-container">
        <HelloWorldCard initialGreeting={helloData} backendOnline={backendOnline} />
        <EnvironmentCard environment={environmentData} />
        <OnboardingChecklist milestones={milestones} />
        <ArchitectureExplorer />
      </main>
    </div>
  );
}

export default App;
