'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer, ShieldAlert, CheckCircle2, XCircle, MessageCircle, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { DOMAIN_TESTS } from '@/lib/test-data'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import LoadingScreen from '@/components/LoadingScreen'

export default function InternshipAssessment() {
  const { id } = useParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [verifying, setVerifying] = useState(true)

  const testData = DOMAIN_TESTS[id as string] || DOMAIN_TESTS['1']
  const [currentIdx, setCurrentIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(1800)
  const [isFinished, setIsFinished] = useState(false)
  const [cheatingAttempts, setCheatingAttempts] = useState(0)

  // --- 1. Gatekeeper Logic ---
  useEffect(() => {
    const verifyAccess = async () => {
      if (authLoading) return

      const params = new URLSearchParams(window.location.search)
      const token = params.get('token')

      if (token) {
        try {
          const [timestampStr] = token.split('_')
          const tokenTime = parseInt(timestampStr)
          const currentTime = Math.floor(Date.now() / 1000)

          if (currentTime - tokenTime < 300) {
            setIsAuthorized(true)
            setVerifying(false)
            const newUrl = window.location.pathname
            window.history.replaceState({}, '', newUrl)
            
            if (user) {
              supabase.from('profiles').update({ has_paid: true }).eq('id', user.id)
                .then(({ error }) => { if (error) console.error("Sync error:", error) })
            }
            return 
          }
        } catch (e) {
          console.error("Token verification failed")
        }
      }

      if (!user) {
        router.push('/auth/signin')
        return
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('has_paid')
          .eq('id', user.id)
          .single()

        setIsAuthorized(!error && data?.has_paid)
      } catch (err) {
        setIsAuthorized(false)
      } finally {
        setVerifying(false)
      }
    }

    verifyAccess()
  }, [user, authLoading, router])

  // --- 2. Corrected Anti-Cheating Logic ---
  useEffect(() => {
    // Only monitor if authorized and test is active
    if (!isAuthorized || isFinished) return

    const handleVisibility = () => {
      if (document.hidden) {
        // Use functional update to ensure we have the latest count
        setCheatingAttempts((prevCount) => {
          const newCount = prevCount + 1
          
          if (newCount === 1) {
            // Attempt 1: Warning
            alert("STRICT WARNING (1/2): Tab switching detected! Your activity is being monitored. Reaching 2 attempts will result in immediate disqualification.")
          } else if (newCount >= 2) {
            // Attempt 2: Strict Message and Kick out
            alert("CRITICAL VIOLATION: You tried tab switching again. Access revoked. Sending you back to home.")
            setIsFinished(true)
            router.push('/') // Redirect to home immediately
          }
          
          return newCount
        })
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [isAuthorized, isFinished, router])

  // --- 3. Timer Logic ---
  useEffect(() => {
    if (!isAuthorized || isFinished) return
    if (timeLeft <= 0) {
      setIsFinished(true)
      return
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft, isAuthorized, isFinished])

  const handleAnswer = (selected: number) => {
    if (selected === testData.questions[currentIdx].correct) setScore(s => s + 1)
    
    if (currentIdx < testData.questions.length - 1) {
      setCurrentIdx(c => c + 1)
    } else {
      setIsFinished(true)
    }
  }

  if (authLoading || verifying) return <LoadingScreen />

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0A2647] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-white p-10 rounded-[2.5rem] text-center shadow-2xl border-t-8 border-[#FFD700]">
          <div className="bg-amber-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-[#FFD700]" size={36} />
          </div>
          <h2 className="text-2xl font-black text-[#0A2647] mb-3">Premium Content</h2>
          <p className="text-gray-500 mb-8 leading-relaxed font-medium">It looks like you haven't enrolled in this domain yet. Please complete the enrollment to unlock this assessment.</p>
          <div className="space-y-3">
            <Button onClick={() => router.push('/courses')} className="w-full bg-[#0A2647] hover:bg-[#144272] text-white py-7 rounded-2xl font-bold text-lg transition-all active:scale-95">View Enrollment Options</Button>
            <Button variant="ghost" onClick={() => router.push('/internships')} className="text-[#0A2647] font-extrabold">Explore Other Roles</Button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (isFinished) {
    const percentage = Math.round((score / testData.questions.length) * 100)
    const passed = percentage >= 50

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="max-w-xl w-full bg-white p-12 rounded-[3.5rem] shadow-2xl text-center border-none">
            {passed ? (
              <>
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="text-green-600" size={48} /></div>
                <h1 className="text-3xl font-black text-[#0A2647] mb-4">Qualification Confirmed!</h1>
                <p className="text-gray-500 mb-8 leading-relaxed">You scored **{percentage}%**. You are now qualified. An official interview link has been dispatched to your email.</p>
                <Button onClick={() => window.open('https://wa.me/919999999999?text=Qualified%20HR1')} className="bg-[#25D366] hover:bg-[#128C7E] py-7 rounded-2xl font-bold text-lg w-full"><MessageCircle className="mr-2"/> Fasttrack with HR 1</Button>
              </>
            ) : (
              <>
                <XCircle className="text-red-500 mx-auto mb-6" size={80} />
                <h1 className="text-3xl font-black text-[#0A2647] mb-4">Assessment Unsuccessful</h1>
                <p className="text-gray-500 mb-8">You scored {percentage}%. We recommend reviewing the fundamentals and attempting again later.</p>
                <Button onClick={() => router.push('/internships')} className="bg-[#0A2647] w-full py-7 rounded-2xl font-bold text-white">Try Different Role</Button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A2647] p-4 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10 bg-white/10 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/20 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="bg-[#FFD700] text-[#0A2647] p-2 rounded-xl"><Timer size={24} /></div>
            <span className="text-white font-mono text-2xl font-bold">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
          </div>
          <div className="text-center hidden md:block">
            <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">Current Domain</p>
            <p className="text-[#FFD700] font-black uppercase text-sm">{testData.name}</p>
          </div>
          <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20 font-bold text-[10px] uppercase"><ShieldAlert size={14} /> Anti-Cheat Active</div>
        </div>

        <div className="mb-10 px-2">
          <div className="flex justify-between text-white/40 text-[10px] font-bold uppercase mb-2">
            <span>Progress: {currentIdx + 1} / {testData.questions.length}</span>
            <span>{Math.round(((currentIdx + 1) / testData.questions.length) * 100)}% Complete</span>
          </div>
          <Progress value={((currentIdx + 1) / testData.questions.length) * 100} className="h-2 bg-white/10" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white p-8 md:p-16 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
            <h2 className="text-2xl md:text-3xl font-black text-[#0A2647] mb-12 leading-tight">{testData.questions[currentIdx].q}</h2>
            <div className="grid grid-cols-1 gap-4">
              {testData.questions[currentIdx].options.map((option: string, i: number) => (
                <button key={i} onClick={() => handleAnswer(i)} className="w-full text-left p-6 rounded-2xl border-2 border-slate-50 hover:border-[#0A2647] hover:bg-slate-50 transition-all font-bold text-[#0A2647] active:scale-95 flex justify-between items-center group">
                  <span className="pr-4">{option}</span>
                  <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-[#0A2647] transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
