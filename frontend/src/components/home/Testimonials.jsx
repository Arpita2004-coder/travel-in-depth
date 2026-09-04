import React from 'react';
import { Sparkles, CloudSun, Compass, ShieldCheck, Zap, Layers } from 'lucide-react';

export default function Testimonials() {
  const pillars = [
    {
      icon: <Sparkles className="w-6 h-6 text-[#FF6B1A]" />,
      title: "Context-Aware AI Planning",
      desc: "Our Gemini-backed intelligence creates bespoke multi-day itineraries tailored to your pace, interests, and style with zero guesswork.",
      badge: "Intelligent"
    },
    {
      icon: <CloudSun className="w-6 h-6 text-[#F5A623]" />,
      title: "Real-Time Weather Sync",
      desc: "Live temperature, humidity, and 5-day weather projections keep your daily adventures timed perfectly with local climate conditions.",
      badge: "Live Data"
    },
    {
      icon: <Compass className="w-6 h-6 text-[#FF6B1A]" />,
      title: "Deep Cultural Curation",
      desc: "Uncover hidden alleys, ancient heritage sites, traditional cuisines, and local secrets that typical tourist guidebooks miss.",
      badge: "Curated"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#138808]" />,
      title: "Saved Journeys & Personalization",
      desc: "Manage your customized trips on your private dashboard and fine-tune travel recommendations based on your evolving interests.",
      badge: "Personalized"
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-[#FFF8F0] border-t border-[#E8DCC4] relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B1A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F5A623]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1A1A]/10 border border-[#8B1A1A]/20 text-[#8B1A1A] text-xs font-bold uppercase tracking-[0.25em] mb-4">
            <Zap size={13} className="text-[#FF6B1A]" />
            Why Choose Us
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#8B1A1A] leading-tight">
            Built for Authentic, <span className="text-[#FF6B1A]">Immersive</span> Exploration
          </h2>
          <p className="text-[#8B1A1A]/70 mt-4 text-base md:text-lg leading-relaxed">
            Everything you need to experience the rich heritage, vibrancy, and soul of India with ease and elegance.
          </p>
        </div>

        {/* Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-[#E8DCC4] shadow-sm hover:shadow-xl hover:border-[#FF6B1A]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF2E8] border border-[#FF6B1A]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#8B1A1A]/5 text-[#8B1A1A]">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#8B1A1A] mb-3 group-hover:text-[#FF6B1A] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#8B1A1A]/70 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8DCC4]/50 flex items-center gap-2 text-xs font-semibold text-[#FF6B1A]">
                <Layers size={14} />
                <span>Feature Built In</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
