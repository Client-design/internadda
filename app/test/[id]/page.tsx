'use client'

import { useState, useEffect } from 'react'
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
  
  // Gatekeeper States
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [verifying, setVerifying] = useState(true)

  // Test Logic States
  const testData = DOMAIN_TESTS[id as string] || DOMAIN_TESTS['1']
  const [currentIdx, setCurrentIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(1800) 
  const [isFinished, setIsFinished] = useState(false)
  const [cheatingAttempts, setCheatingAttempts] = useState(0)

  // --- 1. Gatekeeper: ONLY TOKEN VERIFICATION (No DB Fallback) ---
  useEffect(() => {
    const verifyAccess = async () => {
      const params = new URLSearchParams(window.location.search)
      const token = params.get('token')

      if (!token) {
        // No token = No access. No DB check performed.
        setIsAuthorized(false)
        setVerifying(false)
        return
      }

      try {
        const [timestampStr] = token.split('_')
        const tokenTime = parseInt(timestampStr)
        const currentTime = Math.floor(Date.now() / 1000)

        // Token valid for 10 minutes (600s) to be safe
        if (currentTime - tokenTime < 600) {
          setIsAuthorized(true)
          
          // Background Sync: Update DB just for records, but don't wait for it
          if (user) {
            supabase.from('profiles').update({ has_paid: true }).eq('id', user.id).then(() => {})
          }
        } else {
          setIsAuthorized(false)
        }
      } catch (e) {
        setIsAuthorized(false)
      } finally {
        setVerifying(false)
      }
    }

    verifyAccess()
  }, [user])

  // --- 2. Anti-Cheating: 2 Attempts Limit ---
  useEffect(() => {
    if (!isAuthorized || isFinished) return

    const handleVisibility = () => {
      if (document.hidden) {
        setCheatingAttempts(prev => {
          const nextCount = prev + 1
          
          if (nextCount === 1) {
            alert("WARNING (1/2): Tab switching detected! You are being monitored. If you switch tabs one more time, your test will be CANCELLED immediately for security reasons.")
          } else if (nextCount >= 2) {
            alert("TEST TERMINATED: Multiple tab switches detected. You have violated the examination policy. Redirecting to home...")
            router.push('/')
            setIsFinished(true)
          }
          return nextCount
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

  if (verifying) return <LoadingScreen />

  // Access Denied UI
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0A2647] flex items-center justify-center p-6 text-white text-center">
        <div>
          <Lock size={48} className="mx-auto mb-4 text-yellow-400" />
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="mt-2 opacity-70">A valid payment token is required to view this assessment.</p>
          <Button onClick={() => router.push('/internships')} className="mt-6 bg-yellow-500 text-black">Return to Internships</Button>
        </div>
      </div>
    )
  }

  // Success/Fail Screens
  if (isFinished) {
    const percentage = Math.round((score / testData.questions.length) * 100)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <div className="bg-white p-12 rounded-[2rem] shadow-xl max-w-md">
           <h1 className="text-3xl font-black text-[#0A2647] mb-4">Assessment Result</h1>
           <p className="text-4xl font-bold text-primary mb-4">{percentage}%</p>
           <p className="mb-8">You scored {score} out of {testData.questions.length}.</p>
           <Button onClick={() => router.push('/')} className="w-full">Back to Home</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A2647] p-4 md:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10 bg-white/10 p-6 rounded-[2rem] text-white">
          <div className="flex items-center gap-2">
            <Timer />
            <span className="text-2xl font-bold font-mono">
               {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </span>
          </div>
          <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
            <ShieldAlert size={14} /> ANTI-CHEAT ACTIVE
          </div>
        </div>

        <div className="bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-black text-[#0A2647] mb-12">
            {testData.questions[currentIdx].q}
          </h2>
          <div className="grid gap-4">
            {testData.questions[currentIdx].options.map((option: string, i: number) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full text-left p-6 rounded-2xl border-2 hover:border-[#0A2647] transition-all font-bold text-[#0A2647]"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
