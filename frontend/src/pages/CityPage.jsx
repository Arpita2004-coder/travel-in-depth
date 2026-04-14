import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CityContext } from "../context/CityContext";
import { MapPin, Thermometer, Leaf, Calendar, ArrowLeft, Star } from "lucide-react";

export default function CityPage() {
  const { slug } = useParams();
  const { cities } = useContext(CityContext);

  // URL slug ke base par city find karna
  const city = cities?.find((c) => c.slug === slug);

  if (!city) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#FDF6EC]">
        <h2 className="text-2xl font-black text-[#2D1B00]">City not found, bhai!</h2>
        <Link to="/destinations" className="mt-4 text-[#FF6B1A] font-bold underline">Back to Map</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF6EC] font-montserrat">
      {/* ── HERO SECTION ── */}
      <div className="relative h-[65vh] w-full overflow-hidden">
        <img src={city.image} className="w-full h-full object-cover" alt={city.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B00] via-black/20 to-transparent" />
        
        {/* Back Button */}
        <Link to="/destinations" className="absolute top-28 left-6 md:left-12 flex items-center gap-2 text-white/80 hover:text-white transition-all bg-black/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
          <ArrowLeft size={16} /> Back
        </Link>

        <div className="absolute bottom-16 left-6 md:left-12 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#FF6B1A] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              {city.region} India
            </span>
            <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              <Star size={10} className="fill-amber-400 text-amber-400" /> {city.rating}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-2">
            {city.name}
          </h1>
          <p className="text-lg md:text-xl font-medium text-white/80 italic tracking-wide">
            "{city.tagline}"
          </p>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-30">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(45,27,0,0.1)] border border-[#F5A623]/20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-2xl text-[#FF6B1A]"><Thermometer size={24} /></div>
            <div><p className="text-[10px] font-bold text-[#A07850] uppercase tracking-widest">Best Season</p><p className="font-black text-[#2D1B00]">{city.bestSeason}</p></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-2xl text-blue-600"><Calendar size={24} /></div>
            <div><p className="text-[10px] font-bold text-[#A07850] uppercase tracking-widest">Est. Budget</p><p className="font-black text-[#2D1B00]">{city.budget}</p></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-2xl text-[#138808]"><Leaf size={24} /></div>
            <div><p className="text-[10px] font-bold text-[#A07850] uppercase tracking-widest">Eco Score</p><p className="font-black text-[#2D1B00]">Elite Traveler</p></div>
          </div>
          <button className="w-full bg-[#2D1B00] text-white font-black py-4 rounded-2xl uppercase text-[11px] tracking-[0.2em] hover:bg-[#FF6B1A] transition-all shadow-lg active:scale-95">
            Book Journey
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-black text-[#2D1B00] mb-6 flex items-center gap-3">
            <MapPin className="text-[#FF6B1A]" /> Why visit {city.name}?
          </h2>
          <p className="text-[#6B4226] leading-relaxed text-lg mb-8">
            {city.name} is a vibrant reflection of India's diverse culture. From its iconic architecture 
            to the local street food and sustainable travel options, this destination offers an 
            authentic experience for every traveler. Explore the heritage while earning carbon points!
          </p>
          
          <h3 className="text-xl font-black text-[#2D1B00] mb-6 uppercase tracking-tight">Eco-Friendly Activities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {city.ecoOptions.map((opt, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-[#F5A623]/20 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-2xl">{opt.split(' ')[0]}</span>
                <span className="font-bold text-[#2D1B00]">{opt.split(' ').slice(1).join(' ')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── SIDEBAR (Carbon Points) ── */}
        <div className="lg:col-span-1">
          <div className="bg-[#138808] text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
            <Leaf className="mb-4 text-green-300" size={32} />
            <h3 className="text-2xl font-black mb-4 leading-tight">Travel Responsibly in {city.name}</h3>
            <p className="text-green-100 text-sm mb-6 leading-relaxed opacity-90">
              Did you know? Choosing an E-Rickshaw over a taxi here can save up to 2.5kg of carbon emissions per trip.
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mb-6 text-center">
              <p className="text-xs uppercase font-bold tracking-widest text-green-200">Potential Points</p>
              <p className="text-3xl font-black text-white">+1,250 PTS</p>
            </div>
            <button className="w-full bg-white text-[#138808] font-black py-3 rounded-xl uppercase text-[10px] tracking-widest hover:bg-green-50 transition-all">
              See Carbon Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


