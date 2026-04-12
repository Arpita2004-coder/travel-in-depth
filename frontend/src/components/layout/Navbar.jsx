import React, { useEffect, useState } from 'react'
import {Plane,Menu,X,User,Search} from 'lucide-react'
import { Link } from 'react-router-dom';

function Navbar() {
    const [isScrolled,setIsScrolled]=useState(false);
    const [isOpened,setIsOpened]=useState(false);
    const [isLoggedIn,setIsLoggedIn]=useState(false);
    useEffect(()=>{
        const handleScroll=()=>{
            setIsScrolled(window.scrollY>50);
        };
        window.addEventListener('scroll',handleScroll);
        return ()=>{window.removeEventListener('scroll',handleScroll)};
    },[]);
    return (
       <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 py-4 md:px-12 ${
      isScrolled ? 'bg-orange-500/80 backdrop-blur-xl py-3 border-b border-white/10' : 'bg-gray-800'
    }`}> 
      <div className="max-w-8xl mx-auto p-2 flex justify-between items-center h-12">
        
        {/* plane logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="bg-amber-500 p-2.5 rounded-lg group-hover:rotate-[360deg] transition-all duration-700 ml-2">
            <Plane size={20} className="text-black" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase">
            Travel <span className={` ${isScrolled?'tracking-[0.1em] duration-300 text-black':'text-amber-500'}`}>In Depth</span>
          </span>
        </div>

        {/* navlinks */}
        <ul className="hidden md:flex items-center gap-8 text-[13px] font-bold tracking-[0.2em] text-white/80 uppercase">
          <li className="hover:text-[#8B1A1A] cursor-pointer transition-colors"><Link to='/'>Home</Link></li>
          <li className="hover:text-[#8B1A1A] cursor-pointer transition-colors"><Link to='/destinations'>Destinations</Link></li>
          <li className="hover:text-[#8B1A1A] cursor-pointer transition-colors"><Link to='/experience'>Experience</Link></li>
          <li className="hover:text-[#8B1A1A] cursor-pointer transition-colors"><Link to='/about'>About</Link></li>
        </ul>

        {/* ACTIONS */}
        <div className="flex items-center gap-6 text-white">
          <Search size={18} className="cursor-pointer hover:text-amber-500 transition-colors hidden sm:block" />
          {/* {Login User rendering section} */}
          {isLoggedIn ? (
  <div className="flex items-center gap-2 cursor-pointer hover:text-amber-500 transition-colors">
    <User size={18} className='text-green-400'/>
    <span className="text-sm font-bold hidden md:block text-green-400">Profile</span>
  </div>
) : (
  <Link to='/login'>
    <button className="bg-transparent border border-white text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
      Login
    </button>
  </Link>
)}
          <button className="hidden md:block bg-amber-500 hover:bg-amber-600 text-black px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95">
            Book Trip
          </button>

          {/* Mobile Menu Icon */}
          <div className="md:hidden cursor-pointer hover:text-amber-500" onClick={()=>{setIsOpened(!isOpened)}}>
            {isOpened? <X size={22}/>:<Menu size={22} />}
          </div>
        </div>

      </div>
      {isOpened && (
  <div className={`fixed top-0 right-0 w-full h-screen ${isScrolled ? 'bg-orange-500/90 backdrop-blur-xl' : 'bg-gray-900'} z-[-1] transition-all duration-300`}>
    <div className='flex flex-col items-center justify-center gap-10 h-full w-full px-6 py-20 text-white text-sm font-bold uppercase tracking-widest'>
      
      <Link 
        to='/' 
        onClick={() => setIsOpened(false)} 
        className={`pb-2 ${isScrolled ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-600/65 to-amber-600/65' : 'text-white'}`}
      >
        Home
      </Link>
      
      <Link to='/destinations' onClick={() => setIsOpened(false)} className={isScrolled ? 'text-white/80' : 'text-white'}>
        Destinations
      </Link>
      
      <Link to='/experience' onClick={() => setIsOpened(false)} className={isScrolled ? 'text-white/80' : 'text-white'}>
        Experience
      </Link>
      
      <Link to='/about' onClick={() => setIsOpened(false)} className={isScrolled ? 'text-white/80' : 'text-white'}>
        About
      </Link>
      {isLoggedIn ? (
  <div className="flex items-center gap-2 cursor-pointer hover:text-amber-500 transition-colors">
    <User size={18} />
    <span>Profile</span>
  </div>
) : (
  <Link to='/login' onClick={() => setIsOpened(false)}>
    <button className="bg-transparent border border-white text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all w-fit">
      Login
    </button>
  </Link>
)}
      <button className="bg-amber-500 text-black px-8 py-3 rounded-full text-[12px] font-black uppercase tracking-widest w-fit shadow-xl transition-all duration-300 hover:scale-105 hover:bg-amber-400">
        Book Trip
      </button>

    </div>
  </div>
)}
    </nav>
    
    )
}

export default Navbar
