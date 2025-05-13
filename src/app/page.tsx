"use client";

import { useState, useEffect } from "react";
import ParticleBackground from "./components/ParticleBackground";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import SystemSummary from "./components/SystemSummary";
import VisualAnalytics from "./components/VisualAnalytics";
import RecentLogAnalysis from "./components/RecentLogAnalysis";
import Footer from "./components/Footer";
import DataForm from "./components/DataForm";

export interface LogEntry {
  timestamp: string;
  id: number;
  event: string;
  cpu_usage: number;
  memory_usage: number;
  disk_io: number;
  network_traffic: number;
  response_time: number;
  risk_score: number;
}

export default function Home() {
  const [latestLog, setLatestLog] = useState<LogEntry | null>(null);
  const [logsData, setLogsData] = useState<{ total_logs: number; logs: LogEntry[] }>({
    total_logs: 0,
    logs: [],
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";

  // Helper function to format numeric fields
  const formatLogEntry = (log: LogEntry): LogEntry => ({
    ...log,
    cpu_usage: log.cpu_usage != null ? Number(log.cpu_usage.toFixed(2)) : 0,
    memory_usage: log.memory_usage != null ? Number(log.memory_usage.toFixed(2)) : 0,
    disk_io: log.disk_io != null ? Number(log.disk_io.toFixed(2)) : 0,
    network_traffic: log.network_traffic != null ? Number(log.network_traffic.toFixed(2)) : 0,
    response_time: log.response_time != null ? Number(log.response_time.toFixed(2)) : 0,
  });  

  // Fetch aggregated logs data from the GET endpoint
  const fetchLogsData = () => {
    fetch(`${apiUrl}/log/`, {
      headers: { "x-api-key": apiKey },
    })
      .then((res) => res.json())
      .then((data) => {
        // Transform each log entry using our helper function
        const transformedLogs = data.logs.map((log: LogEntry) => formatLogEntry(log));
        setLogsData({
          total_logs: data.total_logs,
          logs: transformedLogs,
        });
        if (transformedLogs.length > 0) {
          setLatestLog(transformedLogs[0]);
        } else {
          setLatestLog(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching logs data:", error);
        setLoading(false);
      });
  };

  // Refresh aggregated logs on mount
  useEffect(() => {
    fetchLogsData();
  }, [apiUrl, apiKey]);

  // Handle form submission (manual input)
  const handleFormSubmit = (data: {
    cpu_usage: number;
    memory_usage: number;
    disk_io: number;
    network_traffic: number;
    response_time: number;
  }) => {
    setSubmitting(true);
    fetch(`${apiUrl}/log/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Submission result:", result);
        setSubmitting(false);
        fetchLogsData();
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        setSubmitting(false);
      });
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-900 overflow-hidden">
      <ParticleBackground />
      <Navigation />
      <HeroSection />

      {/* Data Submission Form */}
      <div className="relative z-10 container mx-auto px-8 py-8">
        <DataForm onSubmit={handleFormSubmit} />
        {submitting && (
          <p className="mt-4 text-center text-blue-600 font-semibold">
            Submitting data...
          </p>
        )}
      </div>

      {/* Total Logs Count */}
      <section className="relative z-10 container mx-auto px-8 py-4 text-center">
        <h2 className="text-3xl font-bold text-gray-100">
          Total Logs: {logsData.total_logs}
        </h2>
      </section>

      <SystemSummary log={latestLog} />
      <VisualAnalytics />
      <RecentLogAnalysis loading={loading} logs={logsData.logs.slice(0, 15)} />
      <Footer />
    </div>
  );
}
