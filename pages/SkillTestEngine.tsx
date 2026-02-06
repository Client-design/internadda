// pages/SkillTestEngine.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDomainQuestions, SkillQuestion } from '../utils/skillQuestions';
import { MOCK_INTERNSHIPS } from '../constants';

const SkillTestEngine: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const orderId = params.get('order');
  
  const [questions, setQuestions] = useState<SkillQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    // Validate payment and get internship
    if (!orderId || !localStorage.getItem(`payment_${orderId}`)) {
      navigate('/payment-failed');
      return;
    }

    const internship = MOCK_INTERNSHIPS.find(i => i.id === id);
    if (!internship) {
      navigate('/internships');
      return;
    }

    // Get domain-specific questions
    const domainQuestions = getDomainQuestions(internship.category);
    setQuestions(domainQuestions.slice(0, 25)); // Take first 25 questions
  }, [id, orderId, navigate]);

  // Timer and anti-cheat
  useEffect(() => {
    if (!testStarted || testCompleted) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Anti-cheat: Tab switching detection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarningCount(prev => {
          const newCount = prev + 1;
          
          if (newCount === 1) {
            alert('⚠️ WARNING: Tab switching detected (1/3).\nSwitch tabs again to auto-submit.');
          } else if (newCount === 2) {
            alert('🚨 FINAL WARNING: Tab switching detected (2/3).\nNext violation will auto-submit test!');
          } else if (newCount >= 3) {
            alert('❌ TEST AUTO-SUBMITTED: Multiple tab switching violations.');
            handleAutoSubmit();
          }
          
          return newCount;
        });
      }
    };

    // Anti-cheat: Developer tools detection
    const handleKeydown = (e: KeyboardEvent) => {
      // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase())) ||
          (e.ctrlKey && e.key.toLowerCase() === 'u')) {
        e.preventDefault();
        setWarningCount(prev => {
          const newCount = prev + 1;
          if (newCount >= 3) handleAutoSubmit();
          return newCount;
        });
      }
      
      // Prevent right-click context menu
      if (e.key === 'ContextMenu') {
        e.preventDefault();
      }
    };

    // Anti-cheat: Prevent copy-paste
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      alert('Copying is disabled during assessment.');
    };

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      alert('Pasting is disabled during assessment.');
    };

    // Prevent right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      alert('Right-click is disabled during assessment.');
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('paste', handlePaste);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      clearInterval(timerRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [testStarted, testCompleted]);

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  const handleAutoSubmit = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    const finalScore = calculateScore();
    setScore(finalScore);
    setPassed(finalScore >= 60);
    setTestCompleted(true);
    setShowExplanation(true);
    
    // Store result
    const result = {
      orderId,
      internshipId: id,
      score: finalScore,
      passed: finalScore >= 60,
      timestamp: new Date().toISOString(),
      timeTaken: 1800 - timeLeft,
      warningCount,
      answers
    };
    
    localStorage.setItem(`test_result_${orderId}`, JSON.stringify(result));
    
    // Schedule interview if passed
    if (finalScore >= 60) {
      scheduleAIInterview();
    }
    
    // Exit fullscreen
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  const scheduleAIInterview = () => {
    const interviewTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    const interviewDetails = {
      orderId,
      internshipId: id,
      scheduledTime: interviewTime.toISOString(),
      platform: 'ArjunaAI',
      meetingLink: `https://arjunaai.video/interview/${orderId}`,
      duration: '45 minutes',
      type: 'AI-powered technical interview',
      requirements: ['Webcam', 'Microphone', 'Stable internet'],
      topics: ['Technical skills', 'Problem-solving', 'Domain knowledge']
    };
    
    localStorage.setItem(`interview_${orderId}`, JSON.stringify(interviewDetails));
    
    // Simulate sending confirmation email
    console.log('AI Interview scheduled:', interviewDetails);
  };

  const startTest = async () => {
    setTestStarted(true);
    startTimeRef.current = Date.now();
    
    // Request fullscreen
    if (containerRef.current && !document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
      } catch (err) {
        console.log('Fullscreen not supported');
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'expert': return 'bg-red-100 text-red-800';
      case 'hard': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div ref={containerRef} className="max-w-3xl w-full bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 md:p-12 shadow-2xl">
          <div className="text-center text-white space-y-8">
            {/* Logo and Header */}
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-2xl">
                  <span className="text-5xl">🧠</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                Advanced Skill Assessment
              </h1>
              <p className="text-white/80 text-lg">Prove your expertise in 30 minutes</p>
            </div>

            {/* Test Details */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6">Assessment Details</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold">25</div>
                  <div className="text-sm text-white/70">Questions</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold">30:00</div>
                  <div className="text-sm text-white/70">Duration</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold">60%</div>
                  <div className="text-sm text-white/70">Passing Score</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold">Hard+</div>
                  <div className="text-sm text-white/70">Difficulty</div>
                </div>
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 mt-1">
                    ⚠️
                  </div>
                  <div>
                    <h4 className="font-bold">Strict Anti-Cheat Policy</h4>
                    <p className="text-white/70 text-sm">Tab switching, copy-paste, and developer tools are monitored</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mt-1">
                    ✅
                  </div>
                  <div>
                    <h4 className="font-bold">What happens if you pass?</h4>
                    <p className="text-white/70 text-sm">Interview link via email within 24 hours + AI interview with ArjunaAI</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rules Section */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-red-300 mb-4">Important Rules</h4>
              <ul className="space-y-3 text-left text-white/90 text-sm">
                <li className="flex items-center gap-3">
                  <span className="text-red-400 font-bold">•</span>
                  <span>3 tab switches allowed before auto-submission</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Copy-paste and right-click are disabled</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Test automatically submits when time ends</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-red-400 font-bold">•</span>
                  <span>Questions are tough - average 72 seconds each</span>
                </li>
              </ul>
            </div>

            {/* Start Button */}
            <button
              onClick={startTest}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-5 rounded-2xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/20"
            >
              Start 30-Minute Assessment
            </button>

            <p className="text-white/60 text-sm">
              By starting, you agree to our anti-cheat policy and confirm you're ready for a challenging test
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (testCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-200">
            <div className="text-center space-y-10">
              {/* Result Header */}
              <div className="space-y-4">
                <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center ${
                  passed ? 'bg-gradient-to-r from-emerald-100 to-green-100' : 'bg-gradient-to-r from-red-100 to-pink-100'
                }`}>
                  <span className="text-6xl">
                    {passed ? '🏆' : '💪'}
                  </span>
                </div>
                
                <h1 className={`text-4xl md:text-5xl font-bold ${passed ? 'text-emerald-600' : 'text-red-600'}`}>
                  {passed ? 'Congratulations!' : 'Keep Practicing!'}
                </h1>
                
                <p className="text-xl text-slate-600">
                  {passed 
                    ? `You scored ${score.toFixed(1)}% and qualified for the interview round!`
                    : `You scored ${score.toFixed(1)}%. Minimum 60% required to proceed.`}
                </p>
              </div>

              {/* Score Visualization */}
              <div className="max-w-md mx-auto">
                <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden mb-2">
                  <div 
                    className={`absolute top-0 left-0 h-full transition-all duration-1000 ${
                      passed ? 'bg-gradient-to-r from-emerald-400 to-green-500' : 'bg-gradient-to-r from-red-400 to-pink-500'
                    }`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>0%</span>
                  <span className="font-bold">60% Passing</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Next Steps */}
              {passed ? (
                <div className="space-y-8">
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-100">
                    <h3 className="text-2xl font-bold text-emerald-900 mb-6">🎯 Your Interview is Scheduled!</h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                          <span className="text-2xl">📧</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900">Interview Details via Email</h4>
                          <p className="text-slate-600">
                            You'll receive an email within <span className="font-bold">24 hours</span> with:
                          </p>
                          <ul className="mt-2 space-y-2 text-sm text-slate-700">
                            <li>• AI Interview link with ArjunaAI</li>
                            <li>• Scheduled time slot confirmation</li>
                            <li>• Preparation guidelines</li>
                            <li>• Technical requirements checklist</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                          <span className="text-2xl">🤖</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900">AI-Powered Interview</h4>
                          <p className="text-slate-600">
                            Your interview will be conducted using <span className="font-bold">ArjunaAI's advanced assessment platform</span> featuring:
                          </p>
                          <ul className="mt-2 space-y-2 text-sm text-slate-700">
                            <li>• Real-time coding evaluation</li>
                            <li>• Behavioral analysis</li>
                            <li>• Technical scenario simulations</li>
                            <li>• Instant feedback</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-emerald-600">98%</div>
                      <div className="text-sm text-slate-600">Success Rate</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-blue-600">24h</div>
                      <div className="text-sm text-slate-600">Response Time</div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl text-center">
                      <div className="text-2xl font-bold text-purple-600">150+</div>
                      <div className="text-sm text-slate-600">Companies</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => navigate('/dashboard')}
                      className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
                    >
                      Go to Dashboard
                    </button>
                    <button className="border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
                      Download Certificate
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
                    <h3 className="text-2xl font-bold text-amber-900 mb-4">📈 Improve Your Score</h3>
                    <p className="text-slate-600 mb-6">
                      You need {Math.ceil(15 - (questions.length * score / 100))} more correct answers to reach 60%.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-900">Recommended Actions:</h4>
                      <ul className="space-y-3 text-left">
                        <li className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">1</div>
                          <span>Retake the test after 24 hours</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">2</div>
                          <span>Review domain fundamentals</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">3</div>
                          <span>Try practice tests with detailed explanations</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => navigate(`/test/practice/${id}`)}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
                    >
                      Try Practice Test
                    </button>
                    <button 
                      onClick={() => navigate('/internships')}
                      className="border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all"
                    >
                      Browse Other Internships
                    </button>
                  </div>
                </div>
              )}

              {/* Explanation Toggle */}
              <div className="pt-8 border-t border-slate-100">
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="text-indigo-600 font-bold hover:text-indigo-700"
                >
                  {showExplanation ? 'Hide' : 'Show'} Question Explanations →
                </button>
                
                {showExplanation && (
                  <div className="mt-6 space-y-6 text-left">
                    <h4 className="text-xl font-bold text-slate-900">Question Explanations</h4>
                    {questions.map((q, idx) => (
                      <div key={q.id} className="bg-slate-50 p-4 rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-slate-900">Q{idx + 1}: {q.text}</span>
                          <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(q.difficulty)}`}>
                            {q.difficulty.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">
                          Your answer: {answers[q.id] !== undefined ? `Option ${String.fromCharCode(65 + answers[q.id])}` : 'Not answered'}
                          {answers[q.id] === q.correctAnswer ? ' ✅' : ' ❌'}
                        </p>
                        <p className="text-sm text-slate-700">
                          <span className="font-bold">Explanation:</span> {q.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Test Interface
  const currentQuestion = questions[currentIdx];
  const progressPercentage = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold">IA</span>
          </div>
          <div>
            <div className="font-bold text-slate-700">Skill Assessment</div>
            <div className="text-xs text-slate-500">Domain: {questions[0]?.domain}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          {/* Warning Indicator */}
          {warningCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg">
              <span className="text-lg">⚠️</span>
              <span className="font-bold text-sm">{warningCount}/3</span>
            </div>
          )}
          
          {/* Timer */}
          <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 ${
            timeLeft < 300 ? 'border-red-500 bg-red-50 text-red-600 animate-pulse' : 'border-slate-200 text-slate-700'
          }`}>
            <span className="text-lg">⏱️</span>
            <span className="font-mono font-bold text-xl">{formatTime(timeLeft)}</span>
          </div>
          
          {/* Submit Button */}
          <button
            onClick={handleAutoSubmit}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg transition-all"
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col lg:flex-row p-4 md:p-8 gap-8 max-w-7xl mx-auto w-full">
        {/* Question Panel */}
        <div className="flex-grow">
          <div className="bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-sm min-h-[500px] flex flex-col">
            {/* Question Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="space-y-2">
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                  Question {currentIdx + 1} of {questions.length}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(currentQuestion?.difficulty)}`}>
                  {currentQuestion?.difficulty?.toUpperCase() || 'MEDIUM'}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="hidden md:block w-48">
                <div className="text-xs text-slate-500 font-bold mb-1">
                  {Math.round(progressPercentage)}% Complete
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Question Text */}
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight mb-10 flex-grow">
              {currentQuestion?.text}
            </h3>

            {/* Options */}
            <div className="space-y-4">
              {currentQuestion?.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setAnswers(prev => ({ ...prev, [currentQuestion.id]: i }))}
                  className={`w-full text-left p-5 md:p-6 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 group ${
                    answers[currentQuestion.id] === i
                    ? 'border-indigo-600 bg-indigo-50/50 ring-4 ring-indigo-50'
                    : 'border-slate-100 hover:border-indigo-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-colors ${
                    answers[currentQuestion.id] === i 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className={`text-base md:text-lg ${answers[currentQuestion.id] === i ? 'text-indigo-900 font-medium' : 'text-slate-600'}`}>
                    {opt}
                  </span>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
                className="px-6 py-3 text-slate-600 font-bold disabled:opacity-30 hover:text-indigo-600 flex items-center gap-2"
              >
                ← Previous
              </button>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-500 hidden md:block">
                  Avg time: {currentQuestion?.timeRequired || 72}s
                </span>
                <div className="flex gap-1">
                  {questions.slice(0, 8).map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full ${
                        idx === currentIdx 
                          ? 'bg-indigo-600' 
                          : answers[questions[idx].id] !== undefined 
                            ? 'bg-emerald-500' 
                            : 'bg-slate-200'
                      }`}
                    />
                  ))}
                  {questions.length > 8 && <span className="text-xs text-slate-400">+{questions.length - 8}</span>}
                </div>
              </div>
              
              <button
                disabled={currentIdx === questions.length - 1}
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="px-8 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-indigo-100 hover:text-indigo-600 transition-colors disabled:opacity-30"
              >
                {currentIdx === questions.length - 1 ? 'Review' : 'Next →'}
              </button>
            </div>
          </div>
        </div>

        {/* Side Panel - Question Palette (Desktop) */}
        <div className="hidden lg:block w-80">
          <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm sticky top-24">
            <h4 className="font-bold text-slate-900 mb-6">Question Palette</h4>
            
            <div className="grid grid-cols-5 gap-3 mb-8">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`aspect-square rounded-xl font-bold transition-all relative ${
                    currentIdx === idx 
                      ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-100'
                      : answers[q.id] !== undefined
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                  {answers[q.id] === undefined && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
            
            {/* Legend */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-indigo-600"></div>
                <span className="text-sm text-slate-600">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-emerald-500"></div>
                <span className="text-sm text-slate-600">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-slate-200"></div>
                <span className="text-sm text-slate-600">Not answered</span>
              </div>
            </div>
            
            {/* Time Per Question */}
            <div className="mt-8 p-4 bg-slate-50 rounded-xl">
              <div className="text-sm font-bold text-slate-700 mb-2">Time Strategy</div>
              <div className="text-xs text-slate-600">
                Avg: 72s/question • {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')} remaining
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const palette = document.getElementById('mobile-palette');
                palette?.classList.toggle('hidden');
              }}
              className="flex items-center gap-2 text-slate-700"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                <span className="text-indigo-600 font-bold">📊</span>
              </div>
              <span className="text-sm font-medium">Palette</span>
            </button>
            
            <div className="text-sm font-mono font-bold">
              {formatTime(timeLeft)}
            </div>
          </div>
          
          <button
            onClick={handleAutoSubmit}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold text-sm"
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* Mobile Palette Modal */}
      <div id="mobile-palette" className="lg:hidden fixed inset-0 bg-black/50 z-50 hidden">
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Question Palette</h3>
            <button 
              onClick={() => document.getElementById('mobile-palette')?.classList.add('hidden')}
              className="text-slate-500 p-2"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-5 gap-3">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentIdx(idx);
                  document.getElementById('mobile-palette')?.classList.add('hidden');
                }}
                className={`aspect-square rounded-xl text-sm font-bold transition-all ${
                  currentIdx === idx 
                    ? 'bg-indigo-600 text-white scale-110 shadow-lg'
                    : answers[q.id] !== undefined
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-400'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillTestEngine;
