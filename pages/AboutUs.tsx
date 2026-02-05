import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Rahul Sharma',
      role: 'CEO & Founder',
      education: 'Ex-Google, IIT Delhi',
      image: 'https://picsum.photos/seed/rahulceo/300',
      bio: 'Passionate about bridging the gap between education and industry.',
      linkedin: '#'
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'CTO',
      education: 'Ex-Microsoft, BITS Pilani',
      image: 'https://picsum.photos/seed/priyacto/300',
      bio: 'Building scalable tech solutions for student success.',
      linkedin: '#'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      role: 'Head of Placements',
      education: 'Ex-Amazon, IIM Ahmedabad',
      image: 'https://picsum.photos/seed/amithr/300',
      bio: 'Connecting talent with the right opportunities.',
      linkedin: '#'
    },
    {
      id: 4,
      name: 'Neha Gupta',
      role: 'Student Success Head',
      education: 'Ex-Unacademy, Delhi University',
      image: 'https://picsum.photos/seed/nehass/300',
      bio: 'Ensuring every student gets the support they need.',
      linkedin: '#'
    }
  ];

  const milestones = [
    { year: '2020', title: 'Founded', desc: 'Started with a vision to revolutionize internships' },
    { year: '2021', title: 'First 1000 Students', desc: 'Placed 1000+ students in top companies' },
    { year: '2022', title: 'MSME Certification', desc: 'Received government MSME certification' },
    { year: '2023', title: '7,000+ Students', desc: 'Expanded to 150+ partner companies' },
    { year: '2024', title: 'National Recognition', desc: 'Featured in leading education platforms' }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Student First',
      desc: 'Every decision is made with student success in mind'
    },
    {
      icon: '🤝',
      title: 'Transparency',
      desc: 'Clear process, no hidden terms, complete honesty'
    },
    {
      icon: '⚡',
      title: 'Efficiency',
      desc: 'Fast-track process without compromising quality'
    },
    {
      icon: '💼',
      title: 'Industry Connect',
      desc: 'Direct partnerships with hiring companies'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            About Internadda
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              India's Adda for Internships
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We're on a mission to bridge the gap between talented students and meaningful 
            internship opportunities through skill-based assessments and direct industry connections.
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  Founded in 2020 by a group of IIT and IIM alumni, Internadda emerged from 
                  a simple observation: talented students were struggling to find quality 
                  internships, while companies were having difficulty finding skilled interns.
                </p>
                <p>
                  We realized the traditional internship search process was broken - 
                  it was time-consuming, opaque, and often based on resumes rather than skills.
                </p>
                <p>
                  Today, as an MSME certified platform, we've helped 7,000+ students 
                  launch their careers with top companies through our unique skill-based 
                  assessment model.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl border border-slate-200 p-8 shadow-xl">
                <div className="text-center">
                  <div className="text-4xl mb-4">🏛️</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">MSME Certified</h3>
                  <p className="text-slate-600">Government recognized platform</p>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                      <div className="text-2xl font-bold text-indigo-600">7,000+</div>
                      <div className="text-sm text-slate-600">Students Placed</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                      <div className="text-2xl font-bold text-emerald-600">98.2%</div>
                      <div className="text-sm text-slate-600">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="text-center p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Journey */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Our Journey</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-200 to-purple-200 transform -translate-x-1/2"></div>
            
            {/* Milestones */}
            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <div key={idx} className={`relative ${idx % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                  <div className={`md:absolute ${idx % 2 === 0 ? 'md:right-1/2 md:mr-8' : 'md:left-1/2 md:ml-8'} top-0`}>
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className={`bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-w-md ${idx % 2 === 0 ? 'md:ml-auto' : ''}`}>
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{milestone.title}</h3>
                    <p className="text-slate-600">{milestone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Meet the Team */}
        <div className="mb-20">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Meet Our Team</h2>
              <p className="text-slate-600">The passionate people behind Internadda</p>
            </div>
            <Link 
              to="/team"
              className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-2"
            >
              View All Team Members
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center overflow-hidden mb-4 border-4 border-white shadow-lg">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <span class="text-indigo-600 font-bold text-2xl">
                            ${member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        `;
                      }
                    }}
                  />
                </div>
                <h3 className="font-bold text-slate-900">{member.name}</h3>
                <p className="text-sm text-indigo-600 font-semibold">{member.role}</p>
                <p className="text-sm text-slate-500 mb-3">{member.education}</p>
                <p className="text-sm text-slate-600 mb-4">{member.bio}</p>
                <a 
                  href={member.linkedin} 
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <span>LinkedIn</span>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.41z"/>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-6">Join Our Mission</h3>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Help us bridge the gap between education and industry
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/internships"
              className="bg-white text-indigo-600 px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all"
            >
              Browse Opportunities
            </Link>
            <a 
              href="mailto:careers@internadda.com" 
              className="border-2 border-white text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
            >
              Work With Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
