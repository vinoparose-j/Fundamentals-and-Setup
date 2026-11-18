import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 4000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchHelloGreeting(name = "World") {
  const response = await http.get("/hello", {
    params: { name: name.trim() || "World" },
  });
  return response.data;
}

export async function fetchEnvironmentReport() {
  const response = await http.get("/environment");
  return response.data;
}

export async function fetchOnboardingMilestones() {
  const response = await http.get("/onboarding");
  return response.data;
}

export async function fetchHealthStatus() {
  const response = await http.get("/health");
  return response.data;
}
