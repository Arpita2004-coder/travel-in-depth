import React, { useEffect, useRef, useState } from 'react';

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

.vd-section {
  padding: 100px 0 0;
  background: #FDF6EC;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
  position: relative;
}
.vd-section::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 120px;
  background: linear-gradient(180deg, rgba(45,27,0,0.06) 0%, transparent 100%);
  pointer-events: none;
}

.vd-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.vd-hdr {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 44px;
  flex-wrap: wrap;
  gap: 20px;
}
.vd-hdr-left {}
.vd-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #FF6B1A;
  margin-bottom: 12px;
}
.vd-eyebrow::before { content: ''; display: block; width: 24px; height: 1px; background: #FF6B1A; }
.vd-h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 700;
  color: #2D1B00;
  line-height: 1.15;
  margin: 0;
}
.vd-h2 em { font-style: italic; color: #8B1A1A; }
.vd-nav-btns {
  display: flex;
  gap: 12px;
  align-items: center;
}
.vd-nav-btn {
  width: 48px; height: 48px;
  border-radius: 50%;
  border: 1.5px solid rgba(45,27,0,0.15);
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px rgba(45,27,0,0.08);
  color: #2D1B00;
}
.vd-nav-btn:hover {
  background: #FF6B1A;
  border-color: #FF6B1A;
  color: #fff;
  transform: scale(1.08);
  box-shadow: 0 8px 24px rgba(255,107,26,0.35);
}

/* Scroll track */
.vd-track-wrap {
  position: relative;
  overflow: hidden;
  margin: 0 -40px;
  padding: 0 40px 60px;
}
.vd-track-wrap::before,
.vd-track-wrap::after {
  content: '';
  position: absolute;
  top: 0; bottom: 60px;
  width: 80px;
  z-index: 5;
  pointer-events: none;
}
.vd-track-wrap::before { left: 0; background: linear-gradient(90deg, #FDF6EC 0%, transparent 100%); }
.vd-track-wrap::after  { right: 0; background: linear-gradient(270deg, #FDF6EC 0%, transparent 100%); }

.vd-track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 10px 40px 10px;
  transition: scroll 0.4s ease;
}
.vd-track::-webkit-scrollbar { display: none; }

/* Card */
.vd-card {
  flex-shrink: 0;
  scroll-snap-align: start;
  width: 280px;
  border-radius: 22px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  background: #1a0a00;
  box-shadow: 0 12px 40px rgba(45,27,0,0.15);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.vd-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 28px 64px rgba(45,27,0,0.22);
}

/* Tall + short cards */
.vd-card.tall  { height: 420px; }
.vd-card.short { height: 340px; }
.vd-card.wide  { width: 340px; height: 420px; }

.vd-card-media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.vd-card-img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
  position: absolute;
  inset: 0;
}
.vd-card:hover .vd-card-img { transform: scale(1.07); }

/* Hover preview video, layered above the still image */
.vd-card-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.45s ease;
  pointer-events: none;
}
.vd-card:hover .vd-card-video {
  opacity: 1;
}

/* Gradient overlay */
.vd-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 30%,
    rgba(45,27,0,0.25) 60%,
    rgba(45,27,0,0.85) 100%
  );
}

/* Play button */
.vd-play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.85);
  width: 52px; height: 52px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  opacity: 0;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 2;
}
.vd-card:hover .vd-play-btn {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

/* Location badge */
.vd-location-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(253,246,236,0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(253,246,236,0.25);
  padding: 6px 12px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 600;
  color: #FDF6EC;
  letter-spacing: 0.05em;
  z-index: 2;
}
.vd-location-dot {
  width: 6px; height: 6px;
  background: #FF6B1A;
  border-radius: 50%;
  animation: vd-blink 2s ease-in-out infinite;
}
@keyframes vd-blink {
  0%,100%{opacity:1;} 50%{opacity:0.3;}
}

/* Trending badge */
.vd-trending-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: linear-gradient(135deg, #FF6B1A, #F5A623);
  padding: 4px 10px;
  border-radius: 99px;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  z-index: 2;
}

/* Card content */
.vd-card-content {
  position: absolute;
  bottom: 0;
  left: 0; right: 0;
  padding: 24px 20px;
  z-index: 2;
}
.vd-card-tag {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(245,166,35,0.9);
  margin-bottom: 6px;
}
.vd-card-title {
  font-family: 'Playfair Display', serif;
  font-size: 18px;
  font-weight: 700;
  color: #FDF6EC;
  line-height: 1.3;
  margin-bottom: 8px;
}
.vd-card-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}
.vd-card-views {
  font-size: 12px;
  color: rgba(253,246,236,0.6);
  display: flex;
  align-items: center;
  gap: 4px;
}
.vd-card-duration {
  font-size: 11px;
  font-weight: 600;
  color: rgba(245,166,35,0.8);
  margin-left: auto;
  background: rgba(245,166,35,0.12);
  padding: 3px 8px;
  border-radius: 99px;
}

