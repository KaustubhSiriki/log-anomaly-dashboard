"use client";

import { motion } from "framer-motion";
import { LogEntry } from "../page"; // Adjust the import path as needed

interface Props {
  loading: boolean;
  logs: LogEntry[];
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  // Customize formatting options if desired:
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function RecentLogAnalysis({ loading, logs }: Props) {
  // Define headers matching the LogEntry attributes
  const headers = [
    "Timestamp",
    "Event",
    "CPU Usage",
    "Memory Usage",
    "Disk I/O",
    "Network Traffic",
    "Response Time",
    "Risk Score",
  ];

  return (
    <section className="relative z-10 container mx-auto px-8 py-16 text-gray-100">
      <motion.h3
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        Recent Log Details
      </motion.h3>
      {loading ? (
        <p className="text-center text-2xl">Loading logs...</p>
      ) : logs && logs.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                {headers.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {logs.slice(0, 15).map((log, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {formatTimestamp(log.timestamp) + " UTC"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {log.event}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {log.cpu_usage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {log.memory_usage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {log.disk_io}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {log.network_traffic}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {log.response_time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                    {log.risk_score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-2xl">No log data available.</p>
      )}
    </section>
  );
}
