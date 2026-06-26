import React, { useState } from 'react';

/* ─── Styles ────────────────────────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

.atp-section {
  position: relative;
  padding: 100px 0 120px;
  background: linear-gradient(160deg,#1a0a00 0%,#2D1B00 40%,#3d2000 70%,#1a0a00 100%);
  overflow: hidden;
  font-family: 'DM Sans',sans-serif;
}
.atp-section::before {
  content:'';position:absolute;inset:0;
  background:
    radial-gradient(ellipse 60% 50% at 20% 50%,rgba(255,107,26,.12) 0%,transparent 70%),
    radial-gradient(ellipse 50% 60% at 80% 30%,rgba(139,26,26,.15) 0%,transparent 70%);
  pointer-events:none;
}
.atp-orb {
  position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;
  animation:atp-drift 12s ease-in-out infinite alternate;
}
.atp-orb-1{width:400px;height:400px;background:rgba(255,107,26,.08);top:-100px;left:-80px;}
.atp-orb-2{width:300px;height:300px;background:rgba(245,166,35,.07);bottom:-60px;right:10%;animation-delay:-5s;}
.atp-orb-3{width:200px;height:200px;background:rgba(139,26,26,.1);top:40%;right:20%;animation-delay:-9s;}
@keyframes atp-drift{from{transform:translate(0,0) scale(1);}to{transform:translate(30px,-40px) scale(1.1);}}

.atp-wrap{max-width:1100px;margin:0 auto;padding:0 24px;position:relative;z-index:2;}

.atp-hdr{text-align:center;margin-bottom:56px;}
.atp-eyebrow{
  display:inline-flex;align-items:center;gap:10px;
  font-size:11px;font-weight:600;letter-spacing:.3em;text-transform:uppercase;
  color:#F5A623;margin-bottom:18px;
}
.atp-eyebrow::before,.atp-eyebrow::after{content:'';display:block;width:30px;height:1px;}
.atp-eyebrow::before{background:linear-gradient(90deg,transparent,#F5A623);}
.atp-eyebrow::after{background:linear-gradient(90deg,#F5A623,transparent);}
.atp-h2{
  font-family:'Playfair Display',serif;
  font-size:clamp(32px,5vw,52px);font-weight:700;color:#FDF6EC;line-height:1.15;margin:0 0 16px;
}
.atp-h2 em{font-style:italic;color:#FF6B1A;}
.atp-sub{font-size:16px;color:rgba(253,246,236,.6);max-width:500px;margin:0 auto;line-height:1.7;}

/* ── LOCKED ── */
.atp-locked-wrapper{position:relative;border-radius:28px;overflow:hidden;}
.atp-locked-blur{filter:blur(6px);pointer-events:none;user-select:none;opacity:.45;}
.atp-mock-card{
  background:rgba(253,246,236,.04);border:1px solid rgba(245,166,35,.15);
  border-radius:28px;padding:40px 48px;
}
.atp-mock-row{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:20px;}
.atp-mock-field{height:52px;background:rgba(253,246,236,.06);border-radius:12px;border:1px solid rgba(245,166,35,.1);}
.atp-mock-row2{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-bottom:24px;}
.atp-mock-chip{height:40px;background:rgba(255,107,26,.08);border-radius:99px;border:1px solid rgba(255,107,26,.15);}
.atp-mock-btn{height:56px;background:linear-gradient(135deg,rgba(255,107,26,.3),rgba(139,26,26,.3));border-radius:14px;width:220px;margin:0 auto;}

