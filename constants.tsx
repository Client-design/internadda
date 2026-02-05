
import React from 'react';
import { Internship, Question } from './types';

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: '1',
    title: 'Python Developer Intern',
    company: 'Corporate Partners',
    category: 'Python',
    image: 'https://picsum.photos/seed/python/600/300',
    stipend: '₹1,000 - ₹10,000 /month',
    location: 'Remote',
    type: 'Remote',
    status: 'ACTIVE',
    description: 'Work on advanced AI/ML algorithms and backend systems using Python and Django.',
    skills: ['Python', 'Django', 'PostgreSQL']
  },
  {
    id: '2',
    title: 'Web Development Intern',
    company: 'Corporate Partners',
    category: 'Web Development',
    image: 'https://picsum.photos/seed/web/600/300',
    stipend: '₹1,000 - ₹10,000 /month',
    location: 'Remote',
    type: 'Remote',
    status: 'ACTIVE',
    description: 'Build responsive frontends using Next.js and Tailwind CSS for enterprise clients.',
    skills: ['React', 'Next.js', 'Tailwind']
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'Corporate Partners',
    category: 'Data Science',
    image: 'https://picsum.photos/seed/data/600/300',
    stipend: '₹1,000 - ₹10,000 /month',
    location: 'Remote',
    type: 'Remote',
    status: 'ACTIVE',
    description: 'Analyze large datasets and build predictive models using Scikit-learn and TensorFlow.',
    skills: ['Python', 'Pandas', 'Matplotlib']
  }
];

export const MOCK_QUESTIONS: Question[] = Array.from({ length: 25 }, (_, i) => ({
  id: `${i + 1}`,
  text: `Sample Skill Assessment Question ${i + 1}: What is the primary purpose of this domain-specific concept?`,
  options: ['Option A: Optimal solution', 'Option B: Sub-optimal choice', 'Option C: Legacy method', 'Option D: None of the above'],
  correctAnswer: 0
}));

export const CATEGORIES = ['All Internships', 'Web Development', 'Data Science', 'Python', 'Marketing', 'Design'];
