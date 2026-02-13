'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Timer, AlertTriangle, CheckCircle2, XCircle, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Internship-specific Question Bank (Example)
const QUESTION_BANK: any = {
  '1': [ /* Python Questions */ { q: "What is PEP 8?", options: ["Style Guide", "Compiler", "Library"], correct: 0 }, ...Array(24).fill({q: "Advanced Python Concept?", options: ["A", "B", "C"], correct: 1})],
  '2': [ /* Web Dev Questions */ { q: "What is Next.js hydration?", options: ["Watering server", "Client-side React attachment", "CSS Minification"], correct: 1 }, ...Array(24).fill({q: "React Lifecycle?", options: ["A", "B", "C"], correct: 2})],
};

export default function TestPage() {
  const { id } = useParams()
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 mins
  const [isFinished, setIsFinished] = useState(false)
  const [cheatingAttempts, setCheatingAttempts] = useState(0)

  const questions = QUESTION_BANK[id as string] || QUESTION_BANK['1']

  // Anti-Cheating: Detect Tab Switch
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setCheatingAttempts(prev => prev + 1)
        alert("WARNING: Tab switching is strictly prohibited. This attempt has been logged.")
      }
    }
    window.addEventListener('visibilitychange', handleVisibilityChange)
    return () => window.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) setIsFinished(true)
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const handleAnswer = (index: number) => {
    if (index === questions[currentQuestion].correct) setScore(prev => prev + 1)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setIsFinished(true)
    }
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  if (isFinished) {
    const percentage = (score / questions.length) * 100
    const passed = percentage >= 50

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Card className="max-w-xl w-full p-10 text-center rounded-[3rem] shadow-2xl">
            {passed ? (
              <>
                <div className="flex justify-center mb-6 text-green-500"><CheckCircle2 size={80} /></div>
                <h1 className="text-3xl font-black text-[#0A2647] mb-4">Congratulations!</h1>
                <p className="text-gray-600 mb-8">You qualified with <strong>{percentage.toFixed(0)}%</strong>. You'll receive a mail on your registered email shortly with your scheduled AI Interview link (Collab with Arjuna AI).</p>
                <div className="grid grid-cols-1 gap-4">
                  <Button onClick={() => window.open(`https://wa.me/919999999999?text=Hi HR, I have qualified the test for ${id}. Please fasttrack my application.`)} className="bg-[#25D366] hover:bg-[#128C7E] text-white py-6 rounded-2xl font-bold">
                    <MessageCircle className="mr-2" /> Fasttrack via HR 1
                  </Button>
                  <Button onClick={() => window.open(`https://wa.me/918888888888?text=Hi HR, I have cleared the assessment.`)} className="bg-[#25D366] hover:bg-[#128C7E] text-white py-6 rounded-2xl font-bold">
                    <MessageCircle className="mr-2" /> Fasttrack via HR 2
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-6 text-red-500"><XCircle size={80} /></div>
                <h1 className="text-3xl font-black text-[#0A2647] mb-4">Don't Give Up!</h1>
                <p className="text-gray-600 mb-8">You scored {percentage.toFixed(0)}%. Focus on your fundamentals and try again. Success is a journey, not a destination!</p>
                <Button onClick={() => router.push('/courses')} className="bg-[#0A2647] py-6 w-full rounded-2xl">Upgrade Skills & Retry</Button>
              </>
            )}
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A2647] text-white p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex justify-between items-center mb-8 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
          <div className="flex items-center gap-2 font-mono text-xl">
            <Timer className="text-[#FFD700]" /> {formatTime(timeLeft)}
          </div>
          <div className="text-sm font-bold uppercase tracking-widest">Question {currentQuestion + 1}/{questions.length}</div>
          <div className="flex items-center gap-1 text-red-400 text-xs uppercase font-bold">
            <AlertTriangle size={14} /> Anti-Cheat Active
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestion}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="bg-white text-black p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-[#0A2647] mb-8 leading-tight">
              {questions[currentQuestion].q}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {questions[currentQuestion].options.map((option: string, i: number) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full text-left p-6 rounded-2xl border-2 border-slate-100 hover:border-[#0A2647] hover:bg-slate-50 transition-all font-semibold text-gray-700 active:scale-[0.98]"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
