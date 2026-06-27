import React, { useState, useMemo } from 'react';
import {
  Routes,
  Route,
  Link,
  useLocation,
  Navigate
}  from 'react-router-dom';
import { 
  LayoutDashboard,Home, User, Map, Heart, Calendar, BookOpen, 
  Star, Leaf, Bell, Settings, Search, LogOut, ChevronRight, 
  MapPin, Plus, Filter, Trash2, Camera, Wind, Plane, 
  Navigation, Award, TrendingUp, Info, ShoppingBag, 
  ArrowRight, CheckCircle2, AlertCircle, Clock, Users, 
  IndianRupee, CloudSun, Share2, MessageSquare, ShieldCheck, 
  Eye, Download, Moon, Sun, Globe,Sparkles
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, AreaChart, Area, PieChart, Pie
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

/** 
 * THEME & CONSTANTS
 */
const COLORS = {
  primary: '#FF6B1A', // Saffron
  secondary: '#8B1A1A', // Maroon
  bg: '#FDF6EC', // Cream
  card: '#FFF8F0', // Ivory
  accent: '#F5A623', // Gold
  success: '#138808' // Green
};

// --- SHARED COMPONENTS ---

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const Card = ({ children, className = "", noPadding = false }) => (
  <div className={`bg-[#FFF8F0] rounded-[20px] shadow-sm border border-[#E8DCC4] overflow-hidden ${noPadding ? '' : 'p-6'} ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = 'primary' }) => {
  const styles = {
    primary: "bg-[#FF6B1A]/10 text-[#FF6B1A]",
    secondary: "bg-[#8B1A1A]/10 text-[#8B1A1A]",
    success: "bg-[#138808]/10 text-[#138808]",
    gold: "bg-[#F5A623]/10 text-[#F5A623]"
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[variant]}`}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = 'primary', className = "", ...props }) => {
  const variants = {
    primary: "bg-[#FF6B1A] text-white hover:bg-[#e55a10]",
    secondary: "bg-[#8B1A1A] text-white hover:bg-[#6d1414]",
    outline: "border-2 border-[#8B1A1A] text-[#8B1A1A] hover:bg-[#8B1A1A] hover:text-white",
    ghost: "text-[#8B1A1A] hover:bg-[#8B1A1A]/5"
  };
  return (
    <button className={`px-6 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95 ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// --- PAGES ---

// 1. DASHBOARD
const Dashboard = () => {
  const distanceData = [
    { name: 'Jan', km: 1200 }, { name: 'Feb', km: 450 }, { name: 'Mar', km: 3400 },
    { name: 'Apr', km: 890 }, { name: 'May', km: 2100 }, { name: 'Jun', km: 5600 },
  ];
  

  return (
    <PageTransition>
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        
        
        <Card className="bg-gradient-to-r from-[#8B1A1A] via-[#A32020] to-[#8B1A1A] text-white p-12 min-h-[320px] relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-serif font-bold mb-4">Namaste, Arjun Mehta 👋</h2>
            <p className="text-orange-200 italic mb-8 max-w-md">"The world is a book; non-travelers read only one page."</p>
            <div className="flex gap-4">
              <Button>Start New Plan</Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#8B1A1A]">Explore Guidebooks</Button>
            </div>
          </div>
          
            <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute right-[-5%] bottom-[-20%] opacity-20"><Globe size={400} /></div>
          <div className="absolute right-10 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 w-80">
                   <p className="text-orange-300 text-sm font-semibold">
                      NEXT ADVENTURE</p>
                       <h3 className="text-2xl font-serif font-bold mt-2"> Varanasi & Sarnath</h3>
                   <p className="text-orange-100 mt-2">15 July 2026 </p>
         <div className="mt-4">
         <div className="flex justify-between text-sm mb-2">
           <span>Preparation</span> <span>78%</span></div>
             <div className="w-full bg-white/20 rounded-full h-2">
       <div
        className="bg-orange-400 h-2 rounded-full"
        style={{ width: "78%" }}
      />
    </div>
  </div>
</div>
        </Card>
        

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Completed', val: '18', icon: CheckCircle2 },
            { label: 'States', val: '09/28', icon: MapPin },
            { label: 'Wishlist', val: '12', icon: Heart },
            { label: 'Eco Score', val: '840', icon: Leaf },
          ].map((s, i) => (
            <Card key={i} className="flex items-center gap-4">
              <div className="p-3 bg-[#FF6B1A]/10 text-[#FF6B1A] rounded-xl"><s.icon size={24} /></div>
              <div>
                <p className="text-[10px] font-bold text-[#8B1A1A]/50 uppercase">{s.label}</p>
                <h4 className="text-xl font-bold text-[#8B1A1A]">{s.val}</h4>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <h3 className="font-serif text-xl font-bold text-[#8B1A1A] mb-6">Travel Analytics</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={distanceData}>
                  <defs>
                    <linearGradient id="colorKm" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B1A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF6B1A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#8B1A1A50" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="km" stroke="#FF6B1A" strokeWidth={3} fillOpacity={1} fill="url(#colorKm)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <h3 className="font-serif text-xl font-bold text-[#8B1A1A] mb-6">Badges</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              {[
                { n: 'Himalayan Soul', i: Wind, c: 'success' },
                { n: 'Heritage Hunter', i: Award, c: 'primary' },
                { n: 'Wild Heart', i: AlertCircle, c: 'gold' },
                { n: 'Beach Bum', i: Sun, c: 'secondary' },
              ].map((b, i) => (
                <div key={i} className="p-4 bg-white/50 rounded-2xl border border-[#E8DCC4] flex flex-col items-center">
                  <b.i size={32} className={`text-${b.c === 'primary' ? '[#FF6B1A]' : '[#8B1A1A]'}`} />
                  <p className="text-[10px] font-bold mt-2 uppercase">{b.n}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

// 2. MY PROFILE
const Profile = () => (
  <PageTransition>
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-8 mb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-[#8B1A1A] flex items-center justify-center text-4xl text-white font-serif font-bold">AM</div>
          <button className="absolute bottom-0 right-0 p-2 bg-[#FF6B1A] text-white rounded-full ring-4 ring-[#FDF6EC]"><Camera size={16}/></button>
        </div>
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#8B1A1A]">Arjun Mehta</h2>
          <p className="text-[#8B1A1A]/60 font-medium">Mumbai, India • Pro Traveler</p>
          <div className="flex gap-2 mt-3">
            <Badge>Spiritual</Badge><Badge>Adventure</Badge><Badge variant="gold">Luxury</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <h3 className="font-bold text-[#8B1A1A]">Personal Information</h3>
          <div className="space-y-4">
            {['Full Name', 'Email', 'Phone', 'Passport Status'].map(l => (
              <div key={l}>
                <label className="text-[10px] font-bold text-[#8B1A1A]/40 uppercase tracking-widest">{l}</label>
                <input type="text" className="w-full bg-white border border-[#E8DCC4] rounded-xl px-4 py-2 mt-1 text-sm" placeholder={l} />
              </div>
            ))}
          </div>
        </Card>
        <Card className="space-y-4">
          <h3 className="font-bold text-[#8B1A1A]">Travel Preferences</h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-[#8B1A1A]/40 uppercase tracking-widest">Bio</label>
              <textarea className="w-full bg-white border border-[#E8DCC4] rounded-xl px-4 py-2 mt-1 text-sm h-24" placeholder="Share your travel philosophy..." />
            </div>
            <div>
              <label className="text-[10px] font-bold text-[#8B1A1A]/40 uppercase tracking-widest">Known Languages</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Hindi', 'English', 'Marathi', 'Gujarati'].map(lang => (
                  <span key={lang} className="bg-white border border-[#E8DCC4] px-3 py-1 rounded-full text-xs font-bold text-[#8B1A1A]">{lang}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex justify-end"><Button>Save Profile Changes</Button></div>
    </div>
  </PageTransition>
);

// 3. MY TRIPS
const MyTrips = ({ savedTrips, setSavedTrips }) => {
  const [tab, setTab] = useState("upcoming");
  const [selectedTrip, setSelectedTrip] = useState(null);

  const trips = [
    {
      id: 1,
      destination: "Varanasi",
      title: "Varanasi Spiritual Sojourn",
      startDate: "15 Jul 2026",
      endDate: "20 Jul 2026",
      status: "upcoming",
      budget: 45000,
      style: "Spiritual",
      travelers: 2,
      image: "/images/varanasi.jpg",
    },
    {
      id: 2,
      destination: "Ladakh",
      title: "Ladakh Bike Expedition",
      startDate: "10 Aug 2026",
      endDate: "22 Aug 2026",
      status: "upcoming",
      budget: 85000,
      style: "Adventure",
      travelers: 4,
      image: "/images/ladakh.jpg",
    },
    {
      id: 3,
      destination: "Goa",
      title: "Goa Monsoon Escape",
      startDate: "05 May 2026",
      endDate: "10 May 2026",
      status: "past",
      budget: 32000,
      style: "Beach",
      travelers: 2,
      image: "/images/goa.jpg",
    },
  ];

  return (
    <PageTransition>
      <div className="p-8 max-w-7xl mx-auto">

        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-4xl font-serif font-bold text-[#8B1A1A]">
              My Journeys
            </h2>
            <p className="text-[#8B1A1A]/60 mt-1">
              Manage your past and future expeditions
            </p>
          </div>

          <div className="flex bg-[#F5E6D3] p-1 rounded-xl">
            {["upcoming", "past"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2 rounded-lg font-bold capitalize transition-all ${
                  tab === t
                    ? "bg-[#8B1A1A] text-white shadow"
                    : "text-[#8B1A1A]/60"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {[...savedTrips, ...trips].filter((trip) => trip.status === tab).map((trip) => (
              <Card
                key={trip.id}
                className="group overflow-hidden hover:border-[#FF6B1A] transition-all duration-300 cursor-pointer"
              >
                <div className="h-44 rounded-xl overflow-hidden relative">
                  <img src={trip.image}alt={trip.destination} className="w-full h-full object-cover group-hover:scale-110 transition duration-500"/>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-4 left-4">
                      <Badge variant={trip.style === "Adventure" ? "primary" : "secondary"}> {trip.style}</Badge>
         </div>

</div>

                <div className="mt-5">

                  <h3 className="text-xl font-bold text-[#8B1A1A]">
                    {trip.title}
                  </h3>

                  <p className="text-sm text-[#8B1A1A]/50 mt-1">
                    📍 {trip.destination}
                  </p>

                  <div className="flex items-center gap-2 mt-4 text-sm text-[#8B1A1A]/60">
                    <Calendar size={15} />
                    {trip.startDate} — {trip.endDate}
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-sm text-[#8B1A1A]/60">
                    <Users size={15} />
                    {trip.travelers} Travelers
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#E8DCC4] flex justify-between items-center">

                    <div>
                      <p className="text-xs text-[#8B1A1A]/50">
                        Budget
                      </p>

                      <p className="font-bold text-[#138808]">
                        ₹{trip.budget.toLocaleString()}
                      </p>
                    </div>

                    <Button variant="ghost" className="text-sm px-4 py-2" onClick={() => setSelectedTrip(trip)}>  View Details</Button>

                  </div>

                </div>
              </Card>
            ))}

          <Card onClick={() => navigate("/dashboard/planner")} className="border-2 border-dashed border-[#E8DCC4] flex flex-col items-center justify-center min-h-[340px] hover:border-[#FF6B1A] transition-all cursor-pointer">

            <div className="w-20 h-20 rounded-full bg-[#FFF2E8] flex items-center justify-center mb-5">
              <Plus size={34} className="text-[#FF6B1A]" />
            </div>

            <h3 className="text-xl font-bold text-[#8B1A1A]">
              Plan a New Trip
            </h3>

            <p className="text-[#8B1A1A]/50 text-center mt-2 px-6">
              Create a personalized itinerary and start your next adventure.
            </p>

          </Card>

        </div>
      </div>
      {selectedTrip && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-8 w-[500px] shadow-2xl">

      <img
  src={selectedTrip.image}
  alt={selectedTrip.destination}
  className="w-full h-56 object-cover rounded-xl mb-6"
/>

      <p className="mt-3">📍 {selectedTrip.destination}</p>

      <p className="mt-2">
        📅 {selectedTrip.startDate} — {selectedTrip.endDate}
      </p>

      <p className="mt-2">
        👥 {selectedTrip.travelers} Travelers
      </p>

      <p className="mt-2">
        💰 ₹{selectedTrip.budget.toLocaleString()}
      </p>

      <button
        onClick={() => setSelectedTrip(null)}
        className="mt-6 w-full bg-[#8B1A1A] text-white py-3 rounded-xl"
      >
        Close
      </button>

    </div>
  </div>
)}
    </PageTransition>
  );
};

/// 4. WISHLIST
const Wishlist = () => {
  const wishlist = [
    {
      name: "Munnar Tea Estates",
      location: "Kerala",
      budget: "₹20k",
      image: "/images/munnar.jpg",
      season: "Oct - Mar",
      category: "Nature",
    },
    {
      name: "Valley of Flowers",
      location: "Uttarakhand",
      budget: "₹35k",
      image: "/images/valley-of-flowers.jpg",
      season: "Jul - Sep",
      category: "Adventure",
    },
    {
      name: "Jaisalmer Desert",
      location: "Rajasthan",
      budget: "₹25k",
      image: "/images/jaisalmer.jpg",
      season: "Nov - Feb",
      category: "Heritage",
    },
    {
      name: "Majuli Island",
      location: "Assam",
      budget: "₹18k",
      image: "/images/majuli.jpg",
      season: "Oct - Mar",
      category: "Cultural",
    },
  ];

  return (
    <PageTransition>
      <div className="p-8 max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h2 className="text-4xl font-serif font-bold text-[#8B1A1A]">
              Travel Bucket List
            </h2>

            <p className="text-[#8B1A1A]/60 mt-1">
              Save your dream destinations and start planning.
            </p>
          </div>

          <div className="flex gap-3">

            <Button variant="outline">
              <Share2 size={18} className="mr-2" />
              Share List
            </Button>

            <Button>
              <Plus size={18} className="mr-2" />
              Add Destination
            </Button>

          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7">

          {wishlist.map((item, index) => (

            <Card
              key={index}
              noPadding
              className="overflow-hidden group hover:-translate-y-2 transition duration-300 cursor-pointer"
            >

              <div className="relative h-60 overflow-hidden">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition">

                  <Heart
                    size={18}
                    className="text-red-500 fill-red-500"
                  />

                </button>

                <div className="absolute bottom-4 left-4">

                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#8B1A1A]">
                    {item.category}
                  </span>

                </div>

              </div>

              <div className="p-5">

                <h3 className="text-xl font-bold text-[#8B1A1A]">
                  {item.name}
                </h3>

                <div className="flex items-center gap-2 text-sm text-[#8B1A1A]/60 mt-2">
                  <MapPin size={15} />
                  {item.location}
                </div>

                <div className="flex items-center gap-2 text-sm text-[#8B1A1A]/60 mt-2">
                  🗓 Best Time: {item.season}
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#E8DCC4]">

                  <div>

                    <p className="text-xs text-[#8B1A1A]/50">
                      Estimated Budget
                    </p>

                    <p className="font-bold text-[#138808]">
                      {item.budget}
                    </p>

                  </div>

                  <Button
                    variant="ghost"
                    className="rounded-xl"
                  >
                    <ArrowRight size={18} />
                  </Button>

                </div>

              </div>

            </Card>

          ))}

        </div>

      </div>
    </PageTransition>
  );
};
// 5. TRIP PLANNER
const TripPlanner = ({ savedTrips, setSavedTrips }) => {
  const [selectedStyle, setSelectedStyle] = useState("");
  const [budget, setBudget] = useState(25000);
  const [itinerary, setItinerary] = useState([]);
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const destinations = [
  "Jaipur",
  "Goa",
  "Varanasi",
  "Manali",
  "Udaipur",
  "Rishikesh",
  "Mysore",
  "Kerala",
  "Leh",
  "Agra",
];
const filteredDestinations = destinations.filter((city) =>
  city.toLowerCase().includes(destination.toLowerCase())
);
  const [tripSummary, setTripSummary] = useState(null);
  const tripDays =
  startDate && endDate
    ? Math.max(
        1,
        Math.ceil(
          (new Date(endDate) - new Date(startDate)) /
            (1000 * 60 * 60 * 24)
        ) + 1
      )
    : 0;
  const budgetSplit = {
  Heritage: { flight: 0.30, hotel: 0.40, activity: 0.30 },
  Adventure: { flight: 0.30, hotel: 0.30, activity: 0.40 },
  Beach: { flight: 0.35, hotel: 0.45, activity: 0.20 },
  Spiritual: { flight: 0.25, hotel: 0.35, activity: 0.40 },
  Food: { flight: 0.30, hotel: 0.30, activity: 0.40 },
  Luxury: { flight: 0.20, hotel: 0.60, activity: 0.20 },
};
const styleDescription = {
  Heritage: "More budget is allocated for monuments and cultural experiences.",
  Adventure: "Activities receive a higher share for thrilling experiences.",
  Beach: "Hotels receive more budget for relaxing beach stays.",
  Spiritual: "Budget focuses on temples, local travel and peaceful experiences.",
  Food: "More budget is reserved for food tours and local cuisine.",
  Luxury: "Premium accommodation receives the highest share of the budget.",
};
const itineraries = {
  jaipur: [
    {
      day: 1,
      activities: [
        "🏨 Hotel Check-in",
        "🏰 Visit Hawa Mahal",
        "🍛 Lunch at Chokhi Dhani",
        "🌇 Sunset at Nahargarh Fort",
      ],
    },
    {
      day: 2,
      activities: [
        "🐘 Explore Amer Fort",
        "🛍️ Shop at Bapu Bazaar",
        "🍽️ Rajasthani Dinner",
        "🎭 Light & Sound Show",
      ],
    },
  ],

  goa: [
    {
      day: 1,
      activities: [
        "🏖️ Relax at Baga Beach",
        "🍹 Beach Shack Lunch",
        "🌅 Sunset Cruise",
        "🎉 Nightlife at Tito's",
      ],
    },
    {
      day: 2,
      activities: [
        "⛪ Basilica of Bom Jesus",
        "🏰 Fort Aguada",
        "🍤 Seafood Dinner",
        "🎶 Live Music",
      ],
    },
  ],

  default: [
    {
      day: 1,
      activities: [
        "🏨 Hotel Check-in",
        "📍 Explore Local Attractions",
        "🍽️ Local Cuisine",
        "🌇 Evening Walk",
      ],
    },
  ],
};
const generateItinerary = () => {
  if (!destination || !startDate || !endDate) {
  alert("Please enter destination and select your travel dates.");
  return;
}
  const cityPlan =
    itineraries[destination.toLowerCase()] || itineraries.default;

  const plan = [];

  for (let i = 0; i < tripDays; i++) {
    const sourceDay = cityPlan[i % cityPlan.length];

    plan.push({
      day: i + 1,
      activities: sourceDay.activities,
    });
  }
  setTripSummary({
  destination,
  days: tripDays,
  budget,
  style: selectedStyle || "General",
});
  setItinerary(plan);
  setSavedTrips((prev) => [
  ...prev,
  {
    id: Date.now(),
    destination,
    title: `${destination} ${selectedStyle || ""} Journey`,
    startDate,
    endDate,
    status: "upcoming",
    budget,
    style: selectedStyle || "General",
    travelers: 2,
    image: `/images/${destination.toLowerCase()}.jpg`,
  },
]);

};
const split = budgetSplit[selectedStyle] || budgetSplit.Beach;

  return (
    <PageTransition>
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-serif font-bold text-[#8B1A1A]">Custom Itinerary Builder</h2>
        <p className="text-[#8B1A1A]/60">Design your perfect journey beyond the guidebooks</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="space-y-6">
            <h3 className="font-bold text-[#8B1A1A] flex items-center gap-2"><Navigation size={20} /> Basic Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-[#8B1A1A]/40 uppercase">Destination</label>
                <div className="flex bg-white border border-[#E8DCC4] rounded-xl px-4 py-2 mt-1">
                   <Search size={16} className="mt-1 mr-2 opacity-30" />
                   <input type="text"placeholder="Where to?"value={destination}onChange={(e) => { setDestination(e.target.value); setShowSuggestions(true);
                                }}className="w-full text-sm outline-none"/>
                </div>
                {showSuggestions && destination && filteredDestinations.length > 0 && (
  <div className="mt-2 bg-white border border-[#E8DCC4] rounded-xl shadow-lg overflow-hidden">
    {filteredDestinations.map((city) => (
      <button
        key={city}
        onClick={() => {setDestination(city);  setShowSuggestions(false);}}
        className="w-full text-left px-4 py-3 hover:bg-[#FFF7F1] text-[#8B1A1A] transition-colors flex items-center gap-2"
      >
        <MapPin size={16} className="text-[#FF6B1A]" />
        {city}
      </button>
    ))}
  </div>
)}
              </div>
              <div>
                <div className="grid grid-cols-2 gap-3">
                 <div>
                     <label className="text-xs font-semibold uppercase text-[#8B1A1A]/50">
                        Start Date</label>
                   {/* Start date input */}</div>
           <div>
               <label className="text-xs font-semibold uppercase text-[#8B1A1A]/50">
                       End Date
              </label>

    {/* End date input */}
  </div>
</div>
                <div className="grid grid-cols-2 gap-2 mt-1">

  <div className="flex items-center bg-white border border-[#E8DCC4] rounded-xl px-3 py-2">
    <Calendar size={16} className="mr-2 opacity-40" />
    <input
      type="date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      className="w-full text-sm outline-none bg-transparent"
    />
  </div>

  <div className="flex items-center bg-white border border-[#E8DCC4] rounded-xl px-3 py-2">
    <Calendar size={16} className="mr-2 opacity-40" />
    <input
      type="date"
      value={endDate}
      onChange={(e) => setEndDate(e.target.value)}
      className="w-full text-sm outline-none bg-transparent"
    />
  </div>

</div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#8B1A1A]/40 uppercase">Travelers</label>
                <div className="flex bg-white border border-[#E8DCC4] rounded-xl px-4 py-2 mt-1">
                   <Users size={16} className="mt-1 mr-2 opacity-30" />
                   <input type="number" className="w-full text-sm outline-none" defaultValue={2} />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#8B1A1A]/40 uppercase">Budget Cap</label>
                <div className="flex bg-white border border-[#E8DCC4] rounded-xl px-4 py-2 mt-1">
                   <IndianRupee size={16} className="mt-1 mr-2 opacity-30" />
                   <input type="number"className="w-full text-sm outline-none"placeholder="Max budget"value={budget} 
                   onChange={(e) => setBudget(Number(e.target.value))}/>
                </div>
              </div>
            </div>
          </Card>
          <Card className="mt-6">
                  <h3 className="font-bold text-[#8B1A1A] flex items-center gap-2">
                 <Sparkles size={20} className="text-[#FF6B1A]" />Choose Your Travel Style</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
  {[
    { icon: "🏛️", name: "Heritage" },
    { icon: "🏔️", name: "Adventure" },
    { icon: "🏖️", name: "Beach" },
    { icon: "🧘", name: "Spiritual" },
    { icon: "🍜", name: "Food" },
    { icon: "💎", name: "Luxury" },
  ].map((style) => (
    <button
      key={style.name}
      onClick={() => setSelectedStyle(style.name)}
      className={`rounded-2xl px-3 py-4 transition-all duration-300 border ${
        selectedStyle === style.name
          ? "bg-[#8B1A1A] text-white border-[#8B1A1A] shadow-xl scale-105"
          : "bg-white border-[#E8DCC4] hover:border-[#FF6B1A] hover:bg-[#FFF7F1] hover:shadow-lg"
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="text-2xl mb-2">{style.icon}</div>

        <p className="font-semibold text-sm leading-tight text-center">
          {style.name}
        </p>
      </div>
    </button>
  ))}
</div>
</Card>

          <Card>
            {tripSummary && (
  <Card className="mb-6 bg-gradient-to-r from-[#FFF7F1] to-[#FDF6EC] border border-[#FFD7B5]">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-2xl font-serif font-bold text-[#8B1A1A]">
          🌍 {tripSummary.destination}
        </h3>

        <p className="mt-2 text-[#8B1A1A]/70">
          {tripSummary.days} Day Trip • {tripSummary.style} Experience
        </p>
      </div>

      <div className="text-right">
        <p className="text-sm text-[#8B1A1A]/60">Estimated Budget</p>

        <p className="text-2xl font-bold text-[#FF6B1A]">
          ₹{tripSummary.budget.toLocaleString()}
        </p>
      </div>
    </div>
  </Card>
)}
            <h3 className="font-bold text-[#8B1A1A] mb-4">Day-wise Breakdown</h3>
            {itinerary.length > 0 ? (
  <div className="space-y-6 mt-4">
    {itinerary.map((day) => (
      <div
        key={day.day}
        className="bg-[#FFF8F0] border border-[#E8DCC4] rounded-2xl p-5"
      >
        <h4 className="font-bold text-[#8B1A1A] mb-3">
          Day {day.day}
        </h4>

        <div className="space-y-2">
          {day.activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-[#8B1A1A]"
            >
              <span>{activity}</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
) : null}
            
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
  <h4 className="font-bold mb-5 flex items-center gap-2 text-[#8B1A1A]">
    <IndianRupee size={18} className="text-[#FF6B1A]" />
    Expense Estimator
  </h4>

  <div className="space-y-4">

    <div className="flex justify-between text-sm">
      <span className="text-[#8B1A1A]/70">✈ Flights</span>
      <span className="font-semibold text-[#8B1A1A]">
        ₹{Math.round(budget * split.flight).toLocaleString()}
      </span>
    </div>

    <div className="flex justify-between text-sm">
      <span className="text-[#8B1A1A]/70">🏨 Hotels</span>
      <span className="font-semibold text-[#8B1A1A]">
        ₹{Math.round(budget * split.hotel).toLocaleString()}
      </span>
    </div>

    <div className="flex justify-between text-sm">
      <span className="text-[#8B1A1A]/70">🎯 Activities</span>
      <span className="font-semibold text-[#8B1A1A]">
        ₹{Math.round(budget * split.activity).toLocaleString()}
      </span>
    </div>

    <div className="border-t border-[#E8DCC4] pt-4 flex justify-between">
      <span className="font-bold text-lg text-[#8B1A1A]">
        Total
      </span>

      <span className="font-bold text-xl text-[#8B1A1A]">
        ₹{budget.toLocaleString()}
      </span>
    </div>

   <div className="mt-4 rounded-xl bg-[#FFF7F1] border border-[#FFE2C5] p-3">
  <p className="text-xs font-medium text-[#8B1A1A]/70">
    {styleDescription[selectedStyle] ||
      "Select a travel style to see how your budget will be distributed."}
  </p>
</div>

  </div>
</Card>
          <Card>
             <h4 className="font-bold mb-3 flex items-center gap-2"><CloudSun size={18} /> Weather Info</h4>
             <p className="text-xs text-[#8B1A1A]/60">Select a destination to see expected climate conditions.</p>
          </Card>
         <Button onClick={generateItinerary} className="w-full py-4 text-lg">Generate Full Plan</Button>
        </div>
      </div>
    </div>
  </PageTransition>
);
};

// 6. TRAVEL JOURNAL
const Journal = () => (
  <PageTransition>
    <div className="p-8 max-w-4xl mx-auto">
       <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-[#8B1A1A]">My Travel Journal</h2>
        <Button><Plus size={18} /> New Entry</Button>
      </div>
      <div className="space-y-8 relative before:absolute before:left-8 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#E8DCC4]">
        {[
          { date: 'June 12, 2024', title: 'Sunset at Gateway of India', text: 'The sea breeze was unusually cool today. Watched the ferries come in...', mood: 'Peaceful' },
          { date: 'June 02, 2024', title: 'Hampi Boulders Expedition', text: 'Climbing up Matanga Hill was exhausting but the view of the ruins was worth it.', mood: 'Tired but Happy' },
        ].map((entry, i) => (
          <div key={i} className="pl-16 relative">
            <div className="absolute left-6 top-1 w-4 h-4 bg-[#FF6B1A] rounded-full border-4 border-[#FDF6EC]"></div>
            <Card>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold text-[#FF6B1A] uppercase tracking-widest">{entry.date}</span>
                <span className="text-[10px] font-bold bg-[#8B1A1A]/5 px-2 py-1 rounded text-[#8B1A1A]">Mood: {entry.mood}</span>
              </div>
              <h3 className="text-xl font-bold text-[#8B1A1A] mt-2">{entry.title}</h3>
              <p className="text-[#8B1A1A]/70 mt-3 text-sm leading-relaxed">{entry.text}</p>
              <div className="flex gap-3 mt-4">
                <div className="w-20 h-20 bg-[#F5E6D3] rounded-lg"></div>
                <div className="w-20 h-20 bg-[#F5E6D3] rounded-lg"></div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  </PageTransition>
);

// 7. REVIEWS
const Reviews = () => (
  <PageTransition>
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-serif font-bold text-[#8B1A1A] mb-8">My Reviews & Ratings</h2>
      <div className="grid grid-cols-1 gap-6">
        {[
          { place: 'The Leela Palace, Udaipur', rating: 5, date: 'May 2024', comment: 'Exceptional hospitality. The lake view is unmatched in India.' },
          { place: 'Fort Tiracol Heritage Hotel', rating: 4, date: 'Mar 2024', comment: 'A hidden gem in North Goa. Quiet, historic, and beautiful.' },
        ].map((r, i) => (
          <Card key={i} className="flex gap-6">
            <div className="w-24 h-24 bg-[#8B1A1A]/5 rounded-2xl flex items-center justify-center shrink-0">
               <Star size={32} className="text-[#F5A623]" fill="currentColor" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-bold text-[#8B1A1A]">{r.place}</h4>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={14} className={idx < r.rating ? "text-[#F5A623] fill-current" : "text-[#E8DCC4]"} />
                  ))}
                </div>
              </div>
              <p className="text-xs text-[#8B1A1A]/40 mt-1">Reviewed on {r.date}</p>
              <p className="text-sm text-[#8B1A1A]/80 mt-3 italic">"{r.comment}"</p>
              <div className="mt-4 flex gap-4">
                 <button className="text-[10px] font-bold text-[#8B1A1A]/60 flex items-center gap-1"><MessageSquare size={12} /> Edit</button>
                 <button className="text-[10px] font-bold text-[#8B1A1A]/60 flex items-center gap-1 text-red-400"><Trash2 size={12} /> Delete</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </PageTransition>
);

// 8. SUSTAINABLE TRAVEL
const Sustainable = () => {
  const data = [ { name: 'Train', value: 70 }, { name: 'Flight', value: 30 } ];
  return (
    <PageTransition>
      <div className="p-8 max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-6">
  <div className="flex items-center gap-4">
    <div className="w-16 h-16 rounded-full bg-[#138808]/10 flex items-center justify-center">
      <Leaf size={32} className="text-[#138808]" />
    </div>

    <div>
      <h2 className="text-3xl font-serif font-bold text-[#138808]">
        Eco Explorer Score
      </h2>

      <p className="text-[#8B1A1A]/60">
        You're among the top 5% of sustainable travelers in India.
      </p>
    </div>
  </div>

  <div className="bg-[#138808]/10 px-5 py-3 rounded-2xl">
    <p className="text-xs uppercase tracking-wider text-[#138808] font-bold">
      Eco Rank
    </p>

    <p className="text-2xl font-bold text-[#138808]">
      #142
    </p>
  </div>
</div>


<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  {/* Eco Score */}

  <Card className="flex flex-col items-center justify-center py-10">

    <div className="relative w-44 h-44">

      <div className="absolute inset-0 flex flex-col items-center justify-center">

        <span className="text-5xl font-bold text-[#138808]">
          840
        </span>

        <span className="text-xs text-gray-500">
          /1000
        </span>

      </div>

      <svg className="w-full h-full -rotate-90">

        <circle
          cx="88"
          cy="88"
          r="75"
          stroke="#E8DCC4"
          strokeWidth="12"
          fill="none"
        />

        <circle
          cx="88"
          cy="88"
          r="75"
          stroke="#138808"
          strokeWidth="12"
          fill="none"
          strokeDasharray="471"
          strokeDashoffset="75"
          strokeLinecap="round"
        />

      </svg>

    </div>

    <p className="mt-5 text-xl font-bold text-[#138808]">
      Excellent
    </p>

    <p className="text-sm text-[#8B1A1A]/60 mt-1">
      Keep making eco-friendly choices 🌱
    </p>

  </Card>


  {/* Carbon Saved */}

  <Card className="flex flex-col justify-between p-8">

    <div>

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-xl bg-[#138808]/10 flex items-center justify-center">

          🌍

        </div>

        <div>

          <h3 className="font-bold text-[#8B1A1A]">
            Carbon Saved
          </h3>

          <p className="text-xs text-[#8B1A1A]/50">
            Compared to average travelers
          </p>

        </div>

      </div>

      <div className="mt-8">

        <h1 className="text-5xl font-bold text-[#138808]">
          126
        </h1>

        <p className="text-[#8B1A1A]/60">
          kg CO₂
        </p>

      </div>

    </div>

    <div className="mt-8 border-t pt-5">

      <div className="flex justify-between">

        <span className="text-[#8B1A1A]/60">
          Trees Equivalent
        </span>

        <span className="font-bold text-[#138808]">
          🌳 6 Trees
        </span>

      </div>

    </div>

  </Card>


  {/* Quick Stats */}

  <Card className="p-8">

    <h3 className="font-bold text-[#8B1A1A] mb-6">
      Sustainability Highlights
    </h3>

    <div className="space-y-5">

      <div className="flex justify-between items-center">

        <span>Train Journeys</span>

        <span className="font-bold text-[#138808]">
          18
        </span>

      </div>

      <div className="flex justify-between items-center">

        <span>Eco Hotels</span>

        <span className="font-bold text-[#138808]">
          9
        </span>

      </div>

      <div className="flex justify-between items-center">

        <span>Plastic Saved</span>

        <span className="font-bold text-[#138808]">
          52 Bottles
        </span>

      </div>

      <div className="flex justify-between items-center">

        <span>Green Trips</span>

        <span className="font-bold text-[#138808]">
          14
        </span>

      </div>

      <div className="flex justify-between items-center">

        <span>Eco Rating</span>

        <span className="font-bold text-[#138808]">
          ⭐ 4.9/5
        </span>

      </div>

    </div>

  </Card>

</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <Card className="md:col-span-2 p-8">

  <h3 className="font-bold text-[#8B1A1A] text-xl mb-8">
    Transport Impact & Eco Score Breakdown
  </h3>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

    <div className="h-64">

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={65}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            <Cell fill="#138808" />
            <Cell fill="#8B1A1A" />
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

    </div>

    <div className="space-y-5">

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Train Journeys</span>
          <span className="font-bold text-[#138808]">+250</span>
        </div>

        <div className="w-full h-2 rounded-full bg-[#E8DCC4]">
          <div className="w-[90%] h-full bg-[#138808] rounded-full"></div>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Eco Hotels</span>
          <span className="font-bold text-[#138808]">+180</span>
        </div>

        <div className="w-full h-2 rounded-full bg-[#E8DCC4]">
          <div className="w-[75%] h-full bg-[#138808] rounded-full"></div>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Reusable Bottle</span>
          <span className="font-bold text-[#138808]">+60</span>
        </div>

        <div className="w-full h-2 rounded-full bg-[#E8DCC4]">
          <div className="w-[45%] h-full bg-[#138808] rounded-full"></div>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Flights Taken</span>
          <span className="font-bold text-[#8B1A1A]">-120</span>
        </div>

        <div className="w-full h-2 rounded-full bg-[#E8DCC4]">
          <div className="w-[35%] h-full bg-[#8B1A1A] rounded-full"></div>
        </div>
      </div>

      <div className="mt-8 p-4 rounded-xl bg-[#138808]/5 border border-[#138808]/20">

        <p className="font-bold text-[#138808]">
          🌱 Sustainability Insight
        </p>

        <p className="text-sm text-[#8B1A1A]/70 mt-2">
          Choosing trains instead of flights saved approximately
          <span className="font-bold text-[#138808]">
            {" "}126 kg CO₂
          </span>
          on your recent trips.
        </p>

      </div>

    </div>

  </div>

</Card>

        </div>
        <section>
  <h3 className="font-serif text-2xl font-bold text-[#138808] mb-6">
    💡 Personalized Eco Tips
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {[
      {
        icon: "♻️",
        title: "Carry a Reusable Bottle",
        desc: "Avoid purchasing single-use plastic bottles while travelling.",
        impact: "Saves ~25 plastic bottles/year"
      },
      {
        icon: "🚆",
        title: "Prefer Trains Over Flights",
        desc: "For journeys under 500 km, trains reduce carbon emissions significantly.",
        impact: "Up to 80% lower CO₂"
      },
      {
        icon: "🏨",
        title: "Choose Eco-certified Stays",
        desc: "Support accommodations that use renewable energy and sustainable practices.",
        impact: "Supports Green Tourism"
      },
      {
        icon: "🥗",
        title: "Eat Local Food",
        desc: "Choose locally sourced meals to reduce transportation emissions.",
        impact: "Supports Local Communities"
      },
      {
        icon: "🚲",
        title: "Walk or Cycle",
        desc: "Explore destinations on foot or by bicycle whenever possible.",
        impact: "Zero Carbon Travel"
      },
      {
        icon: "🌳",
        title: "Offset Your Carbon",
        desc: "Contribute to verified carbon offset projects for unavoidable emissions.",
        impact: "Improves Eco Score"
      }
    ].map((tip, index) => (
      <Card
        key={index}
        className="group hover:border-[#138808] hover:shadow-lg transition-all duration-300"
      >
        <div className="flex gap-5">

          <div className="w-14 h-14 rounded-2xl bg-[#138808]/10 flex items-center justify-center text-3xl">
            {tip.icon}
          </div>

          <div className="flex-1">

            <h4 className="font-bold text-lg text-[#8B1A1A]">
              {tip.title}
            </h4>

            <p className="text-sm text-[#8B1A1A]/60 mt-2 leading-6">
              {tip.desc}
            </p>

            <span className="inline-block mt-4 px-3 py-1 rounded-full bg-[#138808]/10 text-[#138808] text-xs font-bold">
              {tip.impact}
            </span>

          </div>

        </div>
      </Card>
    ))}

  </div>
</section>
      </div>
      
    </PageTransition>
  );
};

// 9. NOTIFICATIONS
const Notifications = () => (
  <PageTransition>
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-[#8B1A1A]">Inbox</h2>
        <button className="text-xs font-bold text-[#FF6B1A]">Mark all as read</button>
      </div>
      <div className="space-y-4">
        {[
          { icon: Plane, color: 'primary', title: 'Trip Update', desc: 'Your flight to Varanasi is on schedule. Web check-in opens in 24h.', time: '2h ago' },
          { icon: Leaf, color: 'success', title: 'Sustainability Badge', desc: 'You earned the "Green Traveler" badge for choosing rail travel!', time: '1d ago' },
          { icon: ShoppingBag, color: 'gold', title: 'Exclusive Deal', desc: 'Up to 20% off on luxury heritage properties in Rajasthan.', time: '3d ago' },
        ].map((n, i) => (
          <Card key={i} className="flex gap-4 items-start hover:bg-[#F5E6D3]/30 transition-colors cursor-pointer">
            <div className={`p-3 bg-${n.color === 'primary' ? '[#FF6B1A]' : '[#138808]'}/10 text-${n.color === 'primary' ? '[#FF6B1A]' : '[#138808]'} rounded-xl`}>
              <n.icon size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[#8B1A1A] text-sm">{n.title}</h4>
              <p className="text-xs text-[#8B1A1A]/60 mt-1">{n.desc}</p>
            </div>
            <span className="text-[10px] font-bold text-[#8B1A1A]/30">{n.time}</span>
          </Card>
        ))}
      </div>
    </div>
  </PageTransition>
);

// 10. SETTINGS
const SettingsPage = () => (
  <PageTransition>
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl font-serif font-bold text-[#8B1A1A]">Settings</h2>
      
      <section className="space-y-4">
        <h3 className="text-xs font-bold text-[#8B1A1A]/40 uppercase tracking-widest px-2">Account & Security</h3>
        <Card className="divide-y divide-[#E8DCC4]">
          <div className="py-4 flex justify-between items-center">
            <div><p className="font-bold text-[#8B1A1A] text-sm">Email Address</p><p className="text-xs text-[#8B1A1A]/50">arjun.mehta@travelindepth.in</p></div>
            <Button variant="ghost" className="text-xs">Change</Button>
          </div>
          <div className="py-4 flex justify-between items-center">
            <div><p className="font-bold text-[#8B1A1A] text-sm">Password</p><p className="text-xs text-[#8B1A1A]/50">Last changed 3 months ago</p></div>
            <Button variant="ghost" className="text-xs">Update</Button>
          </div>
          <div className="py-4 flex justify-between items-center">
            <div><p className="font-bold text-[#8B1A1A] text-sm">Two-Factor Authentication</p><p className="text-xs text-[#8B1A1A]/50">Enhance your account security</p></div>
            <div className="w-10 h-5 bg-[#138808] rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-bold text-[#8B1A1A]/40 uppercase tracking-widest px-2">Preferences</h3>
        <Card className="space-y-6">
          <div className="flex justify-between items-center">
             <div className="flex items-center gap-3"><Moon size={18} className="text-[#8B1A1A]"/> <span className="text-sm font-bold">Dark Mode</span></div>
             <div className="w-10 h-5 bg-[#E8DCC4] rounded-full relative"><div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
          </div>
          <div className="flex justify-between items-center">
             <div className="flex items-center gap-3"><Bell size={18} className="text-[#8B1A1A]"/> <span className="text-sm font-bold">Email Notifications</span></div>
             <div className="w-10 h-5 bg-[#138808] rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
          </div>
        </Card>
      </section>

      <div className="pt-8 border-t border-[#E8DCC4] flex justify-between">
        <button className="text-sm font-bold text-red-500 flex items-center gap-2"><Trash2 size={16}/> Delete Account</button>
        <button className="text-sm font-bold text-[#8B1A1A] flex items-center gap-2"><Download size={16}/> Download My Data</button>
      </div>
    </div>
  </PageTransition>
);

// --- LAYOUT ---

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const items = [
    { l: 'Home', p: '/', i: Home },
  { p: '/dashboard', l: 'Dashboard', i: LayoutDashboard },
  { p: '/dashboard/profile', l: 'My Profile', i: User },
  { p: '/dashboard/trips', l: 'My Trips', i: Map },
  { p: '/dashboard/wishlist', l: 'Wishlist', i: Heart },
  { p: '/dashboard/planner', l: 'Trip Planner', i: Calendar },
  { p: '/dashboard/journal', l: 'Travel Journal', i: BookOpen },
  { p: '/dashboard/reviews', l: 'Reviews & Ratings', i: Star },
  { p: '/dashboard/sustainable', l: 'Sustainable Travel', i: Leaf },
  { p: '/dashboard/notifications', l: 'Notifications', i: Bell },
  { p: '/dashboard/settings', l: 'Settings', i: Settings },
];

  return (
    <aside
  className={`${collapsed ? "w-20" : "w-72"} bg-[#FDF6EC] border-r border-[#E8DCC4] h-screen sticky top-0 flex flex-col z-50 transition-all duration-300`}>
      <div className={`${collapsed ? "px-4 pt-6 pb-2" : "p-8 pb-4"}`}>
        
       <div className={`flex ${   collapsed ? "justify-center" : "items-center justify-between"}`}>
  <div
  className={`flex items-center ${ collapsed ? "justify-center w-full" : "gap-3" }`}>
    <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
      <img
        src="/logo.jpg"
        alt="Travel In Depth"
        className="w-full h-full object-cover scale-[1.35]"
      />
    </div>

    {!collapsed && (
      <div>
        <h1 className="font-serif text-2xl font-black text-[#8B1A1A] leading-none">
          TRAVEL
        </h1>
        <p className="text-[10px] tracking-[0.3em] font-bold text-[#8B1A1A]/60 mt-1">
          IN DEPTH
        </p>
      </div>
    )}
  </div>

  {!collapsed ? (
  <button
    onClick={() => setCollapsed(true)}
    className="w-10 h-10 rounded-xl bg-[#8B1A1A] text-white flex items-center justify-center shadow-md hover:bg-[#701515] transition-all"
  >
    ←
  </button>
) : null}
</div>
      </div>
      {collapsed && (
  <div className="flex justify-center mb-1">
    <button
      onClick={() => setCollapsed(false)}
      className="w-10 h-10 rounded-xl bg-[#8B1A1A] text-white flex items-center justify-center shadow-md hover:bg-[#701515] transition-all"
    >
      →
    </button>
  </div>
)}

       
     <nav className="flex-1 px-4 pt-2 pb-6 overflow-y-auto space-y-0 custom-scrollbar">
        {items.map(item => {
          const active = location.pathname === item.p;
          return (
            <Link key={item.p} to={item.p} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${active ? 'bg-[#8B1A1A] text-white shadow-lg' : 'text-[#8B1A1A]/70 hover:bg-[#8B1A1A]/5'}`}>
              <item.i size={18} strokeWidth={active ? 2.5 : 2} />
              {!collapsed && ( <span className="text-sm font-bold">{item.l}</span>)}
            </Link>
          );
        })}
      </nav>
      <div className="p-6 border-t border-[#E8DCC4]">
        <button className="flex items-center justify-center lg:justify-start gap-3 ...">
  <LogOut size={20} />
  {!collapsed && <span>Logout</span>}
</button>
      </div>
    </aside>
  );
};

const Topbar = () => (
  <header className="h-20 border-b border-[#E8DCC4] bg-[#FDF6EC]/80 backdrop-blur-md sticky top-0 px-8 flex items-center justify-between z-40">
    <div className="flex-1 max-w-xl relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B1A1A]/40" size={18} />
      <input type="text" placeholder="Search experiences, stays, or itineraries..." className="w-full bg-[#FFF8F0] border border-[#E8DCC4] pl-12 pr-4 py-2.5 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#FF6B1A]/20" />
    </div>
    <div className="flex items-center gap-4 pl-8 border-l border-[#E8DCC4] ml-8">
      <div className="text-right hidden md:block">
        <p className="text-sm font-bold text-[#8B1A1A]">Arjun Mehta</p>
        <p className="text-[10px] font-bold text-[#FF6B1A] uppercase tracking-tighter">Level 4: Heritage Hunter</p>
      </div>
      <div className="w-10 h-10 bg-[#8B1A1A] text-white rounded-full flex items-center justify-center font-bold font-serif">AM</div>
    </div>
  </header>
);

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [savedTrips, setSavedTrips] = useState([]);
  return(
  
    <div className="flex min-h-screen bg-[#FDF6EC] font-sans selection:bg-[#FF6B1A]/20">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="/trips" element={<MyTrips savedTrips={savedTrips}setSavedTrips={setSavedTrips}/>} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/planner" element={<TripPlanner savedTrips={savedTrips} setSavedTrips={setSavedTrips}/>} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/sustainable" element={<Sustainable />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@700;900&display=swap');
        body { font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E8DCC4; border-radius: 10px; }
      `}} />
    </div>
  
);
}

export default App;