/* Bottom scroll bar */
.vd-scroll-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 40px 40px;
}
.vd-scroll-track {
  flex: 1;
  max-width: 300px;
  height: 3px;
  background: rgba(45,27,0,0.1);
  border-radius: 99px;
  overflow: hidden;
}
.vd-scroll-thumb {
  height: 100%;
  background: linear-gradient(90deg, #FF6B1A, #F5A623);
  border-radius: 99px;
  transition: width 0.3s ease;
  min-width: 40px;
}
.vd-scroll-text {
  font-size: 12px;
  color: rgba(45,27,0,0.4);
  font-weight: 500;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

/* Divider wave at bottom */
.vd-wave {
  display: block;
  width: 100%;
  height: 80px;
  margin-top: -2px;
}

/* Fullscreen video modal */
.vd-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(20,10,0,0.88);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 32px;
  animation: vd-fade-in 0.25s ease;
}
@keyframes vd-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.vd-modal-content {
  position: relative;
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  border-radius: 20px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 40px 100px rgba(0,0,0,0.5);
  animation: vd-pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes vd-pop-in {
  from { opacity: 0; transform: scale(0.92) translateY(16px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.vd-modal-video {
  display: block;
  width: 100%;
  max-height: 90vh;
  background: #000;
}
.vd-modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 38px; height: 38px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  z-index: 3;
}
.vd-modal-close:hover {
  background: #FF6B1A;
  transform: scale(1.08);
}
.vd-modal-info {
  position: absolute;
  bottom: 0;
  left: 0; right: 0;
  padding: 18px 20px;
  background: linear-gradient(180deg, transparent, rgba(0,0,0,0.85));
  pointer-events: none;
}
.vd-modal-info .vd-card-tag,
.vd-modal-info .vd-card-title {
  margin-bottom: 4px;
}
.vd-modal-loc {
  font-size: 12px;
  color: rgba(253,246,236,0.7);
}

@media (max-width: 768px) {
  .vd-container { padding: 0 20px; }
  .vd-track { padding: 10px 20px 10px; }
  .vd-track-wrap { margin: 0 -20px; padding: 0 20px 60px; }
  .vd-card.tall, .vd-card.wide { height: 360px; }
  .vd-card.short { height: 300px; }
  .vd-card, .vd-card.wide { width: 240px; }
  .vd-nav-btns { display: none; }
  .vd-modal-content { max-width: 100%; }
}
`;

// NOTE: "video" fields below are placeholder sample clips (public domain test
// videos) so hover-preview + the fullscreen player work out of the box.
// Swap each one for your real reel file/URL when ready — nothing else in
// the component needs to change.
const REELS = [
  { id:1, tag:'Monsoon Magic', title:'Backwaters of Kerala at Dawn', location:'Alleppey, Kerala', views:'128K', duration:'2:34', trending:true,  size:'tall',
    img:'https://plus.unsplash.com/premium_photo-1697729438401-fcb4ff66d9a8?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja3dhdGVycyUyMG9mJTIwa2VyZWxhfGVufDB8fDB8fHww',
    video:'/videos/KerelaBackwaters.mp4' },
  { id:2, tag:'Desert Dreams', title:'Camel Trails of the Thar Desert', location:'Jaisalmer, Rajasthan', trending:false, size:'short',
    img:'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d7/cf/f4.jpg',
    video:'/videos/CamelTrails.mp4' },
  { id:3, tag:'Mountain High', title:'First Light over Pangong Lake', location:'Ladakh, J&K', views:'213K', duration:'3:12', trending:true,  size:'wide',
    img:'https://thumbs.dreamstime.com/b/sunrise-pangong-ladakh-1574884.jpg',
    video:'/videos/PangongLake.mp4' },
  { id:4, tag:'Sacred Waters', title:'Ganga Aarti at Dashashwamedh Ghat', location:'Varanasi, UP', views:'175K', duration:'4:05', trending:true,  size:'tall',
    img:'https://wanderershahi.com/wp-content/uploads/2024/04/Varanasi-Gnaga-Aarti.jpg',
    video:'/videos/varanasi-ganga-aarti.mp4' },
  { id:5, tag:'Coastal Bliss', title:'Hidden Coves of Gokarna', location:'Gokarna, Karnataka', views:'67K', duration:'2:20', trending:false, size:'short',
    img:'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/53/5e/7f/om-beach.jpg?w=500&h=500&s=1',
    video:'/videos/Hidden-Coves-Gokarna.mp4' },
  { id:6, tag:'Living Roots', title:'Meghalaya\'s Root Bridges in Rain', location:'Cherrapunji, Meghalaya', views:'88K', duration:'2:47', trending:true,  size:'tall',
    img:'https://res.cloudinary.com/roundglass/image/upload/f_auto/v1649765953/rg/collective/media/meghalaya-nongriat-double-decker-living-root-bridge-greenery-people-ashwin-ezhumalai_mmdvms.jpg',
    video:'/videos/Meghalaya-Bridges-Rain.mp4' },
  { id:7, tag:'Heritage Trail', title:'Hampi\'s Ruins at Golden Hour', location:'Hampi, Karnataka', views:'102K', duration:'3:30', trending:false, size:'short',
    img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2We8NGMJoXW477Z__WckIVhMnyHb6eIR6sA&s',
    video:'/videos/Hampi-Golden-Hour.mp4' },
  { id:8, tag:'Snow Peaks', title:'Spiti Valley\'s Last Village', location:'Hikkim, Himachal', views:'59K', duration:'2:10', trending:false, size:'wide',
    img:'https://himachaltourism.gov.in/wp-content/uploads/2018/01/Dhankar-Monestry-Lahaul-Spiti-min.jpg',
    video:'/videos/SpitiValley.mp4' },
];

export default function VisualDiscovery() {
  const trackRef = useRef(null);
  const videoRefs = useRef({});
  const [scrollPct, setScrollPct] = useState(0);
  const [activeReel, setActiveReel] = useState(null);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const pct = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    setScrollPct(Math.min(100, Math.round(pct * 100)));
  };

  const scroll = dir => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  // Hover-preview: play the muted clip on enter, reset on leave so the
  // poster image is back in view next time.
  const handleHoverEnter = (id) => {
    const v = videoRefs.current[id];
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };
  const handleHoverLeave = (id) => {
    const v = videoRefs.current[id];
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  // Fullscreen modal: open with sound + controls, close on Escape, and
  // lock background scroll while it's open.
  const openReel = (reel) => setActiveReel(reel);
  const closeReel = () => setActiveReel(null);

  useEffect(() => {
    if (!activeReel) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeReel();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeReel]);

  const thumbWidth = Math.max(15, 100 - scrollPct * 0.6);

  return (
    <>
      <style>{css}</style>
      <section className="vd-section">
        <div className="vd-container">
          <div className="vd-hdr">
            <div className="vd-hdr-left">
              <div className="vd-eyebrow">Visual Stories</div>
              <h2 className="vd-h2">Discover India Through<br/><em>Cinematic Reels</em></h2>
            </div>
            <div className="vd-nav-btns">
              <button className="vd-nav-btn" onClick={() => scroll(-1)} aria-label="Scroll left">←</button>
              <button className="vd-nav-btn" onClick={() => scroll(1)} aria-label="Scroll right">→</button>
            </div>
          </div>
        </div>

        <div className="vd-track-wrap">
          <div className="vd-track" ref={trackRef} onScroll={handleScroll}>
            {REELS.map(r => (
              <div
                key={r.id}
                className={`vd-card ${r.size}`}
                onClick={() => openReel(r)}
                onMouseEnter={() => handleHoverEnter(r.id)}
                onMouseLeave={() => handleHoverLeave(r.id)}
                role="button"
                tabIndex={0}
                aria-label={`Play ${r.title}`}
                onKeyDown={(e) => { if (e.key === 'Enter') openReel(r); }}
              >
                <div className="vd-card-media">
                  <img src={r.img} alt={r.title} className="vd-card-img" loading="lazy"/>
                  <video
                    ref={el => (videoRefs.current[r.id] = el)}
                    className="vd-card-video"
                    src={r.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                </div>
                <div className="vd-card-overlay"/>
                <div className="vd-play-btn">▶</div>

                <div className="vd-location-badge">
                  <div className="vd-location-dot"/>
                  {r.location}
                </div>

                {r.trending && <div className="vd-trending-badge">🔥 Trending</div>}

                <div className="vd-card-content">
                  <div className="vd-card-tag">{r.tag}</div>
                  <div className="vd-card-title">{r.title}</div>
                  <div className="vd-card-meta">
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="vd-scroll-indicator">
          <span className="vd-scroll-text">Scroll to explore</span>
          <div className="vd-scroll-track">
            <div className="vd-scroll-thumb" style={{ width: `${thumbWidth}%`, marginLeft: `${scrollPct * 0.85}%` }}/>
          </div>
          <span className="vd-scroll-text">{scrollPct}%</span>
        </div>

        <svg className="vd-wave" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#2D1B00" opacity="0.04"/>
          <path d="M0,55 C480,15 960,75 1440,35 L1440,80 L0,80 Z" fill="#FF6B1A" opacity="0.04"/>
        </svg>
      </section>

      {activeReel && (
        <div className="vd-modal-backdrop" onClick={closeReel}>
          <div className="vd-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="vd-modal-close" onClick={closeReel} aria-label="Close video">✕</button>
            <video
              className="vd-modal-video"
              src={activeReel.video}
              poster={activeReel.img}
              autoPlay
              controls
              playsInline
            />
            <div className="vd-modal-info">
              <div className="vd-card-tag">{activeReel.tag}</div>
              <div className="vd-card-title">{activeReel.title}</div>
              <div className="vd-modal-loc">{activeReel.location}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
