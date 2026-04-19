import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CityContext } from "../context/CityContext";

/* ─── JAIPUR DATA (swap via CityContext for other cities) ─── */
const JAIPUR = {
  slug: "jaipur",
  name: "Jaipur",
  tagline: "Royal & Timeless",
  subtitle: "Where every stone whispers stories of maharajas and moonlight",
  description:
    "Step into a city draped in terracotta hues, where forts rise from golden hills, bazaars hum with silk and spice, and every sunset turns the sky into a masterpiece. Jaipur doesn't just welcome you — it enchants you.",
  region: "Rajasthan, India",
  badge: "The Pink City",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Hawa_Mahal_2010.jpg/1280px-Hawa_Mahal_2010.jpg",
  stats: [
    { value: "300+", label: "Years of History" },
    { value: "4.8★", label: "Traveller Rating" },
    { value: "3", label: "UNESCO Sites" },
    { value: "12M+", label: "Annual Visitors" },
  ],
  attractions: [
    {
      name: "Amber Fort",
      desc: "A majestic palace complex perched atop the Aravalli hills, with mirror halls, elephant corridors, and sweeping lake views that leave you breathless.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Amer_Fort_bird_eye_view.jpg/1280px-Amer_Fort_bird_eye_view.jpg",
      tags: [{ label: "UNESCO", color: "#FF6B1A" }, { label: "Must Visit", color: "#6B1A1A" }],
      rating: "4.9", reviews: "48K", hours: "8AM – 5:30PM",
    },
    {
      name: "Hawa Mahal",
      desc: "The Palace of Winds — a five-storey honeycomb of 953 carved windows, built so royal ladies could observe street festivities while remaining unseen.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Hawa_Mahal_2010.jpg/1280px-Hawa_Mahal_2010.jpg",
      tags: [{ label: "Iconic", color: "#FF6B1A" }, { label: "UNESCO", color: "#FF6B1A" }],
      rating: "4.8", reviews: "62K", hours: "9AM – 4:30PM",
    },
    {
      name: "City Palace",
      desc: "A grand palace complex at the heart of Jaipur's walled city, home to royal art galleries, silver urns, and opulent courtyards still used by the royal family.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/City_Palace_Jaipur_2012.jpg/1280px-City_Palace_Jaipur_2012.jpg",
      tags: [{ label: "Royal", color: "#6B1A1A" }, { label: "Heritage", color: "#b37a00" }],
      rating: "4.7", reviews: "35K", hours: "9:30AM – 5PM",
    },
    {
      name: "Jantar Mantar",
      desc: "The world's largest stone astronomical observatory, built in 1724. Its giant instruments measure time, predict eclipses, and track stars with startling accuracy.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Jantar_Mantar_Jaipur_2010.jpg/1280px-Jantar_Mantar_Jaipur_2010.jpg",
      tags: [{ label: "UNESCO", color: "#FF6B1A" }, { label: "Science", color: "#2e7d32" }],
      rating: "4.6", reviews: "28K", hours: "9AM – 4:30PM",
    },
    {
      name: "Nahargarh Fort",
      desc: 'Perched on the rocky Aravalli ridge, this "Tiger Fort" offers the most dramatic panoramic view of Jaipur — especially at twilight when the city glows amber.',
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Nahargarh_Fort_Jaipur_Rajasthan_India.jpg/1280px-Nahargarh_Fort_Jaipur_Rajasthan_India.jpg",
      tags: [{ label: "Sunset Spot", color: "#e05a10" }, { label: "Fort", color: "#6B1A1A" }],
      rating: "4.5", reviews: "22K", hours: "10AM – 5:30PM",
    },
    {
      name: "Johari Bazaar",
      desc: "Jaipur's legendary jewellery market, glittering with kundan, meenakari, and precious gemstones. Also home to vibrant textile stalls and the city's finest silver.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Johari_Bazar_Jaipur.jpg/1280px-Johari_Bazar_Jaipur.jpg",
      tags: [{ label: "Shopping", color: "#b37a00" }, { label: "Cultural", color: "#5c3d8f" }],
      rating: "4.6", reviews: "19K", hours: "10AM – 8PM",
    },
  ],
  food: [
    {
      name: "Laxmi Misthan Bhandar (LMB)",
      desc: "A Jaipur institution since 1954 — their sweets and Rajasthani thali are legendary.",
      type: "Heritage Restaurant",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop",
    },
    {
      name: "Suvarna Mahal, Rambagh Palace",
      desc: "Dine like royalty in a gilded ballroom with the finest Rajasthani and Mughal cuisine.",
      type: "Luxury / Fine Dining",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop",
    },
    {
      name: "Peacock Rooftop Restaurant",
      desc: "Rooftop dining with views of Hawa Mahal — perfect at sunset with a cold lassi.",
      type: "Views + Great Food",
      image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=300&h=200&fit=crop",
    },
    {
      name: "Rawat Mishthan Bhandar",
      desc: "The birthplace of Jaipur's famous Pyaaz Kachori. No visit is complete without stopping here.",
      type: "Street Food Icon",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&h=200&fit=crop",
    },
  ],
  experiences: [
    {
      name: "Elephant Ride at Amber Fort",
      desc: "Ascend to Amber Fort on the back of a majestic painted elephant — a royal arrival befitting the palace you're about to enter.",
      icon: "🐘",
      time: "Morning Only",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Elephants_at_Amer_Fort_Jaipur.jpg/1280px-Elephants_at_Amer_Fort_Jaipur.jpg",
    },
    {
      name: "Shopping in Johari Bazaar",
      desc: "Hunt for blue pottery, kundan jewellery, block-printed textiles, and handcrafted leather shoes in Jaipur's bustling walled-city markets.",
      icon: "💍",
      time: "Evening Best",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    },
    {
      name: "Sunset at Nahargarh Fort",
      desc: "Watch the Pink City blush deeper as the sun melts into the Aravalli ridgeline — one of India's most dramatic and romantic sunsets.",
      icon: "🌅",
      time: "5 PM – 7 PM",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    },
    {
      name: "Cultural Shows & Folk Dance",
      desc: "Experience Kalbelia snake-charmer dances, puppet shows, and Ghoomar performances at Chokhi Dhani — a village turned cultural theme park.",
      icon: "💃",
      time: "Evening Show",
      image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&h=400&fit=crop",
    },
  ],
  hiddenGems: [
    {
      name: "Panna Meena Ka Kund",
      desc: "A mesmerising 16th-century stepwell near Amber Fort with symmetrical staircases forming perfect geometric patterns. Peaceful, photogenic, and almost always uncrowded.",
      icon: "🪜",
      location: "Amer",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Panna_Meena_ka_Kund%2C_Jaipur.jpg/1280px-Panna_Meena_ka_Kund%2C_Jaipur.jpg",
    },
    {
      name: "Jawahar Circle Garden",
      desc: "The largest circular park in Asia, this gorgeous garden dazzles at evening with illuminated fountains and manicured flower beds. Perfect for a quiet evening stroll.",
      icon: "🌸",
      location: "Malviya Nagar",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Jawahar_Circle_Jaipur.jpg/1280px-Jawahar_Circle_Jaipur.jpg",
    },
    {
      name: "Kanak Vrindavan Garden",
      desc: "Nestled beside the Jal Mahal lake, this serene 18th-century garden with its ornate temples and peacock-filled lawns is overlooked by nearly every tourist guide.",
      icon: "🌺",
      location: "Nahargarh Road",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Kanak_Vrindavan_Jaipur.jpg/1280px-Kanak_Vrindavan_Jaipur.jpg",
    },
    {
      name: "Chandlai Lake",
      desc: "A birder's paradise just 25km from Jaipur — winter months bring flamingos, cranes, and migratory ducks in stunning numbers. Bring binoculars and your silence.",
      icon: "🦢",
      location: "25km from City",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
    },
  ],
  nearby: [
    {
      name: "Ajmer",
      emoji: "🕌",
      desc: "Home to the revered Dargah of Sufi saint Moinuddin Chishti, Ajmer radiates a profound spiritual calm. Visit during Urs festival for an otherworldly experience.",
      distance: "135 km · ~2.5 hrs by road",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Ajmer_Dargah.jpg/1280px-Ajmer_Dargah.jpg",
    },
    {
      name: "Pushkar",
      emoji: "🐪",
      desc: "A sacred lake town with 52 bathing ghats and over 400 temples. November's Pushkar Camel Fair is one of the world's most surreal spectacles.",
      distance: "145 km · ~3 hrs by road",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Pushkar_Lake.jpg/1280px-Pushkar_Lake.jpg",
    },
    {
      name: "Ranthambore",
      emoji: "🐯",
      desc: "India's most famed tiger reserve, set against ancient fort ruins. A morning safari here, watching a Bengal tiger stalk through tall grass, is a defining life experience.",
      distance: "180 km · ~3.5 hrs by road",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Ranthambhore_Fort.jpg/1280px-Ranthambhore_Fort.jpg",
    },
  ],
  months: [
    { m: "Jan", range: "8°– 22°C", label: "Cold Nights", type: "warn" },
    { m: "Feb", range: "12°– 25°C", label: "Great!", type: "good" },
    { m: "Mar", range: "18°– 32°C", label: "Best", type: "best" },
    { m: "Apr", range: "25°– 38°C", label: "Warm", type: "warn" },
    { m: "May", range: "30°– 44°C", label: "Very Hot", type: "bad" },
    { m: "Jun", range: "28°– 42°C", label: "Monsoon", type: "bad" },
    { m: "Jul", range: "25°– 37°C", label: "Heavy Rain", type: "bad" },
    { m: "Aug", range: "24°– 34°C", label: "Clearing", type: "warn" },
    { m: "Sep", range: "22°– 33°C", label: "Good", type: "good" },
    { m: "Oct", range: "18°– 32°C", label: "Best", type: "best" },
    { m: "Nov", range: "12°– 26°C", label: "Ideal", type: "best" },
    { m: "Dec", range: "8°– 22°C", label: "Chilly", type: "warn" },
  ],
  tips: [
    { icon: "😎", title: "Beat the Heat", desc: "Visit April–June before 10AM and after 5PM. Carry electrolytes and wear light cotton." },
    { icon: "🧥", title: "Winter Nights", desc: "December–January evenings drop to 5–8°C. Pack a warm jacket for open-air heritage dinners." },
    { icon: "🤝", title: "Bargain Wisely", desc: "Haggling is expected at bazaars. Start at 50% of the quoted price. Always smile — it's part of the ritual." },
    { icon: "🌸", title: "Festival Timing", desc: "Visit during Diwali (Oct–Nov) or Holi (Mar) for a transformative cultural experience — but book 3 months ahead." },
  ],
  checklist: {
    Summer: ["High-SPF sunscreen (SPF 50+)", "2-litre reusable water bottle", "Light cotton or linen clothing", "UV-protective sunglasses", "Wide-brimmed hat or scarf", "ORS sachets / electrolyte tablets", "Cooling face mist spray", "Portable fan or mini cooler"],
    Winter: ["Warm jacket or shawl", "Thermal innerwear for evenings", "Comfortable walking shoes", "Lip balm & moisturiser", "Scarf for cold mornings", "Hand warmers"],
    Essentials: ["Aadhaar / passport copy", "Travel insurance docs", "Offline maps (Google Maps)", "Cash in small denominations", "Reusable bag for shopping", "Basic first-aid kit", "Power bank", "Camera with extra memory"],
  },
};

