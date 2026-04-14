import React, { createContext, useState } from 'react';

export const CityContext = createContext();

export const CityProvider = ({ children }) => {
  // Filhal data hardcoded hai, baad mein yahi se fetch(MongoDB) hoga
  const [cities] = useState([
  {
    id: 1,
    name: "Jaipur",
    slug: "jaipur",
    state: "Rajasthan",
    region: "North",
    tagline: "The Pink City of India",
    bestSeason: "Oct – Mar",
    rating: 4.8,
    budget: "₹5k – ₹20k",
    image:
      "https://images.pexels.com/photos/36418716/pexels-photo-36418716.jpeg",
    ecoOptions: ["🛺 E-Rickshaw", "🐪 Camel Ride", "🚶 Heritage Walk"],
    mapX: 38,   // % position on SVG map
    mapY: 35,
  },
  {
    id: 2,
    name: "Varanasi",
    slug: "varanasi",
    state: "Uttar Pradesh",
    region: "North",
    tagline: "City of Light & Spirituality",
    bestSeason: "Nov – Mar",
    rating: 4.7,
    budget: "₹4k – ₹15k",
    image:
      "https://images.pexels.com/photos/36565405/pexels-photo-36565405.jpeg",
    ecoOptions: ["🛶 Ganga Boat", "🚶 Ghat Walk", "🛺 E-Rickshaw"],
    mapX: 52,
    mapY: 33,
  },
  {
    id: 3,
    name: "Agra",
    slug: "agra",
    state: "Uttar Pradesh",
    region: "North",
    tagline: "Home of the Taj Mahal",
    bestSeason: "Oct – Mar",
    rating: 4.6,
    budget: "₹5k – ₹18k",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",
    ecoOptions: ["🛺 E-Rickshaw", "🚲 Cycle Tour", "🚶 Walking"],
    mapX: 46,
    mapY: 32,
  },
  {
    id: 4,
    name: "Goa",
    slug: "goa",
    state: "Goa",
    region: "West",
    tagline: "Sun, Sand & Soul",
    bestSeason: "Nov – Feb",
    rating: 4.9,
    budget: "₹6k – ₹25k",
    image:
      "https://images.pexels.com/photos/28368721/pexels-photo-28368721.jpeg",
    ecoOptions: ["🚲 Cycle Beaches", "🛺 E-Rickshaw", "🚶 Spice Walk"],
    mapX: 28,
    mapY: 58,
  },
  {
    id: 5,
    name: "Udaipur",
    slug: "udaipur",
    state: "Rajasthan",
    region: "West",
    tagline: "City of Lakes & Palaces",
    bestSeason: "Sep – Mar",
    rating: 4.8,
    budget: "₹6k – ₹22k",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80",
    ecoOptions: ["🛶 Lake Boat", "🚶 Old City Walk", "🛺 E-Rickshaw"],
    mapX: 32,
    mapY: 40,
  },
  {
    id: 6,
    name: "Mumbai",
    slug: "mumbai",
    state: "Maharashtra",
    region: "West",
    tagline: "City of Dreams & Energy",
    bestSeason: "Nov – Feb",
    rating: 4.5,
    budget: "₹8k – ₹30k",
    image:
      "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600&q=80",
    ecoOptions: ["🚇 Local Train", "🚶 Marine Drive", "🚌 BEST Bus"],
    mapX: 27,
    mapY: 53,
  },
  {
    id: 7,
    name: "Kerala",
    slug: "kerala",
    state: "Kerala",
    region: "South",
    tagline: "God's Own Country",
    bestSeason: "Sep – Mar",
    rating: 4.9,
    budget: "₹7k – ₹28k",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
    ecoOptions: ["🚤 Houseboat", "🚶 Tea Walk", "🚲 Village Cycle"],
    mapX: 32,
    mapY: 78,
  },
  {
    id: 8,
    name: "Bengaluru",
    slug: "bengaluru",
    state: "Karnataka",
    region: "South",
    tagline: "Garden City of India",
    bestSeason: "Oct – Feb",
    rating: 4.4,
    budget: "₹6k – ₹20k",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=80",
    ecoOptions: ["🚇 Metro", "🚲 Cycling", "🚌 BMTC Bus"],
    mapX: 36,
    mapY: 72,
  },
  {
    id: 9,
    name: "Kolkata",
    slug: "kolkata",
    state: "West Bengal",
    region: "East",
    tagline: "City of Joy & Culture",
    bestSeason: "Oct – Mar",
    rating: 4.6,
    budget: "₹4k – ₹15k",
    image:
      "https://i.pinimg.com/736x/73/76/34/737634298fa3cf9c29164812ac95ff79.jpg",
    ecoOptions: ["🚃 Tram Ride", "🚶 Heritage Walk", "🛺 Rickshaw"],
    mapX: 68,
    mapY: 42,
  },
  {
    id: 10,
    name: "Darjeeling",
    slug: "darjeeling",
    state: "West Bengal",
    region: "East",
    tagline: "Queen of the Hills",
    bestSeason: "Mar – May, Sep – Nov",
    rating: 4.7,
    budget: "₹5k – ₹18k",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
    ecoOptions: ["🚂 Toy Train", "🚶 Tea Garden", "🐎 Horse Ride"],
    mapX: 72,
    mapY: 32,
  },
  {
    id: 11,
    name: "Rishikesh",
    slug: "rishikesh",
    state: "Uttarakhand",
    region: "North",
    tagline: "Adventure & Yoga Capital",
    bestSeason: "Feb – May, Sep – Nov",
    rating: 4.7,
    budget: "₹4k – ₹15k",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
    ecoOptions: ["🚶 Ganga Walk", "🚲 Cycling", "🛶 River Rafting"],
    mapX: 42,
    mapY: 24,
  },
  {
    id: 12,
    name: "Hampi",
    slug: "hampi",
    state: "Karnataka",
    region: "South",
    tagline: "Ruins of a Forgotten Empire",
    bestSeason: "Oct – Feb",
    rating: 4.8,
    budget: "₹3k – ₹12k",
    image:
      "https://images.pexels.com/photos/14721497/pexels-photo-14721497.jpeg",
    ecoOptions: ["🚲 Cycling Ruins", "🛶 Coracle Boat", "🚶 Temple Walk"],
    mapX: 36,
    mapY: 65,
  }
]);

  return (
    <CityContext.Provider value={{ cities }}>
      {children}
    </CityContext.Provider>
  );
};