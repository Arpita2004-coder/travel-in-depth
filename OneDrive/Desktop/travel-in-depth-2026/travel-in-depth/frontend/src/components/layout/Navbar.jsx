import React, { useEffect, useState } from 'react'
import {Plane,Menu,X,User,Search} from 'lucide-react'
import { Link } from 'react-router-dom';

function Navbar() {
    const [isScrolled,setIsScrolled]=useState(false)
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
          <li className="hover:text-amber-500 cursor-pointer transition-colors"><Link to='/'>Home</Link></li>
          <li className="hover:text-amber-500 cursor-pointer transition-colors"><Link to='/destinations'>Destinations</Link></li>
          <li className="hover:text-amber-500 cursor-pointer transition-colors"><Link to='/experience'>Experience</Link></li>
          <li className="hover:text-amber-500 cursor-pointer transition-colors"><Link to='/about'>About</Link></li>
        </ul>

        {/* ACTIONS */}
        <div className="flex items-center gap-6 text-white">
          <Search size={18} className="cursor-pointer hover:text-amber-500 transition-colors hidden sm:block" />
          <User size={18} className="cursor-pointer hover:text-amber-500 transition-colors" />
          <button className="hidden md:block bg-amber-500 hover:bg-amber-600 text-black px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95">
            Book Trip
          </button>
          {/* Mobile Menu Icon */}
          <Menu className="md:hidden cursor-pointer" />
        </div>

      </div>
    </nav>
    )
}

export default Navbar
