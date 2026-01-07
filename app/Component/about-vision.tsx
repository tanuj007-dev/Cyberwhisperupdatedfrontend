"use client"
import { Shield, CheckCircle2, Phone } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

export function AboutVision() {
  return (
    <section className="py-16  relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            {/* Image Stack inspired by reference */}
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] aspect-video">
              <Image
                src="/cyber_security_center_high_tech_1767456060967.png"
                alt="Cyber Security Operations"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#030014] via-transparent to-transparent opacity-60" />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute -bottom-8 -right-8 w-64 h-64 rounded-3xl overflow-hidden border-8 border-[#030014] shadow-2xl z-20 hidden md:block group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-700"
            >
              <Image src="/cyber_code_matrix_1767456122911.png" alt="Digital Shield" fill className="object-cover" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </motion.div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/30 blur-[80px] rounded-full animate-pulse-slow" />
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-primary" />
                <span className="text-primary font-semibold uppercase tracking-widest text-xs">Our Vision</span>
              </div>
              <h2 className="text-3xl md:text-[50px] font-semibold text-white leading-tight tracking-tighter">
                Your Trusted Partner for <br />
                <span className="text-primary  ">Cyber Defense</span>
              </h2>
              <p className="text-gray-400 text-[15px] leading-relaxed max-w-lg">
                Cyber Whisper is dedicated to building the next generation of cyber defenders through
                immersive simulations and cutting-edge security intelligence.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold text-white">Adaptive Security</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Dynamic threat protection that evolves with the landscape. Dynamic threat protection that evolves with the landscape.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-4 pt-2"
              >
                {["Elite Threat Detection", "Zero-Trust Architecture", "Immersive Range Training"].map((item) => (
                  <div key={item} className="flex items-center gap-4 group cursor-default">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-bold text-gray-300 group-hover:text-white transition-colors text-base">{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-6 pt-2"
            >
              <div className="flex items-center gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-white/5 transition-all">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-[0_0_25px_rgba(168,85,247,0.4)]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Expert Support</p>
                  <p className="text-lg   text-white hover:text-primary transition-colors">+91 9220946887</p>
                </div>
              </div>
              <button className="py-4 px-12 rounded-full bg-primary text-white  font-semibold uppercase tracking-widest text-xs hover:bg-primary/90 transition-all hover:scale-105 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                Get Started
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

