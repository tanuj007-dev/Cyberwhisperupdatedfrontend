import React from 'react';

export default function LandScale() {
  return (
    <div className="bg-[#fdfcff] font-sans selection:bg-purple-100">
      {/* SECTION 1: Cyber Threat Landscape */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Soft Purple Gradient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-purple-100/50 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <header className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-3 h-3 bg-[#6344f5] block" />
              <h2 className="text-sm font-bold tracking-[0.2em] text-slate-900 uppercase font-space">
                Cyber Threat Landscape
              </h2>
            </div>
            <p className="text-slate-500 text-lg leading-relaxed">
              Whether it's incident response, malware removal, or staff training, we
              equip your team with the practical skills they need to spot and
              neutralise attacks before they escalate.
            </p>
          </header>

          {/* Map Container */}





        </div>
      </section>


    </div>
  );
}