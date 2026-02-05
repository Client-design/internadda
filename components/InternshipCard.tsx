import React from 'react';
import { Link } from 'react-router-dom';
import { Internship } from '../types';

interface InternshipCardProps {
  internship: Internship;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship }) => {
  // Calculate urgency (fake logic for demo)
  const hoursLeft = Math.floor(Math.random() * 48) + 1;
  const applications = Math.floor(Math.random() * 200) + 50;
  
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full flex flex-col">
      {/* Urgency Badge */}
      {hoursLeft < 24 && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
            ⚡ {hoursLeft}h Left!
          </div>
        </div>
      )}
      
      {/* Applications Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
          🔥 {applications} applied
        </div>
      </div>

      {/* Status Badge */}
      <div className="absolute top-12 right-4 z-10">
        <div className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-sm ${
          internship.status === 'ACTIVE' 
            ? 'bg-emerald-100 text-emerald-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {internship.status === 'ACTIVE' ? '📍 Hiring Now' : '❌ Closed'}
        </div>
      </div>

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={internship.image} 
          alt={internship.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
            {internship.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Company & Title */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
              <span className="text-xs font-bold text-indigo-600">🏢</span>
            </div>
            <span className="text-sm font-semibold text-slate-700">{internship.company}</span>
          </div>
          
          <h3 className="font-bold text-lg text-slate-900 mb-3 line-clamp-2 leading-snug">
            {internship.title}
          </h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <span className="text-amber-600 text-sm">💰</span>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Stipend</div>
                <div className="text-sm font-bold text-slate-900">{internship.stipend}</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <span className="text-emerald-600 text-sm">📍</span>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Location</div>
                <div className="text-sm font-bold text-slate-900">{internship.location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>🔥 Skills You'll Learn</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {internship.skills.slice(0, 3).map(skill => (
              <span key={skill} className="px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200">
                {skill}
              </span>
            ))}
            {internship.skills.length > 3 && (
              <span className="px-3 py-1.5 bg-slate-50 text-slate-500 text-xs font-semibold rounded-lg">
                +{internship.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Emotional Description */}
        <div className="mb-6 flex-grow">
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
            {internship.description} This isn't just an internship - it's your launchpad to a successful career. Real projects, real impact.
          </p>
        </div>

        {/* Trust Elements */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="font-medium text-emerald-600">Guaranteed Interview</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-blue-600">Certificate Provided</span>
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-auto space-y-3">
          <Link 
            to={`/apply/${internship.id}`}
            className="group relative block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl text-sm font-bold text-center overflow-hidden shadow-lg hover:shadow-xl transition-all"
          >
            <span className="relative z-10">🎯 Apply Now (Guaranteed Interview)</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          
          {/* Hiring Process Info */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg">
              <span className="font-semibold text-indigo-600">Process:</span>
              <span>Test → Interview → Offer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-300 transition-colors pointer-events-none"></div>
    </div>
  );
};

export default InternshipCard;
