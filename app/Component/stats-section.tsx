"use client"

import { motion } from "framer-motion"

const stats = [
  { label: "Threats Blocked", value: "2.4B+", prefix: "" },
  { label: "Uptime Guarantee", value: "99.99", prefix: "%" },
  { label: "Response Time", value: "< 5", prefix: "ms" },
  { label: "Global Clients", value: "500+", prefix: "" },
]

export function StatsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 }
    },
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group"
            >
              <div className="text-4xl md:text-5xl font-mono font-bold text-primary mb-2 transition-transform group-hover:scale-110 duration-300">
                {stat.value}
                {stat.prefix}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm md:text-base uppercase tracking-widest font-medium">
                {stat.label}
              </div>
              <div className="h-0.5 w-0 group-hover:w-full bg-primary/50 mx-auto mt-4 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

