import Image from "next/image"
import footerBg from "./assets/footer-bg.webp";
import { FaLinkedinIn, FaYoutube, FaInstagram, FaXTwitter } from "react-icons/fa6"
import { MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative w-full bg-white pt-12 pb-8 md:pt-24 md:pb-12 px-6 font-sans overflow-hidden border-t">

      {/* Background Image - Optimized with next/image or fill */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-05">
        <Image
          src={footerBg}
          alt="Footer Background"
          fill
          className="object-contain position-top"
          style={{ opacity: 0.05 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-8 items-start">

          {/* Left Section: Branding */}
          <div className="sm:col-span-2 lg:col-span-5 flex flex-col">
            <div className="mb-4 md:mb-6">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <Image
                  src="/assets/cw_logo_sample_2.png"
                  alt="Cyber Whisper"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <p className="text-slate-600 text-sm md:text-[18px] leading-[1.6] max-w-[400px] mb-4 md:mb-6">
              Cyber Whisper builds cyber-ranges where teams attack, defend, and master skills risk-free.
            </p>

            <div className="flex items-center gap-2 md:gap-3 text-xs md:text-[14px] font-bold text-[#6b46e5] mb-6 md:mb-10 tracking-[0.2em] uppercase">
              <span>Learn</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>Simulate</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>Win</span>
            </div>

            {/* Social Icons with Purple Glow */}
            <div className="flex gap-4 md:gap-5">
              <a
                href="https://www.linkedin.com/company/cyber-whisper/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#6b46e5] text-white shadow-[0_0_25px_rgba(107,70,229,0.5)] hover:scale-110 transition-transform"
              >
                <FaLinkedinIn className="text-lg md:text-xl" />
              </a>
              <a
                href="https://www.youtube.com/@CyberWhisperAcademy/shorts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#6b46e5] text-white shadow-[0_0_25px_rgba(107,70,229,0.5)] hover:scale-110 transition-transform"
              >
                <FaYoutube className="text-lg md:text-xl" />
              </a>
              <a
                href="https://www.instagram.com/cyber.whisper?igsh=a3poZTc0d2prdDk3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#6b46e5] text-white shadow-[0_0_25px_rgba(107,70,229,0.5)] hover:scale-110 transition-transform"
              >
                <FaInstagram className="text-lg md:text-xl" />
              </a>
              <a
                href="#"
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-[#6b46e5] text-white shadow-[0_0_25px_rgba(107,70,229,0.5)] hover:scale-110 transition-transform"
              >
                <FaXTwitter className="text-lg md:text-xl" />
              </a>
            </div>
          </div>

          {/* Middle Section: Company */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 md:mb-8 tracking-tight relative inline-block">
              Company
            </h3>
            <ul className="space-y-3 md:space-y-4 text-sm md:text-[16px] font-medium text-slate-600">
              <li><a href="/" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">Home</a></li>
              <li><a href="/about" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">About Us</a></li>
              <li><a href="/services" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">Our Services</a></li>
              <li><a href="/training" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">Training</a></li>
              <li><a href="/gallery" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">Gallery</a></li>
            </ul>
          </div>

          {/* Middle Section: Resources & Legal */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 md:mb-8 tracking-tight relative inline-block">
              Support
            </h3>
            <ul className="space-y-3 md:space-y-4 text-sm md:text-[16px] font-medium text-slate-600">
              <li><a href="/refund-policy" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">Refund Policy</a></li>
              <li><a href="/privacy-policy" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">Terms & Conditions</a></li>

            </ul>
          </div>

          {/* Right Section: Our Office */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 md:mb-8 tracking-tight relative inline-block">
              Our Office
            </h3>
            <div className="space-y-4 md:space-y-6 text-sm md:text-[16px] font-medium text-slate-600 leading-relaxed">
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-[#6b46e5] shrink-0 mt-1" />
                <p>62-A, 3rd Floor, Suraj Nagar, Delhi – 110033</p>
              </div>
              <p className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-[#6b46e5] shrink-0" />
                <a href="tel:+919220946887" className="hover:text-[#6b46e5] transition-colors">(+91) 9220946887</a>
              </p>
              <p className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-[#6b46e5] shrink-0" />
                <a href="mailto:Vikas@cyberwhisper.tech" className="hover:text-[#6b46e5] transition-colors break-all">Connect@cyberwhisper.tech</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-slate-500 font-medium text-xs md:text-sm text-center">
            © {new Date().getFullYear()} Cyber Whisper. All Rights Reserved
          </p>

        </div>
      </div>
    </footer>
  );
}