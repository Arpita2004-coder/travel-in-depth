import { useState,useContext } from "react";
import { CityContext } from "../context/CityContext";
import {Link} from "react-router-dom";
// ─── CITY DATA (replace with API later) ───────────────────────────────────────


// ─── REGION BADGE COLORS ──────────────────────────────────────────────────────
const regionColors = {
  North: { bg: "bg-[#FF6B1A]", text: "text-white" },
  South: { bg: "bg-[#138808]", text: "text-white" },
  East:  { bg: "bg-[#F5A623]", text: "text-white" },
  West:  { bg: "bg-[#8B1A1A]", text: "text-white" },
};

// ─── FILTER TABS ──────────────────────────────────────────────────────────────
const filters = ["All", "North", "South", "East", "West"];

// ─── SIMPLE INDIA MAP SVG ─────────────────────────────────────────────────────
function IndiaMap({ activeRegion, onRegionClick, cities, onCityHover, hoveredCity }) {
  const regionPaths = {
    North: "M 100 20 L 200 10 L 260 40 L 280 80 L 240 100 L 200 110 L 160 100 L 120 80 L 90 60 Z",
    West:  "M 60 100 L 120 80 L 160 100 L 170 140 L 160 180 L 130 200 L 90 190 L 60 160 L 50 130 Z",
    South: "M 130 200 L 160 180 L 200 190 L 220 220 L 210 260 L 180 290 L 150 300 L 120 280 L 110 250 L 120 220 Z",
    East:  "M 200 110 L 260 100 L 300 120 L 310 160 L 280 190 L 240 200 L 200 190 L 180 160 L 190 130 Z",
  };

  const regionCenters = {
    North: { x: 185, y: 65 },
    West:  { x: 110, y: 155 },
    South: { x: 165, y: 245 },
    East:  { x: 248, y: 155 },
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 360 340"
        className="w-full h-full max-h-[480px]"
        style={{ filter: "drop-shadow(0 8px 32px rgba(255,107,26,0.15))" }}
      >
        {/* Background */}
        <rect width="360" height="340" fill="transparent" />

        {/* Region paths */}
        {Object.entries(regionPaths).map(([region, path]) => (
          <path
            key={region}
            d={path}
            fill={
              activeRegion === region
                ? region === "North" ? "#FF6B1A"
                : region === "South" ? "#138808"
                : region === "East"  ? "#F5A623"
                : "#8B1A1A"
                : activeRegion === "All"
                ? "#FDF6EC"
                : "#f5ede0"
            }
            stroke="#FF6B1A"
            strokeWidth={activeRegion === region ? "2.5" : "1.5"}
            strokeOpacity={activeRegion === region ? 1 : 0.4}
            fillOpacity={activeRegion === region ? 0.9 : 0.5}
            className="cursor-pointer transition-all duration-300"
            onClick={() => onRegionClick(region)}
          />
        ))}

        {/* Region Labels */}
        {Object.entries(regionCenters).map(([region, pos]) => (
          <text
            key={region}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fontFamily="Montserrat"
            fill={activeRegion === region ? "white" : "#8B1A1A"}
            className="cursor-pointer select-none"
            onClick={() => onRegionClick(region)}
          >
            {region}
          </text>
        ))}

        {/* City dots */}
        {cities.map((city) => {
          const x = (city.mapX / 100) * 360;
          const y = (city.mapY / 100) * 340;
          const isHovered = hoveredCity === city.id;
          const isActiveRegion = activeRegion === "All" || activeRegion === city.region;

          return (
            <g key={city.id}>
              {/* Pulse ring on hover */}
              {isHovered && (
                <circle
                  cx={x} cy={y} r="14"
                  fill="none"
                  stroke="#FF6B1A"
                  strokeWidth="1.5"
                  opacity="0.4"
                />
              )}
              {/* City dot */}
              <circle
                cx={x} cy={y}
                r={isHovered ? 7 : 5}
                fill={isActiveRegion ? "#FF6B1A" : "#ccc"}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => onCityHover(city.id)}
                onMouseLeave={() => onCityHover(null)}
              />
              {/* City name tooltip */}
              {isHovered && (
                <text
                  x={x + 10} y={y - 8}
                  fontSize="9"
                  fontWeight="700"
                  fontFamily="Montserrat"
                  fill="#2D1B00"
                >
                  {city.name}
                </text>
              )}
            </g>
          );
        })}

        {/* India label */}
        <text
          x="180" y="320"
          textAnchor="middle"
          fontSize="10"
          fontWeight="500"
          fontFamily="Montserrat"
          fill="#A07850"
          opacity="0.7"
        >
          INDIA
        </text>
      </svg>
    </div>
  );
}

