import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import Stats from '../components/stats/Stats';
import HowItWorks from "../components/home/HowItWorks";
import AITripPlanner from "../components/home/AITripPlanner";
import RecommendedForYou from "../components/home/RecommendedForYou";
import VisualDiscovery from "../components/home/VisualDiscovery";
import ExploreByMood from "../components/home/ExploreByMood";
import TrendingExperiences from "../components/home/TrendingExperiences";
import HiddenGems from "../components/home/HiddenGems";
import FestivalCalendar from "../components/home/FestivalCalendar";
import Testimonials from "../components/home/Testimonials";
import Featured from '../components/layout/Featured';
import { useAuth } from "../features/auth/useAuth";

function HomePage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <>
        <HeroSection />
        <Featured/>
        <HowItWorks />
        <RecommendedForYou />
        <AITripPlanner
            isLoggedIn={!!user}
            userName={user?.name}
            onLoginRequest={() => navigate('/login', { state: { from: '/#ai-trip-planner' } })}
        />
        <VisualDiscovery />
        <ExploreByMood />
        <TrendingExperiences />
        <HiddenGems/>
        <FestivalCalendar/> 
        <Testimonials />
        <Stats/>
        </>
    );
}

export default HomePage;