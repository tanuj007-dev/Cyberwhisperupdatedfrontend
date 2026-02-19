"use client"

import { motion } from "framer-motion"
import { Target, Eye, ShieldCheck, Zap } from "lucide-react"

const values = [
  {
    icon: ShieldCheck,
    title: "Uncompromising Trust",
    description:
      "We protect confidentiality, respect boundaries, and operate with integrity - always security-first.",
    color: "text-primary",
  },
  {
    icon: Zap,
    title: "Rapid Resilience",
    description: "We build workflows and defenses that help teams respond faster, recover smarter, and improve after every incident.",
    color: "text-primary",
  },
  {
    icon: Target,
    title: "Precision Defense",
    description:
      "We focus on accuracy over noise - evidence-based investigations, clean detections, and outcomes that stand up to scrutiny.",
    color: "text-primary",
  },
  {
    icon: Eye,
    title: "Infinite Vision",
    description: "Threats evolve daily. Our training, labs, and methods are continuously updated to stay ahead.",
    color: "text-primary",
  },
]

export function ValuesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  }

  return (
    <section className="py-12 md:py-2 relative">
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-semibold mb-2 md:mb-4  text-gray-900 dark:text-white">Our Core Values</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The principles that guide how we build security programs and train defenders.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-panel p-5 md:p-8 rounded-2xl group cursor-default bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 shadow-sm dark:shadow-none"
            >
              <div
                className={`p-3 rounded-xl bg-gray-100 dark:bg-white/5 w-fit mb-3 md:mb-6 transition-transform duration-300 ${value.color}`}
              >
                <value.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{value.description}</p>
              <div className="mt-3 md:mt-6 flex items-center text-xs font-mono text-primary opacity-100 transition-opacity">
                <span>SYSTEM_CHECK: STABLE</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

