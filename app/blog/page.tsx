'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    slug: 'getting-started-internship',
    title: 'Getting Started With Your First Internship',
    excerpt: 'A complete guide to landing and succeeding in your first internship opportunity.',
    category: 'Career Tips',
    author: 'Rajesh Kumar',
    date: '2024-02-01',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    slug: 'resume-tips-2024',
    title: 'Resume Tips That Actually Get You Noticed in 2024',
    excerpt: 'Learn what hiring managers look for in resumes and how to stand out from the crowd.',
    category: 'Job Search',
    author: 'Priya Singh',
    date: '2024-01-28',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    slug: 'interview-questions',
    title: 'Top 20 Interview Questions You\'ll Definitely Get Asked',
    excerpt: 'Prepare for your interviews with these common questions and expert answers.',
    category: 'Interview Prep',
    author: 'Aditya Singh',
    date: '2024-01-25',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    slug: 'skills-employers-want',
    title: 'The Top Skills Employers Want in 2024',
    excerpt: 'Discover which skills will make you most attractive to employers this year.',
    category: 'Skill Development',
    author: 'Neha Gupta',
    date: '2024-01-20',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70504ac0?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    slug: 'remote-work-guide',
    title: 'The Ultimate Guide to Remote Internships',
    excerpt: 'Everything you need to know about succeeding in a remote internship environment.',
    category: 'Work Style',
    author: 'Rajesh Kumar',
    date: '2024-01-15',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    slug: 'startup-internships',
    title: 'Why You Should Consider a Startup Internship',
    excerpt: 'Explore the unique benefits and challenges of interning at a startup.',
    category: 'Career Path',
    author: 'Priya Singh',
    date: '2024-01-10',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true },
}

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { staggerChildren: 0.1 },
  viewport: { once: true },
}

export default function BlogPage() {
  const categories = ['All', ...new Set(blogPosts.map((p) => p.category))]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Page Header */}
        <section className="bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="space-y-6" {...fadeInUp}>
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl font-bold">InternAdda Blog</h1>
                <p className="text-foreground/70 text-lg">
                  Expert tips, career advice, and internship insights
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === 'All' ? 'default' : 'outline'}
                    className={category === 'All' ? 'bg-primary text-primary-foreground' : ''}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {blogPosts.map((post) => (
                <motion.article
                  key={post.id}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all"
                  variants={fadeInUp}
                >
                  {/* Post Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Post Meta */}
                    <div className="space-y-4 border-t border-border pt-4">
                      <div className="flex items-center gap-4 text-xs text-foreground/60">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        <span>{post.readTime}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs">
                          <User size={14} />
                          <span className="text-foreground/70">{post.author}</span>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-primary hover:gap-2 transition-all font-medium text-sm"
                        >
                          Read More
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 sm:py-24 bg-card border-t border-border">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <motion.h2 className="text-3xl sm:text-4xl font-bold" {...fadeInUp}>
              Subscribe to Our Newsletter
            </motion.h2>
            <motion.p className="text-foreground/70" {...fadeInUp}>
              Get weekly tips and insights delivered to your inbox
            </motion.p>
            <motion.form className="flex gap-2" {...fadeInUp}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Subscribe
              </Button>
            </motion.form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
