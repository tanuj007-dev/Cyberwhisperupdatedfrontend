"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { Target, Lightbulb, ShieldCheck } from "lucide-react"

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To empower businesses with robust cybersecurity solutions, ensuring data integrity, privacy & resilience.",
    image: "/approach_mission.png"
  },
  {
    icon: Lightbulb,
    title: "Our Vision",
    desc: "To be the global leader in autonomous cyber defense, setting the standard for digital safety.",
    image: "/approach_vision.png"
  },
  {
    icon: ShieldCheck,
    title: "Our Values",
    desc: "Integrity, innovation, and relentless protection form the core of every solution we build.",
    image: "/approach_values.png"
  },
]

export function ApproachSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  }

  return (
    <section className="py-16 bg-[#F8F9FA] relative">
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto mb-12 space-y-4"
        >
          <span className="text-[#6F2DFF] font-black uppercase tracking-[0.3em] text-[15px]">Our Strategy</span>
          <h2 className="text-3xl md:text-[50px] text-[#030014] font-semibold tracking-tighter">
            Strengthening security, <span className="text-[#6F2DFF]  ">your future</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="relative aspect-4/5 rounded-4xl overflow-hidden group cursor-pointer shadow-xl"
            >
              {/* Card Image Background */}
              <Image
                src={pillar.image}
                alt={pillar.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Overlay - Initial State */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-100" />

              {/* Icon Container - Floating */}
              <div className="absolute top-6 left-6 z-20">
                <div className="w-12 h-12 rounded-xl bg-[#6F2DFF] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <pillar.icon className="w-6 h-6" />
                </div>
              </div>

              {/* Content Box - Animated Reveal */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end h-full">
                <div className="space-y-3 transform transition-all duration-500">
                  <h3 className="text-xl font-black text-white group-hover:text-white transition-colors duration-300">
                    {pillar.title}
                  </h3>

                  <div className="overflow-hidden">
                    <p className="text-white/90 leading-relaxed text-sm translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 italic">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* Decorative line reveal */}
                  <div className="w-0 h-1 bg-[#6F2DFF] group-hover:w-full transition-all duration-700 rounded-full" />
                </div>
              </div>

              {/* Subtle tech border glow */}
              <div className="absolute inset-0 border-2 border-[#6F2DFF]/0 group-hover:border-[#6F2DFF]/50 rounded-4xl transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-100/20 blur-[130px] rounded-full z-0 pointer-events-none" />
    </section>
  )
}
