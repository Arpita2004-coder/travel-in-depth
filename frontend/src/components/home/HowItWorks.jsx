import React from 'react';
import { Compass, Sparkles, Sliders, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: <Compass className="w-7 h-7 text-[#FF6B1A]" />,
      title: 'Choose Destination & Style',
      desc: 'Pick where you want to travel and select your vibe — from royal heritage and peaceful spirituality to thrills and coastal escapes.',
      tag: 'Step 1'
    },
    {
      number: '02',
      icon: <Sparkles className="w-7 h-7 text-[#F5A623]" />,
      title: 'Get AI Day-by-Day Plans',
      desc: 'Our Gemini-powered engine crafts morning, afternoon, and evening timelines with budget estimates, local tips, and cultural gems.',
      tag: 'Step 2'
    },
    {
      number: '03',
      icon: <Sliders className="w-7 h-7 text-[#FF6B1A]" />,
      title: 'Save, Customize & Explore',
      desc: 'Sync itineraries straight to your dashboard, check live destination weather forecasts, and travel with total clarity.',
      tag: 'Step 3'
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#1a0a00] via-[#241203] to-[#1a0a00] text-[#FDF6EC] overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-[#FF6B1A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF6B1A]/10 border border-[#FF6B1A]/20 text-[#F5A623] text-xs font-bold uppercase tracking-[0.25em] mb-4">
            <Sparkles size={13} className="animate-pulse" />
            Simple & Seamless
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDF6EC] leading-tight">
            How <em className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B1A] to-[#F5A623]">Travel In Depth</em> Works
          </h2>
          <p className="text-[#FDF6EC]/60 mt-4 text-base md:text-lg leading-relaxed">
            From inspiration to an extraordinary expedition in three effortless steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group relative bg-[#FDF6EC]/[0.03] hover:bg-[#FDF6EC]/[0.06] border border-[#F5A623]/15 hover:border-[#FF6B1A]/40 rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Row: Tag & Number */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF6B1A]/20 to-[#8B1A1A]/20 border border-[#FF6B1A]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <span className="font-serif text-3xl font-bold text-[#F5A623]/30 group-hover:text-[#F5A623]/60 transition-colors">
                    {step.number}
                  </span>
                </div>

                <div className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#FF6B1A] mb-2">
                  {step.tag}
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#FDF6EC] mb-3 group-hover:text-[#FF6B1A] transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-[#FDF6EC]/65 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Progress visual bar */}
              <div className="mt-8 pt-4 border-t border-[#FDF6EC]/10 flex items-center justify-between text-xs text-[#F5A623]/70">
                <span>Phase {step.number}</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-[#FF6B1A]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