/* ─── STYLES ─── */
const S = {
  orange: "#FF6B1A",
  orangeDark: "#e05a10",
  cream: "#FDF6EC",
  darkBrown: "#5c1a00",
  midBrown: "#8B2500",
  maroon: "#5c1212",
  textMid: "#5a3020",
  textMuted: "#9a7060",
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #FDF6EC; color: #2D0A00; }
  html { scroll-behavior: smooth; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #FDF6EC; }
  ::-webkit-scrollbar-thumb { background: #FF6B1A; border-radius: 3px; }
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
    100% { transform: translateY(0px); }
  }
`;

/* ─── SUB-COMPONENTS ─── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(253,246,236,0.97)" : "rgba(253,246,236,0.85)",
      backdropFilter: "blur(10px)",
      borderBottom: scrolled ? "1px solid rgba(200,150,100,0.2)" : "1px solid transparent",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 48px", height: 64,
      transition: "all 0.3s ease",
    }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <img 
          src="/logo.jpg" 
          alt="logo" 
          style={{ 
           width: 40, height: 40, 
          transition: "transform 0.5s ease",
          border: "none",
          outline: "none",
          borderRadius: 10,
  }}
  onMouseEnter={e => e.target.style.transform = "rotate(360deg)"}
  onMouseLeave={e => e.target.style.transform = "rotate(0deg)"}
/>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: S.darkBrown }}>
          Travel in <span style={{ color: S.orange }}>Depth</span>
        </span>
      </a>
      <ul style={{ display: "flex", gap: 36, listStyle: "none" }}>
        {["Plan Trip", "Attractions", "Food", "Experiences", "Best Time"].map(item => (
          <li key={item}>
            <a href={`#${item.toLowerCase().replace(" ", "-")}`} style={{
              textDecoration: "none", color: S.textMid, fontSize: 14, fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = S.orange}
            onMouseLeave={e => e.target.style.color = S.textMid}
            >{item}</a>
          </li>
        ))}
      </ul>
      <button style={{
        background: S.orange, color: "white", border: "none", borderRadius: 50,
        padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer",
        display: "flex", alignItems: "center", gap: 6,
      }}>✦ Plan My Trip</button>
    </nav>
  );
}

