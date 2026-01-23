"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { Target, Lightbulb, ShieldCheck } from "lucide-react"

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To strengthen cyber defense through hands-on, real-world learning and SOC enablement - helping teams prevent, detect, investigate, and respond with confidence using practical workflows, labs, and measurable outcomes.",
    image: "/approach_mission.webp"
  },
  {
    icon: Lightbulb,
    title: "Our Vision",
    desc: "To build the most trusted cyber range and SOC enablement ecosystem, where every learner and security team can practice on realistic attack scenarios, validate skills, and become job-ready defenders at scale.",
    image: "/approach_vision.webp"
  },
  {
    icon: ShieldCheck,
    title: "Our Values",
    desc: "Practitioner-led excellence, hands-on execution, clarity and accountability, continuous improvement, and integrity in everything delivered.",
    image: "/approach_values.webp"
  },
]

export function ApproachSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const itemVariants: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  }

  return (
    <section className="py-10 md:py-14 bg-[#fafafa] dark:bg-[#02000d] relative overflow-hidden transition-colors duration-500">

      {/* Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,#6F2DFF10,transparent_40%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,#a855f705,transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8 md:mb-12 space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px]">Strategy</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-900 dark:text-white font-bold tracking-tight">
            Strengthening security, <span className="text-primary  ">your future</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-5 lg:gap-6"
        >
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="relative group h-full"
            >
              {/* Ultra Compact Cyber Card with Moving Border */}
              <div className="relative h-full rounded-3xl p-px overflow-hidden group/card shadow-lg dark:shadow-none transition-all duration-500">

                {/* Moving Border Animation Layer (Always Active) */}
                <div className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_20%,#6F2DFF_50%,transparent_80%)] opacity-30 dark:opacity-50 group-hover/card:opacity-100 transition-opacity duration-500" />

                {/* Internal Card Content */}
                <div className="relative h-full flex flex-col p-5 md:p-6 rounded-[calc(1.5rem-1px)] bg-white dark:bg-[#0a051a] border border-gray-200/40 dark:border-white/5 overflow-hidden z-10">

                  {/* Neon Accent Strip */}
                  <div className="absolute top-0 left-0 w-16 h-[2px] bg-linear-to-r from-primary to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                  {/* Subtle Hover Glow */}
                  <div className="absolute -inset-10 bg-primary/5 blur-[50px] rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Header: Icon + Number */}
                  <div className="relative mb-4 flex justify-between items-center">
                    <div className="w-11 h-11 rounded-xl bg-linear-to-br from-primary to-purple-600 p-px group-hover:scale-110 transition-transform duration-500 animate-float" style={{ animationDelay: `${idx * 0.15}s` }}>
                      <div className="w-full h-full rounded-[11px] bg-white dark:bg-[#0B0224] flex items-center justify-center text-primary dark:text-white">
                        <pillar.icon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      </div>
                    </div>

                    {/* Styled Backdrop Number */}
                    <div className="flex flex-col items-end">
                      <span className="text-3xl font-black text-gray-100 dark:text-white/5 select-none leading-none group-hover:text-primary/10 transition-colors italic">0{idx + 1}</span>
                      <div className="h-px w-4 bg-primary/20 group-hover:w-full transition-all duration-500" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-snug font-medium mb-5 opacity-90">
                      {pillar.desc}
                    </p>

                    {/* Integrated Preview Window */}
                    <div className="mt-auto px-1">
                      <div className="relative rounded-xl overflow-hidden aspect-21/9 group/img shadow-inner border border-black/5 dark:border-white/5 bg-gray-50 dark:bg-black/20">
                        <Image
                          src={pillar.image}
                          alt={pillar.title}
                          fill
                          className="object-cover scale-105 group-hover/img:scale-115 transition-transform duration-700"
                        />
                        {/* Scanline overlay */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-size-[100%_2px,3px_100%] pointer-events-none opacity-20" />
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>
                  </div>

                  {/* Animated Tech Details */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/40 rounded-br-3xl transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Styled Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }
      `}</style>
    </section>
  )
}
