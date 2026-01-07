import pathImg from "./assets/path.png";

export default function TrainingPrograms() {
  return (
    <section className="bg-gray-100 py-12 px-4 flex justify-center">
      <div className="relative w-full max-w-6xl bg-[#7C3AED] rounded-[40px] overflow-hidden p-8 md:p-16 text-center text-white shadow-2xl">

        {/* Background Decorative Section */}
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url("${pathImg?.src || pathImg}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
        </div>

        {/* Header Section */}
        <div className="relative z-10 mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-4 h-4 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase opacity-90">Training Programs</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Building Cybersecurity Skills Through Real-World Training</h2>
          <p className="text-sm md:text-lg opacity-80 max-w-2xl mx-auto font-light">
            Your cyber-range sessions stay rock-solid anywhere your team logs in.
          </p>
        </div>

        {/* Promotional Cards Container */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Card 1: Hackmanthan (Dark/Cyber Theme) */}
          <div className="bg-black rounded-3xl p-1 shadow-2xl border-4 border-white overflow-hidden group">
            <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
              {/* Placeholder for workshop image */}
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
                alt="Hackmanthan"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 z-20 p-6 flex flex-col text-left border-[1px] border-cyan-500/30 m-3 rounded-xl">
                <h3 className="text-2xl font-black italic tracking-tighter text-white">HACKMANTHAN 3.0</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold border border-white px-2 py-0.5">IIT BOMBAY</span>
                  <span className="text-[10px] text-cyan-400 font-bold uppercase">22nd-24th December 2025</span>
                </div>

                <div className="mt-4 inline-block bg-cyan-500 text-black text-[10px] font-black px-3 py-1 w-fit rounded-sm">
                  WORKSHOP
                </div>

                <ul className="mt-4 space-y-1 text-[11px] font-medium text-gray-300">
                  <li>• Cyber Security Workshop</li>
                  <li>• Artificial Intelligence Workshop</li>
                  <li>• Ethical Hacking Workshop</li>
                  <li>• Data Science Workshop</li>
                  <li>• Machine Learning Workshop</li>
                </ul>

                <div className="mt-auto flex items-center justify-between">
                  <button className="bg-transparent border-2 border-cyan-400 text-cyan-400 text-xs font-bold px-6 py-2 rounded uppercase hover:bg-cyan-400 hover:text-black transition-all duration-300">
                    Register Now
                  </button>
                  <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">
                    <div className="w-6 h-6 bg-cyan-500/20 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: CEH V13 (Promo Theme) */}
          <div className="bg-white rounded-3xl p-1 shadow-2xl border-4 border-white overflow-hidden">
            <div className="relative aspect-[16/10] bg-[#0052CC] p-6 text-left flex flex-col justify-between rounded-2xl">
              {/* "Special Offer" Tag */}
              <div className="absolute -top-1 -right-1">
                <div className="bg-yellow-400 text-black text-[10px] font-black px-4 py-1 rotate-12 shadow-lg border border-black/10">
                  Special Offer
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/90 bg-white/20 px-3 py-1 rounded-full">
                  Free Education Month
                </span>
                <h3 className="text-2xl font-extrabold mt-3 leading-tight text-white uppercase tracking-tight">
                  CEH V13 AI + SOC Analyst Training
                </h3>
              </div>

              <div className="flex items-center gap-4 my-2">
                <span className="text-xl line-through text-white/50 decoration-red-500 decoration-2">₹ 20,000</span>
                <span className="text-3xl font-black text-green-400 drop-shadow-md">₹ 10,000/-</span>
              </div>

              <div className="space-y-3 bg-white/10 p-3 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-yellow-400 italic">ALSO GET {">>"}</span>
                  <div className="bg-yellow-400 text-blue-900 text-[11px] font-black px-3 py-0.5 rounded shadow-sm">
                    ₹ 10,000 E-VOUCHER
                  </div>
                </div>
                <div className="text-[11px] leading-snug text-white/90">
                  <p className="font-bold opacity-70">E-VOUCHER VALID FOR</p>
                  <p className="text-yellow-400 font-bold uppercase tracking-wide">- 1 Year Diploma in Cyber Security</p>
                </div>
              </div>

              <button className="mt-4 bg-white text-[#0052CC] text-sm font-black py-3 rounded-xl w-full uppercase shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:bg-gray-100 transition-colors">
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        {/* Footer Features */}
        <div className="relative z-10 mt-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-[11px] font-semibold opacity-90 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Tailored Educational Pathways
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            End-to-End Guidance
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Global University Network
          </div>
        </div>
      </div>
    </section >
  );
}