// ─── CITY CARD ────────────────────────────────────────────────────────────────
function CityCard({ city, isHighlighted }) {
  const [hovered, setHovered] = useState(false);
  const badge = regionColors[city.region];

  return (
    <div
      className={`relative rounded-2xl overflow-hidden cursor-pointer group
        transition-all duration-400 ease-out
        ${isHighlighted
          ? "ring-2 ring-[#FF6B1A] shadow-[0_8px_32px_rgba(255,107,26,0.35)] scale-[1.02]"
          : "shadow-[0_4px_20px_rgba(139,26,26,0.10)] hover:shadow-[0_12px_40px_rgba(255,107,26,0.25)] hover:scale-[1.02]"
        }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
     
    >
      {/* Image */}
       <Link to={`/destinations/${city.slug}`}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={city.image}
          alt={city.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Region badge */}
        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${badge.bg} ${badge.text}`}>
          {city.region} India
        </span>

        {/* Rating */}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-[#2D1B00] flex items-center gap-1">
          ⭐ {city.rating}
        </span>

        {/* Eco options - shown on hover */}
        <div className={`absolute bottom-3 left-3 right-3 flex flex-wrap gap-1 transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          {city.ecoOptions.map((opt, i) => (
            <span key={i} className="bg-white/20 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full border border-white/30">
              {opt}
            </span>
          ))}
        </div>
      </div>

      {/* Card body */}
      <div className="bg-white p-4">
        <h3 className="text-lg font-black text-[#2D1B00] tracking-tight leading-tight">
          {city.name}
        </h3>
        <p className="text-xs text-[#A07850] font-medium mt-0.5 mb-3">
          {city.tagline}
        </p>

        {/* Quick info */}
        <div className="flex items-center gap-3 text-xs text-[#6B4226] mb-4">
          <span className="flex items-center gap-1">
            🌤️ <span>{city.bestSeason}</span>
          </span>
          <span className="w-px h-3 bg-[#F5A623]/40" />
          <span className="flex items-center gap-1">
            💰 <span>{city.budget}</span>
          </span>
        </div>

        {/* CTA Button */}
       
        <button className="w-full py-2.5 rounded-xl text-sm font-bold text-white
          bg-gradient-to-r from-[#FF6B1A] to-[#C94F00]
          hover:from-[#C94F00] hover:to-[#8B1A1A]
          transition-all duration-300 tracking-wide
          flex items-center justify-center gap-2 group/btn">
          Explore City
          <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
        </button>
      </div>
 </Link>
      {/* Bottom decorative line */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF6B1A] via-[#F5A623] to-[#138808] transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`} />
    </div>
  );
}

// ─── MAIN DESTINATIONS PAGE ───────────────────────────────────────────────────
export default function DestinationPage() {
 const { cities }=useContext(CityContext);
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredCity, setHoveredCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter cities based on region + search
  const filteredCities = cities.filter((city) => {
    const matchesRegion = activeFilter === "All" || city.region === activeFilter;
    const matchesSearch =
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  // Handle map region click
  const handleRegionClick = (region) => {
    setActiveFilter(activeFilter === region ? "All" : region);
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC] font-montserrat">

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <div className="bg-[#FFF8F0] border-b border-[#F5A623]/20 pt-24 pb-10 px-6">
        <div className="max-w-7xl mx-auto text-center">

          {/* Label */}
          <p className="text-[#FF6B1A] text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Explore India
          </p>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black text-[#2D1B00] leading-tight mb-4">
            Discover{" "}
            <span className="text-[#FF6B1A]">Incredible</span>{" "}
            Destinations
          </h1>

          <p className="text-[#6B4226] text-base max-w-xl mx-auto leading-relaxed">
            From Himalayan peaks to coastal shores — find your perfect
            journey and travel the eco-friendly way.
          </p>

          {/* Search bar */}
          <div className="mt-6 max-w-md mx-auto relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A07850]">🔍</span>
            <input
              type="text"
              placeholder="Search city or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#F5A623]/40
                bg-white text-sm text-[#2D1B00] placeholder-[#A07850]
                focus:outline-none focus:border-[#FF6B1A] focus:ring-2 focus:ring-[#FF6B1A]/10
                transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* ── FILTER BAR ──────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-[#FDF6EC]/95 backdrop-blur-sm border-b border-[#F5A623]/20 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div className="flex items-center gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200
                  ${activeFilter === filter
                    ? "bg-[#FF6B1A] text-white shadow-md shadow-[#FF6B1A]/30"
                    : "bg-white text-[#6B4226] border border-[#F5A623]/40 hover:border-[#FF6B1A] hover:text-[#FF6B1A]"
                  }`}
              >
                {filter === "All" ? "🇮🇳 All" : filter}
              </button>
            ))}
          </div>

          {/* Result count */}
          <p className="text-xs text-[#A07850] font-medium hidden sm:block">
            {filteredCities.length} destination{filteredCities.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* ── MAIN CONTENT: MAP + CARDS ───────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT: India Map */}
          <div className="lg:w-[38%] lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(139,26,26,0.08)] border border-[#F5A623]/20">

              <h2 className="text-sm font-bold text-[#8B1A1A] tracking-widest uppercase mb-1">
                Interactive Map
              </h2>
              <p className="text-xs text-[#A07850] mb-4">
                Click a region to filter destinations
              </p>

              {/* Map */}
              <div className="h-[380px]">
                <IndiaMap
                  activeRegion={activeFilter}
                  onRegionClick={handleRegionClick}
                  cities={filteredCities}
                  onCityHover={setHoveredCity}
                  hoveredCity={hoveredCity}
                />
              </div>

              {/* Region legend */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {Object.entries(regionColors).map(([region, colors]) => (
                  <button
                    key={region}
                    onClick={() => handleRegionClick(region)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold
                      transition-all duration-200 border
                      ${activeFilter === region
                        ? `${colors.bg} ${colors.text} border-transparent`
                        : "bg-[#FDF6EC] text-[#6B4226] border-[#F5A623]/30 hover:border-[#FF6B1A]"
                      }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${colors.bg}`} />
                    {region} India
                  </button>
                ))}
              </div>

              {/* Eco tip */}
              <div className="mt-4 bg-[#138808]/5 border border-[#138808]/20 rounded-xl p-3">
                <p className="text-xs text-[#138808] font-semibold">
                  🌱 Eco Tip
                </p>
                <p className="text-xs text-[#6B4226] mt-1 leading-relaxed">
                  Choose e-rickshaw or walking tours to earn carbon points
                  and support local communities!
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: City Cards Grid */}
          <div className="lg:w-[62%]">

            {filteredCities.length > 0 ? (
              <>
                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {filteredCities.map((city) => (
                    <CityCard
                      key={city.id}
                      city={city}
                      isHighlighted={hoveredCity === city.id}
                    />
                  ))}
                </div>

                {/* Bottom note */}
                <div className="mt-8 text-center">
                  <p className="text-xs text-[#A07850]">
                    More destinations coming soon as our community grows 🌍
                  </p>
                </div>
              </>
            ) : (
              /* Empty state */
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-5xl mb-4">🗺️</span>
                <h3 className="text-lg font-bold text-[#2D1B00] mb-2">
                  No destinations found
                </h3>
                <p className="text-sm text-[#A07850]">
                  Try a different search or filter
                </p>
                <button
                  onClick={() => { setActiveFilter("All"); setSearchQuery(""); }}
                  className="mt-4 px-5 py-2 bg-[#FF6B1A] text-white text-sm font-bold rounded-full"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA BANNER ───────────────────────────────────── */}
      <div className="bg-[#2D1B00] py-12 px-6 mt-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#F5A623] text-xs font-bold tracking-widest uppercase mb-3">
            Travel Responsibly
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            Earn Points. Save Carbon. Travel Free.
          </h2>
          <p className="text-[#A07850] text-sm mb-6 leading-relaxed">
            Every eco-friendly choice you make earns you carbon points.
            Redeem them for free trip recommendations!
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-white text-sm">
              <span className="text-[#F5A623]">🛺</span> E-Rickshaw = 500 pts
            </div>
            <div className="flex items-center gap-2 text-white text-sm">
              <span className="text-[#F5A623]">🚶</span> Walking = 1000 pts
            </div>
            <div className="flex items-center gap-2 text-white text-sm">
              <span className="text-[#F5A623]">🏠</span> Homestay = 400 pts
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}