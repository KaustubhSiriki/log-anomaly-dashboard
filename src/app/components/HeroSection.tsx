"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative z-10 py-20 bg-gradient-to-r bg-transparent">
      <div className="container mx-auto px-8 text-center">
        <motion.h2
          className="text-5xl font-extrabold text-white mb-6 tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Empower Your Infrastructure
        </motion.h2>
        <motion.p
          className="text-xl text-white mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Real-time monitoring and AI-driven anomaly detection to secure and optimize your systems.
        </motion.p>
      </div>
    </section>
  );
}