.atp-lock-overlay{
  position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;
  background:rgba(45,27,0,.6);backdrop-filter:blur(2px);
  border-radius:28px;border:1px solid rgba(245,166,35,.2);padding:40px 24px;z-index:10;
}
.atp-lock-icon{
  width:72px;height:72px;background:linear-gradient(135deg,#FF6B1A,#8B1A1A);
  border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-size:28px;margin-bottom:24px;
  box-shadow:0 0 40px rgba(255,107,26,.35);
  animation:atp-pulse 3s ease-in-out infinite;
}
@keyframes atp-pulse{0%,100%{box-shadow:0 0 40px rgba(255,107,26,.35);}50%{box-shadow:0 0 70px rgba(255,107,26,.6);}}
.atp-lock-title{font-family:'Playfair Display',serif;font-size:26px;font-weight:700;color:#FDF6EC;margin-bottom:10px;text-align:center;}
.atp-lock-text{font-size:15px;color:rgba(253,246,236,.65);text-align:center;max-width:380px;line-height:1.65;margin-bottom:32px;}
.atp-lock-btns{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;}
.atp-btn-login{
  padding:14px 36px;background:linear-gradient(135deg,#FF6B1A,#cc4f00);
  color:#fff;border:none;border-radius:99px;font-size:14px;font-weight:600;
  letter-spacing:.05em;cursor:pointer;transition:all .3s;
  box-shadow:0 8px 30px rgba(255,107,26,.4);
}
.atp-btn-login:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(255,107,26,.55);}
.atp-btn-signup{
  padding:14px 36px;background:transparent;color:#FDF6EC;
  border:1px solid rgba(253,246,236,.3);border-radius:99px;
  font-size:14px;font-weight:600;letter-spacing:.05em;cursor:pointer;transition:all .3s;
}
.atp-btn-signup:hover{background:rgba(253,246,236,.08);border-color:rgba(253,246,236,.5);transform:translateY(-2px);}
.atp-perks{display:flex;gap:20px;justify-content:center;margin-top:20px;flex-wrap:wrap;}
.atp-perk{display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(245,166,35,.8);}

/* ── UNLOCKED CARD ── */
.atp-card{
  background:rgba(253,246,236,.04);border:1px solid rgba(245,166,35,.18);
  border-radius:28px;padding:48px 52px;backdrop-filter:blur(20px);
  box-shadow:0 40px 80px rgba(0,0,0,.4),inset 0 1px 0 rgba(245,166,35,.1);
}
.atp-greeting{
  display:flex;align-items:center;gap:14px;margin-bottom:36px;
  padding-bottom:28px;border-bottom:1px solid rgba(245,166,35,.12);
}
.atp-avatar{
  width:48px;height:48px;background:linear-gradient(135deg,#FF6B1A,#8B1A1A);
  border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;
}
.atp-gname{font-family:'Playfair Display',serif;font-size:17px;color:#FDF6EC;font-weight:600;}
.atp-gsub{font-size:13px;color:rgba(245,166,35,.8);margin-top:2px;}
.atp-badge{
  font-size:11px;color:rgba(253,246,236,.5);letter-spacing:.15em;text-transform:uppercase;
  background:rgba(253,246,236,.05);padding:6px 14px;border-radius:99px;border:1px solid rgba(253,246,236,.1);
}
.atp-label{
  font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;
  color:rgba(245,166,35,.8);margin-bottom:12px;display:block;
}
.atp-dest-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;margin-bottom:32px;}
.atp-dest-chip{
  padding:10px 16px;background:rgba(253,246,236,.05);border:1px solid rgba(253,246,236,.1);
  border-radius:10px;color:rgba(253,246,236,.7);font-size:13px;cursor:pointer;
  transition:all .25s;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;
}
.atp-dest-chip:hover{background:rgba(255,107,26,.12);border-color:rgba(255,107,26,.3);color:#FDF6EC;transform:translateY(-1px);}
.atp-dest-chip.sel{background:rgba(255,107,26,.2);border-color:#FF6B1A;color:#FF6B1A;font-weight:600;}

.atp-row2{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:32px;}
.atp-slider-val{font-family:'Playfair Display',serif;font-size:22px;color:#FF6B1A;font-weight:700;margin-bottom:8px;}
.atp-slider{
  -webkit-appearance:none;appearance:none;width:100%;height:4px;
  background:linear-gradient(90deg,#FF6B1A var(--pct,40%),rgba(253,246,236,.1) var(--pct,40%));
  border-radius:99px;outline:none;cursor:pointer;
}
.atp-slider::-webkit-slider-thumb{
  -webkit-appearance:none;width:22px;height:22px;
  background:linear-gradient(135deg,#FF6B1A,#F5A623);
  border-radius:50%;box-shadow:0 4px 16px rgba(255,107,26,.5);cursor:pointer;transition:transform .15s;
}
.atp-slider::-webkit-slider-thumb:hover{transform:scale(1.2);}
.atp-slider-labs{display:flex;justify-content:space-between;margin-top:8px;font-size:11px;color:rgba(253,246,236,.4);}
.atp-select{
  width:100%;padding:14px 18px;background:rgba(253,246,236,.05);
  border:1px solid rgba(253,246,236,.12);border-radius:12px;
  color:#FDF6EC;font-size:14px;font-family:'DM Sans',sans-serif;
  cursor:pointer;outline:none;-webkit-appearance:none;appearance:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23F5A623' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 16px center;transition:border-color .2s;
}
.atp-select option{background:#2D1B00;}
.atp-select:focus{border-color:rgba(255,107,26,.5);}
.atp-interests{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:36px;}
.atp-int-chip{
  padding:8px 18px;background:rgba(253,246,236,.04);border:1px solid rgba(253,246,236,.1);
  border-radius:99px;color:rgba(253,246,236,.65);font-size:13px;cursor:pointer;
  transition:all .25s;display:flex;align-items:center;gap:6px;
}
.atp-int-chip:hover{background:rgba(255,107,26,.1);border-color:rgba(255,107,26,.35);color:#FDF6EC;}
.atp-int-chip.sel{background:linear-gradient(135deg,rgba(255,107,26,.25),rgba(139,26,26,.25));border-color:#FF6B1A;color:#FF6B1A;font-weight:600;}

.atp-gen-btn{
  width:100%;padding:18px 40px;
  background:linear-gradient(135deg,#FF6B1A 0%,#cc4f00 50%,#8B1A1A 100%);
  border:none;border-radius:16px;color:#fff;font-size:16px;font-weight:700;
  letter-spacing:.08em;text-transform:uppercase;cursor:pointer;
  transition:all .35s;box-shadow:0 12px 40px rgba(255,107,26,.4);
  display:flex;align-items:center;justify-content:center;gap:12px;position:relative;overflow:hidden;
}
.atp-gen-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.15),transparent);opacity:0;transition:opacity .3s;}
.atp-gen-btn:hover::before{opacity:1;}
.atp-gen-btn:hover{transform:translateY(-3px);box-shadow:0 20px 60px rgba(255,107,26,.55);}
.atp-gen-btn:active{transform:translateY(-1px);}
.atp-gen-btn.loading{pointer-events:none;opacity:.8;}
.atp-spinner{width:20px;height:20px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:atp-spin .7s linear infinite;}
@keyframes atp-spin{to{transform:rotate(360deg);}}

.atp-result{margin-top:36px;border-top:1px solid rgba(245,166,35,.15);padding-top:36px;animation:atp-fadein .6s ease both;}
@keyframes atp-fadein{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
.atp-res-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px;}
.atp-res-title{font-family:'Playfair Display',serif;font-size:22px;color:#FDF6EC;font-weight:700;}
.atp-res-tags{display:flex;gap:10px;flex-wrap:wrap;}
.atp-res-tag{padding:5px 14px;background:rgba(245,166,35,.12);border:1px solid rgba(245,166,35,.25);border-radius:99px;font-size:12px;color:#F5A623;font-weight:500;}
.atp-itin{
  background:rgba(253,246,236,.03);border:1px solid rgba(245,166,35,.1);
  border-radius:16px;padding:28px 32px;font-size:14px;color:rgba(253,246,236,.8);
  line-height:1.85;max-height:420px;overflow-y:auto;white-space:pre-wrap;
}
.atp-itin::-webkit-scrollbar{width:4px;}
.atp-itin::-webkit-scrollbar-track{background:transparent;}
.atp-itin::-webkit-scrollbar-thumb{background:rgba(255,107,26,.4);border-radius:99px;}
.atp-res-actions{display:flex;gap:12px;margin-top:20px;flex-wrap:wrap;}
.atp-act-btn{
  padding:10px 24px;border-radius:10px;font-size:13px;font-weight:600;
  cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:7px;
}
.atp-act-btn.pri{background:linear-gradient(135deg,#FF6B1A,#8B1A1A);color:#fff;border:none;box-shadow:0 6px 20px rgba(255,107,26,.3);}
.atp-act-btn.sec{background:transparent;color:rgba(253,246,236,.7);border:1px solid rgba(253,246,236,.15);}
.atp-act-btn:hover{transform:translateY(-2px);}
.atp-error{background:rgba(139,26,26,.2);border:1px solid rgba(139,26,26,.4);border-radius:12px;padding:16px 20px;color:#ff9999;font-size:14px;margin-top:16px;}

@media(max-width:768px){
  .atp-card,.atp-mock-card{padding:28px 20px;}
  .atp-row2{grid-template-columns:1fr;}
  .atp-mock-row{grid-template-columns:repeat(2,1fr);}
  .atp-mock-row2{grid-template-columns:repeat(3,1fr);}
  .atp-lock-btns{flex-direction:column;align-items:stretch;text-align:center;}
}
`;

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const DESTINATIONS = [
  { e:'🏔️', n:'Ladakh' },{ e:'🌴', n:'Kerala' },{ e:'🏰', n:'Rajasthan' },
  { e:'🌊', n:'Goa' },{ e:'⛰️', n:'Himachal' },{ e:'🕌', n:'Varanasi' },
  { e:'🐯', n:'Jim Corbett' },{ e:'🌺', n:'Meghalaya' },{ e:'🏛️', n:'Hampi' },{ e:'🎭', n:'Kolkata' },
];

const INTERESTS = [
  { e:'🏛️', l:'Heritage' },{ e:'🍛', l:'Food & Cuisine' },{ e:'🧘', l:'Wellness' },
  { e:'🦁', l:'Wildlife' },{ e:'🏄', l:'Adventure' },{ e:'📸', l:'Photography' },
  { e:'🎭', l:'Culture' },{ e:'🌿', l:'Eco Travel' },{ e:'🛕', l:'Spirituality' },{ e:'🎨', l:'Arts & Craft' },
];

/* ─── Locked ──────────────────────────────────────────────────────────────── */
function LockedPlanner({ onLogin }) {
  return (
    <div className="atp-locked-wrapper">
      <div className="atp-locked-blur atp-mock-card">
        <div className="atp-mock-row">{[0,1,2].map(i=><div key={i} className="atp-mock-field"/>)}</div>
        <div className="atp-mock-row">{[0,1,2].map(i=><div key={i} className="atp-mock-field"/>)}</div>
        <div className="atp-mock-row2">{[0,1,2,3,4].map(i=><div key={i} className="atp-mock-chip"/>)}</div>
        <div style={{display:'flex',justifyContent:'center'}}><div className="atp-mock-btn"/></div>
      </div>
      <div className="atp-lock-overlay">
        <div className="atp-lock-icon">🔒</div>
        <h3 className="atp-lock-title">Unlock AI Trip Planning</h3>
        <p className="atp-lock-text">
          Sign in to unlock personalized AI trip planning — tailored itineraries, local insights,
          budget breakdowns, and sustainable travel tips crafted just for you.
        </p>
        <div className="atp-lock-btns">
          <button className="atp-btn-login" onClick={onLogin}>Sign In/Log In to Unlock</button>
          
        </div>
        <div className="atp-perks">
          {['Day-wise itineraries','Local food picks','Budget breakdown','Eco-travel tips'].map(p=>(
            <span key={p} className="atp-perk">✦ {p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Unlocked ────────────────────────────────────────────────────────────── */
function UnlockedPlanner({ userName = 'Traveller' }) {
  const [dest, setDest]   = useState('Rajasthan');
  const [days, setDays]   = useState(7);
  const [budget, setBudget] = useState('mid-range');
  const [style, setStyle]   = useState('cultural');
  const [interests, setInterests] = useState(['Heritage','Food & Cuisine']);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError]   = useState(null);

  const toggleInterest = l => setInterests(p => p.includes(l) ? p.filter(i=>i!==l) : [...p,l]);

  const generate = async () => {
    setLoading(true); setError(null); setItinerary(null);
    const prompt = `You are a luxury India travel expert. Create a detailed ${days}-day itinerary for ${dest}, India.
Budget: ${budget} | Style: ${style} | Interests: ${interests.join(', ')}
Format with day headings like "### Day 1: ..." including morning/afternoon/evening activities,
specific restaurant recommendations with dishes, daily budget in INR, and sustainable travel tips.
Keep it inspiring and magazine-quality. 600-800 words.`;
    try {
      const res  = await fetch('https://api.anthropic.com/v1/messages',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ model:'claude-sonnet-4-6', max_tokens:1000,
          messages:[{role:'user',content:prompt}] }),
      });
      const data = await res.json();
      setItinerary(data.content?.[0]?.text || '');
    } catch { setError('Unable to generate itinerary. Please try again.'); }
    finally { setLoading(false); }
  };

  const renderText = text => text.split('\n').map((line,i) => {
    if (line.startsWith('### ') || line.startsWith('## '))
      return <h3 key={i} style={{fontFamily:"'Playfair Display',serif",color:'#FF6B1A',fontSize:'16px',margin:'18px 0 8px'}}>{line.replace(/^#{2,3} /,'')}</h3>;
    return <span key={i}>{line}<br/></span>;
  });

  return (
    <div className="atp-card">
      <div className="atp-greeting">
        <div className="atp-avatar">✦</div>
        <div style={{flex:1}}>
          <div className="atp-gname">Welcome back, {userName}</div>
          <div className="atp-gsub">Your AI travel companion is ready</div>
        </div>
        <div className="atp-badge">AI Planner</div>
      </div>

      <label className="atp-label">Choose Your Destination</label>
      <div className="atp-dest-grid">
        {DESTINATIONS.map(d=>(
          <div key={d.n} className={`atp-dest-chip${dest===d.n?' sel':''}`} onClick={()=>setDest(d.n)}>
            {d.e} {d.n}
          </div>
        ))}
      </div>

      <div className="atp-row2">
        <div>
          <label className="atp-label">Duration</label>
          <div className="atp-slider-val">{days} Days</div>
          <input type="range" min="1" max="30" value={days} className="atp-slider"
            style={{'--pct':`${((days-1)/29)*100}%`}} onChange={e=>setDays(+e.target.value)}/>
          <div className="atp-slider-labs"><span>1 Day</span><span>30 Days</span></div>
        </div>
        <div>
          <label className="atp-label">Budget Tier</label>
          <select className="atp-select" value={budget} onChange={e=>setBudget(e.target.value)}>
            <option value="budget">Budget (₹2k–4k/day)</option>
            <option value="mid-range">Mid-Range (₹5k–10k/day)</option>
            <option value="luxury">Luxury (₹15k–30k/day)</option>
            <option value="ultra-luxury">Ultra-Luxury (₹30k+/day)</option>
          </select>
        </div>
      </div>

      <div style={{marginBottom:32}}>
        <label className="atp-label">Travel Style</label>
        <select className="atp-select" value={style} onChange={e=>setStyle(e.target.value)}>
          {['Cultural Immersion','Adventure & Trekking','Luxury & Wellness','Family-Friendly',
            'Solo Explorer','Romantic Getaway','Spiritual Journey','Photography Expedition'].map(s=>(
            <option key={s} value={s.toLowerCase().split(' ')[0]}>{s}</option>
          ))}
        </select>
      </div>

      <label className="atp-label">Your Interests</label>
      <div className="atp-interests">
        {INTERESTS.map(({e,l})=>(
          <div key={l} className={`atp-int-chip${interests.includes(l)?' sel':''}`} onClick={()=>toggleInterest(l)}>
            {e} {l}
          </div>
        ))}
      </div>

      <button className={`atp-gen-btn${loading?' loading':''}`} onClick={generate}>
        {loading ? <><div className="atp-spinner"/>Crafting Your Journey…</> : <>✦ Generate My Itinerary</>}
      </button>

      {error && <div className="atp-error">⚠️ {error}</div>}

      {itinerary && (
        <div className="atp-result">
          <div className="atp-res-hdr">
            <div className="atp-res-title">Your {days}-Day {dest} Journey</div>
            <div className="atp-res-tags">
              <span className="atp-res-tag">✦ {budget}</span>
              <span className="atp-res-tag">📍 {dest}</span>
            </div>
          </div>
          <div className="atp-itin">{renderText(itinerary)}</div>
          <div className="atp-res-actions">
            <button className="atp-act-btn pri">📥 Save Itinerary</button>
            <button className="atp-act-btn sec">🔄 Regenerate</button>
            <button className="atp-act-btn sec">📤 Share</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Export ──────────────────────────────────────────────────────────────── */
export default function AITripPlanner({ isLoggedIn = false, userName, onLoginRequest }) {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  return (
    <>
      <style>{css}</style>
      <section className="atp-section">
        <div className="atp-orb atp-orb-1"/><div className="atp-orb atp-orb-2"/><div className="atp-orb atp-orb-3"/>
        <div className="atp-wrap">
          <div className="atp-hdr">
            <div className="atp-eyebrow">AI-Powered Planning</div>
            <h2 className="atp-h2">Plan Your <em>Perfect</em> Journey<br/>Across India</h2>
            <p className="atp-sub">Our AI travel companion crafts deeply personal itineraries — built around your pace, taste, and curiosity.</p>
          </div>
          {loggedIn
            ? <UnlockedPlanner userName={userName}/>
            : <LockedPlanner onLogin={() => onLoginRequest ? onLoginRequest() : setLoggedIn(true)}/>}
        </div>
      </section>
    </>
  );
}
