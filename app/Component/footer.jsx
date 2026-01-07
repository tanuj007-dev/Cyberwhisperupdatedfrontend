import Image from "next/image"
import footerBg from "./assets/footer-bg.png";
import logo from "./assets/logo.png";
import { FaLinkedinIn, FaYoutube } from "react-icons/fa6"
import { MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative w-full bg-white pt-24 pb-12 px-6 font-sans overflow-hidden">

      {/* Background Image - Optimized with next/image or fill */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-05">
        <Image
          src={footerBg}
          alt="Footer Background"
          fill
          className="object-contain"
          style={{ opacity: 0.05 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-4 items-start">

          {/* Left Section: Branding */}
          <div className="md:col-span-5 flex flex-col">
            <div className="mb-6">
              <Image
                src={logo}
                alt="Cyber Whisper"
                width={256}
                height={64}
                className="object-contain"
              />
            </div>

            <p className="text-[#333333] text-[18px] leading-[1.6] max-w-[400px] mb-6">
              Cyber Whisper builds cyber-ranges where teams attack, defend, and master skills risk-free.
            </p>

            <div className="flex items-center gap-3 text-[14px] font-bold text-[#6b46e5] mb-10 tracking-[0.2em] uppercase">
              <span>Learn</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>Simulate</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>Win</span>
            </div>

            {/* Social Icons with Purple Glow - Optimized to use react-icons */}
            <div className="flex gap-5">

              <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-[#6b46e5] text-white shadow-[0_0_25px_rgba(107,70,229,0.5)] hover:scale-110 transition-transform">
                <FaLinkedinIn className="text-xl" />
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-[#6b46e5] text-white shadow-[0_0_25px_rgba(107,70,229,0.5)] hover:scale-110 transition-transform">
                <FaYoutube className="text-xl" />
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-[#6b46e5] text-white shadow-[0_0_25px_rgba(107,70,229,0.5)] hover:scale-110 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Middle Section: Company */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-[#1a1a2e] mb-8 tracking-tight relative inline-block">
              Company

            </h3>
            <ul className="space-y-4 text-[16px] font-medium text-slate-600">
              <li><a href="/" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">Home</a></li>
              <li><a href="/about" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">About Us</a></li>
              <li><a href="/services" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">Our Services</a></li>
              <li><a href="/training" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">Training</a></li>
              <li><a href="/gallery" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">Gallery</a></li>
              <li><a href="#" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">Contact</a></li>
            </ul>
          </div>

          {/* Middle Section: Resources & Legal */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-[#1a1a2e] mb-8 tracking-tight relative inline-block">
              Support

            </h3>
            <ul className="space-y-4 text-[16px] font-medium text-slate-600">
              <li><a href="/refund-policy" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">Refund Policy</a></li>
              <li><a href="/privacy-policy" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">Career</a></li>
              {/* <li><a href="#" className="hover:text-[#6b46e5] hover:translate-x-1 transition-all inline-block">Help Center</a></li> */}
            </ul>
          </div>

          {/* Right Section: Our Office */}
          <div className="md:col-span-3">
            <h3 className="text-xl font-bold text-[#1a1a2e] mb-8 tracking-tight relative inline-block">
              Our Office

            </h3>
            <div className="space-y-6 text-[16px] font-medium text-slate-600 leading-relaxed">
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
                <a href="mailto:Vikas@cyberwhisper.tech" className="hover:text-[#6b46e5] transition-colors break-all">Vikas@cyberwhisper.tech</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-slate-500 font-medium text-sm">
            © {new Date().getFullYear()} Cyber Whisper. All Rights Reserved
          </p>

        </div>
      </div>
    </footer>
  );
}