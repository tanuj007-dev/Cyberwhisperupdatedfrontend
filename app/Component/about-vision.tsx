"use client"
import { Shield, CheckCircle2, Phone } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

export function AboutVision() {
  return (
    <section className="py-8 md:py-12 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl aspect-video lg:aspect-auto lg:h-[400px]">
              <Image
                src="/cyber_security_center_high_tech_1767456060967.webp"
                alt="Cyber Security Operations"
                fill
                className="object-cover transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent dark:from-[#0E0429] opacity-40" />
            </div>

            {/* Secondary Image - Hidden on mobile for compactness */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute -bottom-4 -right-4 w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-white dark:border-[#0E0429] shadow-2xl z-20 hidden md:block"
            >
              <Image src="/cyber_code_matrix_1767456122911.webp" alt="Digital Shield" fill className="object-cover" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </motion.div>

            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 blur-[60px] rounded-full animate-pulse-slow" />
          </motion.div>

          {/* Content Section */}
          <div className="space-y-6 lg:max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-primary" />
                <span className="text-primary font-bold uppercase tracking-widest text-[10px]">OUR STORY</span>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-[44px] font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight">
                Your Trusted Partner for <br />
                <span className="text-primary">Cyber Defense</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-[15px] leading-relaxed">
               Cyber Whisper is built by cybersecurity practitioners focused on outcomes, not noise. We help organizations strengthen detection and response, enable SOC teams with repeatable workflows, and train analysts using realistic labs that build true muscle memory. From advisory to implementation to training, the goal is the same: reduce risk and improve readiness.
              </p>
            </motion.div>

            {/* Points Grid */}
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
              {[
                { title: "Adaptive Security", desc: "Security programs that evolve with your environment and threat landscape." },
                { title: "Elite Threat Detection", desc: "Detection engineering and threat hunting aligned to real attacker behavior." },
                { title: "Zero-Trust Readiness", desc: "Identity-first access controls and hardened baselines for users, devices, and workloads." },
                { title: "Immersive Range Training", desc: "Cyber range labs and CTF exercises mapped to real SOC workflows." }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="space-y-1 group"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-bold text-gray-900 dark:text-white text-[14px] leading-tight">{item.title}</span>
                  </div>
                  <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-snug ml-6">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button className="py-3 px-14 rounded-full bg-primary text-white font-bold uppercase tracking-wider text-[11px] hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/20 w-full sm:w-auto">
                Get Started
              </button>
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Expert Support</p>
                  <p className="text-[15px] font-bold text-gray-900 dark:text-white">Talk to an Expert</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

