"use client";

import { log } from "console";
import { motion } from "framer-motion";

interface LogEntry {
  event: string;
  risk_score: number;
  timestamp: string;
}

interface Props {
  log: LogEntry | null;
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function SystemSummary({ log }: Props) {
  console.log("Testing", log?.event);
  return (
    <section className="relative z-10 container mx-auto px-8 py-16 text-white">
      <motion.h3
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        System Overview
      </motion.h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          className="p-8 bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
          whileHover={{ scale: 1.03 }}
        >
          <h4 className="text-2xl font-semibold text-blue-600">Latest Event</h4>
          <p className="mt-4 text-3xl font-bold text-gray-600">{log ? log.event : "--"}</p>
        </motion.div>
        <motion.div
          className="p-8 bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
          whileHover={{ scale: 1.03 }}
        >
          <h4 className="text-2xl font-semibold text-blue-600">Risk Score</h4>
          <p className="mt-4 text-3xl font-bold text-red-600">{log ? log.risk_score : "--"}</p>
        </motion.div>
        <motion.div
          className="p-8 bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
          whileHover={{ scale: 1.03 }}
        >
          <h4 className="text-2xl font-semibold text-blue-600">Timestamp</h4>
          <p className="mt-4 text-xl font-bold text-gray-600">{log ? formatTimestamp(log.timestamp) + " UTC" : "--"}</p>
        </motion.div>
      </div>
    </section>
  );
}
