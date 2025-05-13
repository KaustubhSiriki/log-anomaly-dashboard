"use client";

import { motion } from "framer-motion";

export default function Navigation() {
  return (
    <nav className="relative z-10 shadow-md border-b border-gray-200">
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        <motion.h1 className="text-3xl font-bold text-blue-300" whileHover={{ scale: 1.05 }}>
          AnomalyLog
        </motion.h1>
        <ul className="flex space-x-8 text-lg font-medium text-white">
          {["Home", "Logs", "Analytics", "Settings"].map((item) => (
            <motion.li
              key={item}
              whileHover={{ y: -3 }}
              className="hover:text-blue-600 transition-colors"
            >
              <a href="#">{item}</a>
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
