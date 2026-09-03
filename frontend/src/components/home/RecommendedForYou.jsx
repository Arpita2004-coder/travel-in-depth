import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Calendar, ArrowRight, Compass, Filter, RefreshCw, Star } from 'lucide-react';
import { fetchRecommendations } from '../../api/recommendationsApi';
import { useAuth } from '../../features/auth/useAuth';

export default function RecommendedForYou({ initialFilter = null, showHeader = true, maxCards = 6 }) {
  const { user } = useAuth();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInterest, setSelectedInterest] = useState(initialFilter || 'All');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const filterOptions = [
    { label: '🌟 For You', val: 'All' },
    { label: '🏛️ Heritage', val: 'heritage' },
    { label: '🏔️ Adventure', val: 'adventure' },
    { label: '🧘 Spiritual', val: 'spiritual' },
    { label: '🐅 Wildlife', val: 'wildlife' },
    { label: '🌊 Coastal', val: 'coastal' },
  ];

  const loadData = async () => {
    setLoading(true);
    try {
      const params = { limit: maxCards };
      if (selectedInterest !== 'All') {
        params.interests = selectedInterest;
      }
      if (selectedBudget) params.budget = selectedBudget;
      if (selectedRegion) params.region = selectedRegion;

      const res = await fetchRecommendations(params);
      if (res?.destinations) {
        setDestinations(res.destinations);
      }
    } catch (err) {
      console.error("Failed to load recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedInterest, selectedBudget, selectedRegion, user]);

  return (
    <section className="py-16 px-6 md:px-12 bg-[#FFF8F0] border-y border-[#E8DCC4]/60 relative overflow-hidden font-sans">
      {/* Background glow accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FF6B1A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#F5A623]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#FF6B1A] mb-3">
                <Sparkles size={14} className="animate-pulse" />
                <span>Personalized Curation</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-black text-[#8B1A1A] leading-tight">
                Recommended <span className="italic text-[#FF6B1A]">For You</span>
              </h2>
              <p className="text-sm md:text-base text-[#8B1A1A]/70 max-w-xl mt-2">
                {user ? (
                  <>Tailored to your preferences in <b>{user.interests?.join(", ") || "diverse travel styles"}</b> and ideal seasonal weather.</>
                ) : (
                  <>Handpicked travel gems scored by seasonal weather, real explorer ratings, and immersive local culture.</>
                )}
              </p>
            </div>

            {/* Quick interactive interest chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
              {filterOptions.map((f) => (
                <button
                  key={f.val}
                  onClick={() => setSelectedInterest(f.val)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border cursor-pointer ${
                    selectedInterest === f.val
                      ? 'bg-[#8B1A1A] text-white border-[#8B1A1A] shadow-md scale-105'
                      : 'bg-white text-[#8B1A1A]/80 border-[#E8DCC4] hover:border-[#FF6B1A]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Destination Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-3xl h-96 animate-pulse border border-[#E8DCC4] p-4 flex flex-col justify-between">
                <div className="bg-[#E8DCC4]/50 h-52 rounded-2xl w-full" />
                <div className="space-y-3">
                  <div className="h-5 bg-[#E8DCC4]/60 rounded w-3/4" />
                  <div className="h-4 bg-[#E8DCC4]/40 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-16 bg-white/70 rounded-3xl border border-dashed border-[#E8DCC4]">
            <Compass size={48} className="mx-auto text-[#FF6B1A]/40 mb-4 animate-spin-slow" />
            <h3 className="text-xl font-serif font-bold text-[#8B1A1A]">No matches found for this filter</h3>
            <p className="text-sm text-[#8B1A1A]/60 mt-1">Try resetting the interest filter to discover all destinations.</p>
            <button
              onClick={() => setSelectedInterest('All')}
              className="mt-4 px-6 py-2 bg-[#8B1A1A] text-white rounded-full text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <div
                key={dest._id || dest.slug}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E8DCC4] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  {/* Image container with match badges */}
                  <div className="relative h-56 overflow-hidden bg-[#2D1B00]">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80"; }}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700 brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Match Score Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-amber-200">
                      <span className="w-2 h-2 rounded-full bg-[#138808] animate-ping" />
                      <span className="text-xs font-black text-[#8B1A1A] tracking-wider">
                        {dest.matchScore}% MATCH
                      </span>
                    </div>

                    {/* Region / Rating */}
                    <div className="absolute top-4 right-4 bg-[#8B1A1A]/85 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1 shadow">
                      <Star size={12} className="text-amber-300 fill-amber-300" />
                      <span>{dest.rating}</span>
                    </div>

                    {/* Bottom overlay text on image */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs uppercase tracking-widest font-bold text-amber-300">
                        {dest.region} India • {dest.state}
                      </span>
                      <h3 className="text-2xl font-serif font-bold text-white leading-snug">
                        {dest.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6">
                    <p className="text-xs font-medium text-[#8B1A1A]/80 italic mb-4 line-clamp-2">
                      "{dest.tagline}"
                    </p>

                    {/* Match Reasons Badges */}
                    <div className="space-y-1.5 mb-5">
                      {dest.matchReasons?.map((reason, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#138808] bg-[#138808]/5 px-3 py-1 rounded-lg border border-[#138808]/15">
                          <span>✓</span>
                          <span className="truncate">{reason}</span>
                        </div>
                      ))}
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-4 border-t border-[#E8DCC4] text-xs text-[#8B1A1A]/70">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-[#FF6B1A]" />
                        <span>Best: <b>{dest.bestSeason}</b></span>
                      </div>
                      <div className="flex items-center gap-1.5 justify-end">
                        <span className="font-bold text-[#138808]">{dest.budget}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="p-6 pt-0">
                  <Link
                    to={`/destinations/${dest.slug}`}
                    className="w-full py-3 bg-[#FFF7F1] hover:bg-[#FF6B1A] text-[#8B1A1A] hover:text-white rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 border border-[#FFD7B5] group-hover:border-transparent group-hover:shadow-lg"
                  >
                    <span>Explore Destination</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
