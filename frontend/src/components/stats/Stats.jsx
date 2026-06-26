import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Plane, Landmark, Compass } from 'lucide-react'


const stats = [
  { number: "65+", value: 65, label: "Cities Explored", Icon: MapPin },
  { number: "100+", value: 100, label: "Trips Completed", Icon: Plane },
  { number: "50+", value: 50, label: "Cultural Tours", Icon: Landmark },
]

function Stats() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  
  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 mb-2 border-t-2 border-transparent"
      style={{
        background: 'linear-gradient(135deg, #FFF8F0 0%, #FFF3E8 50%, #FDF6EC 100%)',
      }}
    >
      {/* Saffron gradient top border */}
      <div
        className="absolute top-0 left-0 w-full h-[3px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #FF6B1A 20%, #F5A623 50%, #FF6B1A 80%, transparent)',
        }}
      />

      {/* Subtle map-graticule texture (very low opacity, decorative only) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{ opacity: 0.04 }}
        preserveAspectRatio="none"
        viewBox="0 0 1200 600"
        aria-hidden="true"
      >
        <defs>
          <pattern id="mapGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M0 30 Q30 15 60 30" stroke="#8B1A1A" strokeWidth="0.6" fill="none" />
            <path d="M30 0 Q15 30 30 60" stroke="#8B1A1A" strokeWidth="0.6" fill="none" />
          </pattern>
        </defs>
        <rect width="1200" height="600" fill="url(#mapGrid)" />
      </svg>

      {/* Decorative compass — top left */}
      <Compass
        className="absolute -top-4 left-6 md:left-16 w-24 h-24 md:w-32 md:h-32 text-[#8B1A1A] pointer-events-none"
        style={{ opacity: 0.05 }}
        strokeWidth={1}
        aria-hidden="true"
      />

      {/* Decorative dotted flight path with airplane — top right */}
      <svg
        className="absolute top-10 right-0 w-72 md:w-96 h-32 pointer-events-none"
        style={{ opacity: 0.08 }}
        viewBox="0 0 400 120"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10 100 C 120 20, 220 130, 380 20"
          stroke="#FF6B1A"
          strokeWidth="2"
          strokeDasharray="6 8"
          strokeLinecap="round"
        />
      </svg>
      <Plane
        className="absolute top-12 right-6 md:right-12 w-7 h-7 text-[#FF6B1A] -rotate-45 pointer-events-none"
        style={{ opacity: 0.15 }}
        aria-hidden="true"
      />

      {/* Decorative circles + geometric shapes */}
      <div
        className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF6B1A 0%, transparent 70%)', opacity: 0.06 }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-6 right-10 w-16 h-16 border border-[#8B1A1A] rotate-45 pointer-events-none"
        style={{ opacity: 0.08 }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/3 w-3 h-3 rounded-full bg-[#F5A623] pointer-events-none"
        style={{ opacity: 0.15 }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            className="font-['Playfair_Display'] font-bold text-[#8B1A1A] text-4xl md:text-5xl leading-tight"
          >
            Explore India Through Numbers
          </h2>
          <p
            className="font-['DM_Sans'] text-[#6B5B52] text-base md:text-lg mt-4 max-w-xl mx-auto"
          >
            Thousands of unforgettable journeys across India's most beautiful destinations.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => {
            const { Icon } = stat
            return (
              <div
                key={index}
                className={`
                  group relative rounded-3xl p-10 md:p-12
                  bg-white/60 backdrop-blur-md
                  border border-[#FF6B1A]/15
                  shadow-[0_8px_30px_rgba(139,26,26,0.06)]
                  transition-all duration-300 ease-out
                  hover:-translate-y-2 hover:scale-[1.03]
                  hover:border-[#FF6B1A]
                  hover:shadow-[0_20px_45px_rgba(255,107,26,0.18)]
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{
                  transitionProperty: 'opacity, transform, box-shadow, border-color',
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
                  transitionDuration: isVisible ? '700ms' : '300ms',
                }}
              >
                {/* Icon */}
                <div
                  className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, #FF6B1A, #F5A623)' }}
                >
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>

                {/* Number */}
                <h3
                  className="font-['DM_Sans'] font-extrabold leading-none bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #FF6B1A, #F5A623)',
                    fontSize: 'clamp(48px, 6vw, 64px)',
                    textShadow: '0 2px 12px rgba(255,107,26,0.15)',
                  }}
                >
                  {stat.number}
                </h3>

                {/* Label */}
                <p className="font-['DM_Sans'] mt-3 text-[#8B1A1A] font-semibold tracking-[0.15em] text-sm uppercase">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Stats
