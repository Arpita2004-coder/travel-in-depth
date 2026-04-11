import React from 'react'
import {Plane} from 'lucide-react'
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <>
       <footer className='bg-[#1a0a00] text-white'>

  {/* Main Section */}
  <div className='max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10 '>

    {/* Column 1 - Logo and About */}
    <div>
        <div className='flex flex-row'>
             <div className="bg-amber-500 p-2 rounded-lg group-hover:rotate-[360deg] transition-all duration-700 ml-2">
                   <Plane size={20} className="text-black" />
                 </div>
     <div className=''>
         <h2 className='ml-3 text-2xl font-bold'>
        <span className='text-white'>TRAVEL</span> <span className='text-orange-400'>IN DEPTH</span>
      </h2>
     </div>
        </div>
      <p className='mt-4 text-base text-white/60 leading-relaxed'>
        Explore the world deeply. We curate sustainable, immersive travel experiences that connect you with culture, nature, and people.
      </p>
    </div>

    {/* Column 2 - Quick Links */}
    <div>
      <h3 className='text-orange-400 font-semibold tracking-widest text-base uppercase mb-4'>Quick Links</h3>
      <ul className='space-y-2 text-sm text-white/60'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/destinations'>Destinations</Link></li>
        <li><Link to='/experience'>Experience</Link></li>
        <li><Link to='/about'>About</Link></li>
      </ul>
    </div>

    {/* Column 3 - Destinations */}
    <div>
      <h3 className='text-orange-400 font-semibold tracking-widest text-sm uppercase mb-4'>Top Destinations</h3>
      <ul className='space-y-2 text-base text-white/60'>
        <li>Manali, India</li>
        <li>Jaipur, Rajasthan</li>
        <li>Odisha, Kerla</li>
        <li>Nainital, Uttarakhand</li>
      </ul>
    </div>

    {/* Column 4 - Contact */}
    <div>
      <h3 className='text-orange-400 font-semibold tracking-widest text-sm uppercase mb-4'>Contact Us</h3>
      <ul className='space-y-2 text-base text-white/60'>
        <li><a href="mailto:av6821246@gmail.com">av6821246@gmail.com</a></li>
        <li>+91 7052501218</li>
        <li>Kanpur, Uttar Pradesh</li>
      </ul>
    </div>
    {/* Bottom Copyright section*/}


  </div>
<div className='font-medium border-t py-5 border-orange-900 text-center text-lg text-white/60'>
  © 2025 Travel In Depth. All rights reserved.
</div>
</footer>
        </>
    )
}

export default Footer;