function FloatingNav() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div style={{ position: "fixed", right: 24, top: "50%", transform: "translateY(-50%)", zIndex: 900, display: "flex", flexDirection: "column", gap: 10 }}>
      {[
        { icon: "↑", action: scrollToTop, bg: "white" },
        { icon: "📅", action: () => document.getElementById("plan-trip")?.scrollIntoView({ behavior: "smooth" }), bg: "white" },
        { icon: "♥", action: () => {}, bg: S.orange },
      ].map((btn, i) => (
        <button key={i} onClick={btn.action} style={{
          width: 44, height: 44, borderRadius: "50%",
          background: btn.bg, border: "1px solid rgba(0,0,0,0.1)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: btn.icon === "♥" ? 18 : 16,
          color: btn.bg === S.orange ? "white" : S.darkBrown,
        }}>{btn.icon}</button>
      ))}
    </div>
  );
}

function Hero({ city }) {
  return (
    <section id="hero" style={{ position: "relative", height: "100vh", minHeight: 700, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${city.image})`,
        backgroundSize: "cover", backgroundPosition: "center",
        filter: "brightness(0.5) saturate(1.2)",
      }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(80,20,0,0.25) 0%, rgba(120,30,0,0.5) 50%, rgba(50,10,0,0.75) 100%)" }} />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", color: "white", maxWidth: 900, padding: "0 24px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: 50, padding: "7px 20px", fontSize: 14, fontWeight: 500,
          marginBottom: 22,
        }}>
          <span style={{ width: 8, height: 8, background: S.orange, borderRadius: "50%", display: "inline-block" }} />
          {city.region} · {city.badge}
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(64px,8vw,96px)", fontWeight: 800, lineHeight: 1, marginBottom: 4 }}>
          {city.name}
        </h1>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px,6vw,76px)", fontWeight: 700, fontStyle: "italic", color: "#FFB347", lineHeight: 1.1, marginBottom: 28 }}>
          {city.tagline}
        </div>
        <p style={{ fontSize: 17, fontStyle: "italic", color: "rgba(255,255,255,0.8)", marginBottom: 16 }}>{city.subtitle}</p>
        <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.68)", lineHeight: 1.8, maxWidth: 600, margin: "0 auto 40px" }}>{city.description}</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => document.getElementById("plan-trip")?.scrollIntoView({ behavior: "smooth" })} style={{
            background: S.orange, color: "white", border: "none", borderRadius: 50,
            padding: "15px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 8,
          }}>✦ Plan Your Trip</button>
          <button onClick={() => document.getElementById("attractions")?.scrollIntoView({ behavior: "smooth" })} style={{
            background: "transparent", color: "white", border: "1.5px solid rgba(255,255,255,0.7)",
            borderRadius: 50, padding: "15px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 8,
          }}>🗺 Explore Places</button>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2 }}>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.45)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 24 }}>SCROLL</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(32px, 5vw, 80px)", padding: "0 40px 40px" }}>
          // REPLACE with:
           {(city.stats ?? []).map(s => (
            <div key={s.label} style={{ textAlign: "center", color: "white" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: "#FFB347" }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* curved white transition */}
      <div style={{
        position: "absolute", bottom: -2, left: 0, right: 0, height: 80, zIndex: 3,
        background: "#FDF6EC", borderRadius: "50% 50% 0 0 / 80px 80px 0 0",
      }} />
    </section>
  );
}

function PlannerSection({ city }) {
  const [days, setDays] = useState(3);
  const [style, setStyle] = useState("Couple / Honeymoon");
const [budget, setBudget] = useState("Mid-range (₹3000–6000/day)");
const [itinerary, setItinerary] = useState(null);
const [loading, setLoading] = useState(false);

const generate = async () => {
  setLoading(true);
  setItinerary(null);
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `Create a ${days}-day itinerary for ${city.name} for a ${style} traveller with ${budget} budget. Format your response as JSON only, no markdown, like this: {"days": [{"day": 1, "title": "Day title", "morning": "activity", "afternoon": "activity", "evening": "activity", "tip": "local tip"}]}`
        }]
      })
    });
    const data = await response.json();
    const text = data.content[0].text;
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    setItinerary(parsed.days);
  } catch (err) {
    setItinerary("error");
  }
  setLoading(false);
};

return (    <section id="plan-trip" style={{ padding: "80px 0", background: "#FDF6EC" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: S.orange, textAlign: "center", marginBottom: 10 }}>SMART PLANNER</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, color: S.darkBrown, textAlign: "center", marginBottom: 10 }}>
          Build Your Perfect {city.name} Itinerary
        </h2>
        <div style={{ width: 60, height: 3, background: S.orange, margin: "0 auto 14px", borderRadius: 2 }} />
        <p style={{ color: S.textMuted, textAlign: "center", fontSize: 15.5, maxWidth: 560, margin: "0 auto 52px", lineHeight: 1.7 }}>
          Tell us how you travel, and we'll craft a day-by-day plan tailored just for you.
        </p>

        <div style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 40px rgba(90,20,0,0.08)" }}>
          {/* Dark header */}
          <div style={{ background: "#5c1212", padding: "28px 36px", display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 44, height: 44, background: "rgba(255,255,255,0.12)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📅</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "white" }}>Trip Planner</div>
              <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.65)" }}>Customise your experience in seconds</div>
            </div>
          </div>
          {/* Controls */}
          <div style={{ padding: "40px 36px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32, alignItems: "start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: S.textMuted }}>NUMBER OF DAYS</span>
                <span style={{ background: S.orange, color: "white", fontSize: 13, fontWeight: 700, borderRadius: 50, padding: "3px 14px" }}>{days} Days</span>
              </div>
              <input type="range" min={1} max={7} value={days} onChange={e => setDays(+e.target.value)}
                style={{ width: "100%", accentColor: S.orange, cursor: "pointer" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: S.textMuted, marginTop: 6 }}>
                <span>1 Day</span><span>7 Days</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: S.textMuted, marginBottom: 12 }}>TRAVEL STYLE</div>
              <select value={style} onChange={e => setStyle(e.target.value)} style={{
                width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #e8d5c4",
                fontSize: 14, fontFamily: "'DM Sans', sans-serif", background: "#fff8f4",
                color: S.darkBrown, cursor: "pointer", outline: "none",
              }}>
                {["Couple / Honeymoon 💑", "Solo Explorer 🎒", "Family with Kids 👨‍👩‍👧", "Friends Group 🎉", "Cultural Enthusiast 🏛"].map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: S.textMuted, marginBottom: 12 }}>BUDGET LEVEL</div>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{
                width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #e8d5c4",
                fontSize: 14, fontFamily: "'DM Sans', sans-serif", background: "#fff8f4",
                color: S.darkBrown, cursor: "pointer", outline: "none",
              }}>
                {["Budget (₹500–1500/day) 💰", "Mid-range (₹3000–6000/day) 💳", "Luxury (₹10000+/day) 👑"].map(b => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ padding: "0 36px 40px", textAlign: "center" }}>
            <button onClick={generate} disabled={loading} style={{
             background: loading ? "#ccc" : S.orange, color: "white", border: "none", borderRadius: 50,
            padding: "16px 48px", fontSize: 16, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
            display: "inline-flex", alignItems: "center", gap: 8,
                }}>
              {loading ? "⏳ Generating..." : "✦ Generate My Itinerary"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AttractionCard({ a }) {
  return (
    <div style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 20px rgba(90,20,0,0.06)", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", height: 220 }}>
        <img src={a.image} alt={a.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={e => { e.target.style.background = "#e8d5c0"; e.target.style.display = "none"; }} />
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 7 }}>
          {a.tags.map(t => (
            <span key={t.label} style={{ background: t.color, color: "white", fontSize: 12, fontWeight: 600, borderRadius: 50, padding: "4px 12px" }}>{t.label}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: S.midBrown, marginBottom: 8 }}>{a.name}</h3>
        <p style={{ fontSize: 14, color: S.textMid, lineHeight: 1.75, flex: 1, marginBottom: 18 }}>{a.desc}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f0e4d8", paddingTop: 14 }}>
          <span style={{ fontSize: 14, color: "#b37a00", fontWeight: 600 }}>⭐ {a.rating} ({a.reviews} reviews)</span>
          <span style={{ fontSize: 13, color: S.textMuted, display: "flex", alignItems: "center", gap: 5 }}>🕐 {a.hours}</span>
        </div>
      </div>
    </div>
  );
}

function AttractionsSection({ city }) {
  return (
    <section id="attractions" style={{ padding: "80px 0", background: "#FDF6EC" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: S.orange, textAlign: "center", marginBottom: 10 }}>MUST-VISIT</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, color: S.darkBrown, textAlign: "center", marginBottom: 10 }}>
          Iconic Attractions of {city.name}
        </h2>
        <div style={{ width: 60, height: 3, background: S.orange, margin: "0 auto 14px", borderRadius: 2 }} />
        <p style={{ color: S.textMuted, textAlign: "center", fontSize: 15.5, maxWidth: 560, margin: "0 auto 56px", lineHeight: 1.7 }}>
          From UNESCO World Heritage palaces to soaring hilltop forts — every landmark tells an epic story.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
          {(city.attractions ?? []).map(a => <AttractionCard key={a.name} a={a} />)}
        </div>
      </div>
    </section>
  );
}

function FoodSection({ city }) {
  return (
    <section id="food" style={{ padding: "80px 0", background: "#FDF6EC" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: S.orange, textAlign: "center", marginBottom: 10 }}>WHERE TO EAT</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: S.orange, textAlign: "center", marginBottom: 10 }}>
          Famous Local Spots
        </h2>
        <div style={{ width: 60, height: 3, background: S.orange, margin: "0 auto 52px", borderRadius: 2 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
         {(city.food ?? []).map(f => (
            <div key={f.name} style={{ background: "white", borderRadius: 16, overflow: "hidden", display: "flex", alignItems: "center", gap: 0, boxShadow: "0 2px 12px rgba(90,20,0,0.06)" }}>
              <img src={f.image} alt={f.name} style={{ width: 110, height: 110, objectFit: "cover", flexShrink: 0 }}
                onError={e => { e.target.style.background = "#e8d5c0"; }} />
              <div style={{ padding: "14px 18px" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: S.darkBrown, marginBottom: 6, lineHeight: 1.3 }}>{f.name}</h3>
                <p style={{ fontSize: 13, color: S.textMid, lineHeight: 1.6, marginBottom: 8 }}>{f.desc}</p>
                <span style={{ fontSize: 12, color: S.orange, fontWeight: 600 }}>✦ {f.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperiencesSection({ city }) {
  return (
    <section id="experiences" style={{ padding: "80px 0", background: "#5c1212" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#FFB347", textAlign: "center", marginBottom: 10 }}>LIVE IT FULLY</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,5vw,54px)", fontWeight: 800, color: "white", textAlign: "center", marginBottom: 10 }}>
          Must-Do Experiences
        </h2>
        <div style={{ width: 60, height: 3, background: "#FFB347", margin: "0 auto 14px", borderRadius: 2 }} />
        <p style={{ color: "rgba(255,255,255,0.6)", textAlign: "center", fontSize: 15.5, maxWidth: 580, margin: "0 auto 56px", lineHeight: 1.7 }}>
          Beyond sightseeing — these are the moments that turn a trip into a lifelong memory.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
          {(city.experiences ?? []).map(exp => (
            <div key={exp.name} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
              <img src={exp.image} alt={exp.name} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
                onError={e => { e.target.style.background = "#8b2500"; }} />
              <div style={{ padding: "18px 18px 20px" }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{exp.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "white", marginBottom: 8, lineHeight: 1.3 }}>{exp.name}</h3>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 16 }}>{exp.desc}</p>
                <span style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 500, borderRadius: 50, padding: "5px 14px", display: "inline-flex", alignItems: "center", gap: 5 }}>
                  🕐 {exp.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HiddenGemsSection({ city }) {
  return (
    <section style={{ padding: "80px 0", background: "#FDF6EC" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: S.orange, textAlign: "center", marginBottom: 10 }}>OFF THE BEATEN PATH</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, color: S.darkBrown, textAlign: "center", marginBottom: 10 }}>
          Hidden Gems of {city.name}
        </h2>
        <div style={{ width: 60, height: 3, background: S.orange, margin: "0 auto 14px", borderRadius: 2 }} />
        <p style={{ color: S.textMuted, textAlign: "center", fontSize: 15.5, maxWidth: 560, margin: "0 auto 56px", lineHeight: 1.7 }}>
          Skip the crowds. These lesser-known treasures reveal a quieter, more magical side of the Pink City.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
          {(city.hiddenGems ?? []).map(gem => (
            <div key={gem.name} style={{ background: "white", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px rgba(90,20,0,0.07)" }}>
              <img src={gem.image} alt={gem.name} style={{ width: "100%", height: 190, objectFit: "cover", display: "block" }}
                onError={e => { e.target.style.background = "#e8d5c0"; }} />
              <div style={{ padding: "18px 18px 20px" }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{gem.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: S.midBrown, marginBottom: 8, lineHeight: 1.3 }}>{gem.name}</h3>
                <p style={{ fontSize: 13, color: S.textMid, lineHeight: 1.7, marginBottom: 16 }}>{gem.desc}</p>
                <span style={{ background: "#fde8e8", color: "#c0392b", fontSize: 12, fontWeight: 500, borderRadius: 50, padding: "4px 12px", display: "inline-flex", alignItems: "center", gap: 4 }}>
                  📍 {gem.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NearbySection({ city }) {
  return (
    <section style={{ padding: "80px 0", background: "#FDF6EC" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,50px)", fontWeight: 800, color: S.darkBrown, textAlign: "center", marginBottom: 10 }}>
          Nearby Destinations
        </h2>
        <div style={{ width: 60, height: 3, background: S.orange, margin: "0 auto 14px", borderRadius: 2 }} />
        <p style={{ color: S.textMuted, textAlign: "center", fontSize: 15.5, maxWidth: 560, margin: "0 auto 56px", lineHeight: 1.7 }}>
          Extend your journey — Rajasthan's magic doesn't stop at {city.name}'s borders.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
          {(city.nearby ?? []).map(n => (
            <div key={n.name} style={{ background: "white", borderRadius: 18, overflow: "hidden", boxShadow: "0 2px 20px rgba(90,20,0,0.07)" }}>
              <div style={{ position: "relative", height: 220 }}>
                <img src={n.image} alt={n.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={e => { e.target.style.background = "#e8d5c0"; }} />
              </div>
              <div style={{ padding: "22px 24px" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: S.darkBrown, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                  {n.emoji} {n.name}
                </h3>
                <p style={{ fontSize: 14, color: S.textMid, lineHeight: 1.75, marginBottom: 16 }}>{n.desc}</p>
                <span style={{ fontSize: 13.5, color: S.orange, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                  📍 {n.distance}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestTimeSection({ city }) {
  const typeStyles = {
    best: { bg: "#e8f5e9", text: "#2e7d32", icon: "✅" },
    good: { bg: "#e8f5e9", text: "#2e7d32", icon: "✅" },
    warn: { bg: "#fff8e1", text: "#b37a00", icon: "⚠️" },
    bad:  { bg: "#fdecea", text: "#b71c1c", icon: "🌧" },
  };
  return (
    <section id="best-time" style={{ padding: "80px 0", background: "#FDF6EC" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, color: S.darkBrown, textAlign: "center", marginBottom: 10 }}>
          Best Time to Visit {city.name}
        </h2>
        <div style={{ width: 60, height: 3, background: S.orange, margin: "0 auto 14px", borderRadius: 2 }} />
        <p style={{ color: S.textMuted, textAlign: "center", fontSize: 15.5, maxWidth: 540, margin: "0 auto 52px", lineHeight: 1.7 }}>
          Timing matters. Here's a month-by-month guide to help you plan the perfect trip.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 52 }}>
          {(city.months ?? []).map(m =>  {
            const st = typeStyles[m.type];
            return (
              <div key={m.m} style={{ background: st.bg, borderRadius: 12, padding: "18px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: st.text, marginBottom: 4 }}>{m.m}</div>
                <div style={{ fontSize: 13, color: S.textMid, marginBottom: 8 }}>{m.range}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: st.text, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  {st.icon} {m.label}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {(city.tips ?? []).map(tip => (
            <div key={tip.title} style={{ background: "white", borderRadius: 14, padding: "20px 18px", boxShadow: "0 2px 12px rgba(90,20,0,0.06)" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{tip.icon}</div>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: S.darkBrown, marginBottom: 8 }}>{tip.title}</h4>
              <p style={{ fontSize: 13, color: S.textMid, lineHeight: 1.7 }}>{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChecklistSection({ city }) {
  const tabs =Object.keys(city.checklist ?? {});
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [checked, setChecked] = useState({});
  const toggle = item => setChecked(p => ({ ...p, [item]: !p[item] }));
 const items = city.checklist?.[activeTab] ?? [];
  return (
    <section style={{ padding: "80px 0", background: "#FDF6EC" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 40px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: S.orange, textAlign: "center", marginBottom: 10 }}>PACK SMART</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, color: S.darkBrown, textAlign: "center", marginBottom: 10 }}>
          Travel Checklist
        </h2>
        <div style={{ width: 60, height: 3, background: S.orange, margin: "0 auto 14px", borderRadius: 2 }} />
        <p style={{ color: S.textMuted, textAlign: "center", fontSize: 15.5, maxWidth: 540, margin: "0 auto 40px", lineHeight: 1.7 }}>
          Don't leave home without ticking these off. Customised by season.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 44 }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: "10px 26px", borderRadius: 50, fontSize: 14.5, fontWeight: 600, cursor: "pointer",
              border: "none",
              background: activeTab === tab ? S.orange : "transparent",
              color: activeTab === tab ? "white" : S.textMid,
              transition: "all 0.2s",
            }}>
              {tab === "Summer" ? "☀️" : tab === "Winter" ? "❄️" : "👜"} {tab}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {items.map(item => (
            <label key={item} onClick={() => toggle(item)} style={{
              display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer",
              background: checked[item] ? "#fff0e8" : "white",
              border: checked[item] ? `1.5px solid ${S.orange}` : "1.5px solid #f0e4d8",
              borderRadius: 12, padding: "14px 16px",
              transition: "all 0.2s",
            }}>
              <div style={{
                width: 20, height: 20, border: `2px solid ${checked[item] ? S.orange : "#ccc"}`,
                borderRadius: 4, flexShrink: 0, marginTop: 1,
                background: checked[item] ? S.orange : "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, color: "white", fontWeight: 700,
              }}>{checked[item] ? "✓" : ""}</div>
              <span style={{ fontSize: 14, color: S.textMid, lineHeight: 1.5 }}>{item}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#5c1212", padding: "50px 40px", textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 12 }}>
       <img 
         src="/logo.jpg" 
         alt="logo" 
         style={{ 
         width: 40, height: 40, 
         transition: "transform 0.5s ease",
         border: "none",
        outline: "none",
         borderRadius: 10,
  }}
  onMouseEnter={e => e.target.style.transform = "rotate(360deg)"}
  onMouseLeave={e => e.target.style.transform = "rotate(0deg)"}
/>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "white" }}>
          Travel in <span style={{ color: "#FFB347" }}>Depth</span>
        </span>
      </div>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>Crafted with ❤️ for wanderers who seek the extraordinary in every corner of India.</p>
    </footer>
  );
}

/* ─── MAIN PAGE ─── */
export default function CityPage() {
  const { slug } = useParams();
  const { cities } = useContext(CityContext);
  const contextCity = cities?.find(c => c.slug === slug);
const city = contextCity ? { ...JAIPUR, ...contextCity } : JAIPUR;

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalStyles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (!city) {
    return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#FDF6EC" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#5c1a00" }}>City not found, bhai!</h2>
        <Link to="/destinations" style={{ marginTop: 16, color: "#FF6B1A", fontWeight: 700 }}>Back to Map</Link>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FDF6EC" }}>
      <Navbar />
      <FloatingNav />
      <Hero city={city} />
      <PlannerSection city={city} />
      <AttractionsSection city={city} />
      <FoodSection city={city} />
      <ExperiencesSection city={city} />
      <HiddenGemsSection city={city} />
      <NearbySection city={city} />
      <BestTimeSection city={city} />
      <ChecklistSection city={city} />
      <Footer />
    </div>
  );
}