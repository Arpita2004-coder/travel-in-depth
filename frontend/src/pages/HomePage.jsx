import React from 'react'
import HeroSection from '../components/home/HeroSection'
import Featured from '../components/layout/Featured';
import Stats from '../components/stats/Stats';
function HomePage() {
    return (
        <>
        <HeroSection />
        <Featured/>
        <Stats/>
        </>
    )
}

export default HomePage;
