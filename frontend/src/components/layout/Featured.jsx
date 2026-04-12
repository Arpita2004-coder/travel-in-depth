import React from 'react'
import { Leaf,UtensilsCrossed,Landmark,Wallet,Bot,Users,Hotel,HeadphonesIcon} from 'lucide-react'

const features=[{
    icon: <UtensilsCrossed size={32} />,
    title: "Local Food Guides",
    description: "Discover authentic local cuisines, hidden street food gems and must-try dishes at every destination."
  },
  {
    icon: <Landmark size={32} />,
    title: "Culture Tips",
    description: "Understand local customs, traditions and etiquette so you travel respectfully and connect deeply."
  },
  {
    icon: <Wallet size={32} />,
    title: "Budget Planning",
    description: "Smart trip budgeting tools that help you travel more for less — no surprises, no overspending."
  },
  {
    icon: <Leaf size={32} />,
    title: "Carbon Efficiency Score",
    description: "Every trip gets a carbon score. We help you make eco-conscious choices that protect our planet."
  },
  {
    icon: <Bot size={32} />,
    title: "AI Travel Chatbot",
    description: "Our AI recommender suggests personalised itineraries based on your interests, budget and travel style."
  },
  {
    icon: <Users size={32} />,
    title: "Travel Style Recommendations",
    description: "Going with family, friends or as a couple? Get tailor-made suggestions that fit your group perfectly."
  },
  {
    icon: <Hotel size={32} />,
    title: "Budget-Friendly Hotels",
    description: "Handpicked stays that balance comfort and cost — best value hotels for every type of traveller."
  },
  {
    icon: <HeadphonesIcon size={32} />,
    title: "24/7 Support",
    description: "Round the clock assistance from booking to landing back home — we're always just a message away."
  }]
function Featured() {

    return (
        <><div className="w-full h-1.5 flex mt-0">
  <div className="flex-1 bg-[#FF6B1A]"></div> {/* Saffron */}
  <div className="flex-1 bg-white"></div>       {/* White */}
  <div className="flex-1 bg-[#138808]"></div>   {/* Green */}
</div>
        <div className='text-center mb-16 px-6 pt-16'>
          
  <p className='text-[#FF6B1A] font-bold tracking-widest text-base  uppercase mb-3'>
    Why Choose Us
  </p>
  <h2 className='text-4xl font-bold text-[#8B1A1A]'>
   Features That <span className='text-[#FF6B1A]'>Set Us Apart</span>
  </h2>
</div>
        
      <div className='py-5 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
  {features.map((feature, index) => (
    <div key={index} className='group transition-all ease-in-out group-hover:border-[#FF6B1A]/50  hover:-translate-y-3 duration-500 bg-white rounded-2xl p-6 shadow-sm border border-[#F5A623]/20'>
  
  {/* Icon */}
  <div className='group-hover:bg-[#FF6B1A]/10 bg-[#FFF8F0] p-3 rounded-xl w-fit'>
    <span className='text-[#FF6B1A]'>{feature.icon}</span>
  </div>

  {/* Title */}
  <h3 className='mt-4 text-[#8B1A1A] font-bold text-lg'>
    {feature.title}
  </h3>

  {/* Description */}
  <p className='mt-2 text-gray-500 text-sm leading-relaxed'>
    {feature.description}
  </p>

</div>))}
    </div>
    
    </>
    
    )
}

export default Featured;
