import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plane } from 'lucide-react'

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className='min-h-screen font-montserrat bg-[#FDF6EC] flex'>
      {/* Left image panel - Step 2 */}
      <div className='hidden lg:block w-1/2 relative'>
  <img 
    src='/hawamahel.jpg' 
    alt='Hawa Mahal' 
    className='w-full h-full object-cover'
  />
  {/* Dark overlay */}
  <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent'></div>

  {/* Bottom text on image */}
  <div className='absolute bottom-10 left-10 text-white'>
    <div className='flex items-center gap-3 mb-4'>
      <div className='bg-amber-500 p-2 rounded-lg'>
        <Plane size={18} className='text-black'/>
      </div>
      <span className='font-black text-lg uppercase tracking-wider'>Travel In Depth</span>
    </div>
    <h2 className='text-4xl font-black leading-tight'>
      Welcome back, <br />
      <span className='text-amber-400 italic'>explorer.</span>
    </h2>
    <p className='mt-2 text-white/70 text-sm tracking-widest uppercase'>Discover Incredible India</p>
  </div>
</div>
      {/* Right form panel - Step 3 */}
      <div className='w-full min-h-screen justify-center lg:w-1/2 flex items-center justify-center px-8 py-16'>
  
  <div className='w-full max-w-md'>

    {/* Logo */}
    <div className='flex items-center gap-2 mb-8'>
      <div className='bg-amber-500 p-2 rounded-lg'>
        <Plane size={20} className='text-black' />
      </div>
      <span className='text-xl font-black uppercase tracking-tighter'>
        Travel <span className='text-[#FF6B1A]'>In Depth</span>
      </span>
    </div>

    {/* Heading */}
    <h1 className='text-3xl font-black text-[#8B1A1A] uppercase mb-2'>
      Sign In
    </h1>
    <p className='text-sm text-gray-500 mb-8'>
      Welcome back! Enter your details to continue your journey.
    </p>

    {/* Form - Step 4 */}
    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

  {/* Email */}
  <div className='flex flex-col gap-1'>
    <label className='text-xs font-bold uppercase tracking-widest text-gray-400'>
      Email
    </label>
    <input
      type='email'
      name='email'
      value={formData.email}
      onChange={handleChange}
      placeholder='name@email.com'
      className='w-full px-4 py-3 rounded-xl border border-[#F5A623]/40 bg-white text-sm outline-none focus:border-[#FF6B1A] focus:ring-2 focus:ring-[#FF6B1A]/20 transition-all'
      required
    />
  </div>

  {/* Password */}
  <div className='flex flex-col gap-1'>
    <label className='text-xs font-bold uppercase tracking-widest text-gray-400'>
      Password
    </label>
    <input
      type='password'
      name='password'
      value={formData.password}
      onChange={handleChange}
      placeholder='••••••••'
      className='w-full px-4 py-3 rounded-xl border border-[#F5A623]/40 bg-white text-sm outline-none focus:border-[#FF6B1A] focus:ring-2 focus:ring-[#FF6B1A]/20 transition-all'
      required
    />
  </div>

  {/* Forgot Password */}
  <div className='text-right'>
    <Link to='/forgot-password' className='text-xs text-[#FF6B1A] hover:text-[#8B1A1A] transition-colors font-bold uppercase tracking-widest'>
      Forgot Password?
    </Link>
  </div>

  {/* Submit Button */}
  <button
    type='submit'
    className='w-full bg-[#FF6B1A] hover:bg-[#8B1A1A] text-white py-3 rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-300 active:scale-95'
  >
    Sign In
  </button>

  {/* Signup Link */}
  <p className='text-center text-sm text-gray-500'>
    Don't have an account?{' '}
    <Link to='/signup' className='text-[#FF6B1A] font-bold hover:text-[#8B1A1A] transition-colors'>
      Sign Up
    </Link>
  </p>

</form>

  </div>

</div>
    </div>
  )
}

export default LoginPage;