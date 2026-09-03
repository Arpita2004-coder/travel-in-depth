import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import Stats from '../components/stats/Stats';
import AITripPlanner from "../components/home/AITripPlanner";
import VisualDiscovery from "../components/home/VisualDiscovery";
import ExploreByMood from "../components/home/ExploreByMood";
import TrendingExperiences from "../components/home/TrendingExperiences";
import HiddenGems from "../components/home/HiddenGems";
import FestivalCalendar from "../components/home/FestivalCalendar";
import Featured from '../components/layout/Featured';
import { useAuth } from "../features/auth/useAuth";

function HomePage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <>
        <HeroSection />
        <Featured/>
        <AITripPlanner
            isLoggedIn={!!user}
            userName={user?.name}
            onLoginRequest={() => navigate('/login')}
        />
        <VisualDiscovery />
        <ExploreByMood />
        <TrendingExperiences />
        <HiddenGems/>
        <FestivalCalendar/> 
        <Stats/>
        </>
    );
}

export default HomePage;