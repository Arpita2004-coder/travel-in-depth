import React, { useEffect, useState } from 'react'
function HeroSection() {
    const vid=['/videos/v1.mp4','/videos/v2.mp4','/videos/v3.mp4','/videos/v4.mp4'];
    const [currentIndex,setCurrentIndex]=useState(0);

    useEffect(()=>{
       const interval= setInterval(()=>{
            setCurrentIndex((prevIndex)=>(prevIndex+1)%vid.length);
        },5000);
        return ()=>clearInterval(interval);
    },[vid.length]);
    return (
        <div className='relative w-full h-screen overflow-hidden '>
            {vid.map((videoPath, index) => (
                <video
                    key={index}
                    src={videoPath}
                    autoPlay
                    loop
                    muted
                    playsInline
                    /* 2. Transition aur Opacity ka khel yahan hai */
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`} />
                    
                    ))}
                   <div className='inset-1 absolute z-10 '>
                     <div className='flex flex-col justify-center items-center h-full z-20'>
                     <h1 className="text-4xl md:text-7xl font-black text-white/65 uppercase tracking-tighter max-w-5xl leading-[0.9] font-syne">Lose Yourself in the <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400/65 to-amber-600/65 italic">Journey
    </span>
  </h1>
 <p className="mt-6 text-sm font-medium text-white/67 tracking-[0.3em] uppercase max-2xl md:text-lg font-montserrat">
            Find Yourself in the World
        </p>
        <button className='tracking-[0.2em] mt-10 px-10 py-4 rounded-full h-15 font-medium text-[10px] font-black uppercase text-sm md:text-lg text-black rounded-lg bg-white/65 hover:bg-amber-400/45 hover:scale-105  hover:text-white transition-all duration-300 active:scale-95 transform '>Explore Now</button>
                  
    </div><div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-[6px] h-12 bg-gradient-to-b from-white to-transparent"></div>
                   </div>
                   </div>
            
        </div>
        
    )
}

export default HeroSection;
