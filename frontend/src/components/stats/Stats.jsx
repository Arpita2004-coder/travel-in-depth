import React from 'react'

const stats = [
  { number: "65+", label: "Cities Explored" },
  { number: "100+", label: "Trips Completed" },
  { number: "50+", label: "Cultural Tours" },
]

function Stats() {
  return (
    <section className='bg-[#FFF8F0] border-t-2 border-[#FF6B1A] py-16 mb-2 rounded-lg'>
  <div className='max-w-7xl mx-auto px-6'>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
      {stats.map((stat, index) => (
        <div key={index}>
          <h3 className='text-5xl font-black text-[#FF6B1A]'>{stat.number}</h3>
          <p className='mt-2 text-[#8B1A1A] font-semibold tracking-widest text-sm uppercase'>{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
  
</section>

  )
}

export default Stats