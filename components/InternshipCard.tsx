import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Internship } from '../types';

interface InternshipCardProps {
  internship: Internship;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  // 1. Apne 3 Card Image links yahan paste karein
  const CARD_IMAGES = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop", // Image for Index 1
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=500&auto=format&fit=crop", // Image for Index 2
    "https://iili.io/fbArEUF.png"  // Image for Index 3
  ];

  // 2. Apne 3 Company Logo links yahan paste karein
  const COMPANY_LOGOS = [
    "https://iili.io/fbAXw2p.md.png", // Logo for Index 1
    "https://iili.io/fbAXcYB.png", // Logo for Index 2
    "https://iili.io/fbAXcYB.png"  // Logo for Index 3
  ];

  // Sequence logic: ID ke basis par image aur logo pick karna
  // -1 isliye kiya hai kyunki array 0 se start hota hai
  const itemIndex = (Number(internship.id) - 1) % CARD_IMAGES.length;
  const selectedImage = CARD_IMAGES[itemIndex];
  const selectedLogo = COMPANY_LOGOS[itemIndex];

  // Applications count state (130-150 range)
  const [applications, setApplications] = useState(
    Math.floor(Math.random() * (150 - 130 + 1)) + 130
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setApplications((prev) => {
        const change = Math.floor(Math.random() * 6) - 2; 
        let nextValue = prev + change;
        if (nextValue < 130) nextValue = 130;
        if (nextValue > 150) nextValue = 150;
        return nextValue;
      });
    }, 120000); 

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full flex flex-col">
      
      {/* Applications Badge - Updates every 2 mins */}
      <div className="absolute top-3 right-3 z-10">
        <div className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md">
          🔥 {applications} Applied
        </div>
      </div>

      {/* Image Container - Picked by Sequence */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={selectedImage} 
          alt={internship.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Company Logo - Picked by Sequence */}
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={selectedLogo} 
            alt={internship.company}
            className="w-10 h-10 rounded-lg border border-slate-100 object-contain p-1 bg-white shadow-sm"
          />
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">Hiring At</span>
            <h4 className="text-sm font-bold text-slate-800 leading-none">{internship.company}</h4>
          </div>
        </div>
        
        <h3 className="font-bold text-base text-slate-900 mb-4 line-clamp-1">
          {internship.title}
        </h3>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-50">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Stipend</div>
            <div className="text-xs font-bold text-indigo-600">{internship.stipend}</div>
          </div>
          <div className="w-px h-6 bg-slate-100"></div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">Location</div>
            <div className="text-xs font-bold text-slate-700">{internship.location}</div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Skills You'll Learn</div>
          <div className="flex flex-wrap gap-1.5">
            {internship.skills.slice(0, 3).map(skill => (
              <span key={skill} className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded border border-slate-100">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-auto">
          <Link 
            to={`/apply/${internship.id}`}
            className="block w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold text-center hover:bg-indigo-600 transition-colors shadow-md"
          >
            Apply Now
          </Link>
          <p className="text-[9px] text-center text-slate-400 mt-2 font-medium">
            Next Batch Starts Soon • Verified Internship
          </p>
        </div>
      </div>
    </div>
  );
};

export default InternshipCard;
