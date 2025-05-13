"use client";

import { motion } from "framer-motion";

export default function VisualAnalytics() {
  const chartTitles = ["CPU Usage", "Memory Usage", "Disk I/O", "Network Traffic"];
  return (
    <section className="relative z-10 bg-gray-100 py-16">
      <div className="container mx-auto px-8">
        <motion.h3
          className="text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Visual Analytics
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {chartTitles.map((chartTitle) => (
            <motion.div
              key={chartTitle}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
              whileHover={{ scale: 1.03 }}
            >
              <h4 className="text-xl font-semibold text-gray-700 mb-4">{chartTitle}</h4>
              <div className="h-64 flex items-center justify-center text-gray-400">
                <span>Chart Placeholder</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
