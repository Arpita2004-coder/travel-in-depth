import React from 'react'
import HeroSection from '../components/home/HeroSection'
// import FeaturedDestinations from "../components/home/FeaturedDestinations";
import Stats from '../components/stats/Stats';
import AITripPlanner from "../components/home/AITripPlanner";
import VisualDiscovery from "../components/home/VisualDiscovery";
import ExploreByMood from "../components/home/ExploreByMood";
import TrendingExperiences from "../components/home/TrendingExperiences";
import HiddenGems from "../components/home/HiddenGems";
import FestivalCalendar from "../components/home/FestivalCalendar";
import FinalCTA from "../components/home/FinalCTA";
import Featured from '../components/layout/Featured';
function HomePage() {
    return (
        <>
        <HeroSection />
        <Featured/>
        <AITripPlanner />
        <VisualDiscovery />
        <ExploreByMood />
        <TrendingExperiences />
        <HiddenGems/>
        <FestivalCalendar/> 
        <Stats/>
        </>
    )
}

export default HomePage;
