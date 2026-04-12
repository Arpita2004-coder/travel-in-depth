import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plane } from 'lucide-react'; // Tune login mein Plane use kiya hai, wahi yahan bhi rakhte hain

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen font-montserrat bg-[#FDF6EC] flex">
      
      {/* LEFT PANEL - Image (Matched with your Login Page style) */}
      <div className="hidden lg:block w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&q=80" 
          alt="Taj Mahal" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        <div className="absolute bottom-10 left-10 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-500 p-2 rounded-lg">
              <Plane size={18} className="text-black"/>
            </div>
            <span className="font-black text-lg uppercase tracking-wider">Travel In Depth</span>
          </div>
          <h2 className="text-4xl font-black leading-tight">
            Begin your <br />
            <span className="text-amber-400 italic">journey here.</span>
          </h2>
          <p className="mt-2 text-white/70 text-sm tracking-widest uppercase">Explore the Soul of Bharat</p>
        </div>
      </div>

      {/* RIGHT PANEL - Form */}
      <div className="w-full min-h-screen lg:w-1/2 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-amber-500 p-2 rounded-lg">
              <Plane size={20} className="text-black" />
            </div>
            <span className="text-xl font-black uppercase tracking-tighter">
              Travel <span className="text-[#FF6B1A]">In Depth</span>
            </span>
          </div>

          <h1 className="text-3xl font-black text-[#8B1A1A] uppercase mb-2">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mb-8 font-medium">
            Join our community of conscious travelers today.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Name Fields (Two columns for Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">First Name</label>
                <input 
                  type="text" name="firstName" placeholder="Arjun"
                  onChange={handleChange} required 
                  className="w-full px-4 py-3 rounded-xl border border-[#F5A623]/40 bg-white text-sm outline-none focus:border-[#FF6B1A] focus:ring-2 focus:ring-[#FF6B1A]/20 transition-all font-medium" 
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Last Name</label>
                <input 
                  type="text" name="lastName" placeholder="Sharma"
                  onChange={handleChange} required 
                  className="w-full px-4 py-3 rounded-xl border border-[#F5A623]/40 bg-white text-sm outline-none focus:border-[#FF6B1A] focus:ring-2 focus:ring-[#FF6B1A]/20 transition-all font-medium" 
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
              <input 
                type="email" name="email" placeholder="name@email.com"
                onChange={handleChange} required 
                className="w-full px-4 py-3 rounded-xl border border-[#F5A623]/40 bg-white text-sm outline-none focus:border-[#FF6B1A] focus:ring-2 focus:ring-[#FF6B1A]/20 transition-all font-medium" 
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Password</label>
              <input 
                type="password" name="password" placeholder="••••••••"
                onChange={handleChange} required 
                className="w-full px-4 py-3 rounded-xl border border-[#F5A623]/40 bg-white text-sm outline-none focus:border-[#FF6B1A] focus:ring-2 focus:ring-[#FF6B1A]/20 transition-all font-medium" 
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#FF6B1A] hover:bg-[#8B1A1A] text-white py-3.5 rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-300 active:scale-95 shadow-lg shadow-orange-500/20"
            >
              {isLoading ? "Creating..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-gray-500 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-[#FF6B1A] font-bold hover:text-[#8B1A1A] transition-colors">
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignUpPage;