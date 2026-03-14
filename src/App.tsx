import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  CheckCircle2, 
  ChevronRight, 
  Trophy, 
  ArrowLeft,
  BrainCircuit,
  Code2,
  Zap,
  UserCircle2,
  BarChart3
} from 'lucide-react';
import { interviewLevels } from './data';
import { Level, UserProgress, Scorecard } from './types';

// --- Types ---
type AppState = 'DASHBOARD' | 'QUIZ' | 'FEEDBACK';

export default function App() {
  const [state, setState] = useState<AppState>('DASHBOARD');
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('interview-challenge-progress');
    return saved ? JSON.parse(saved) : { unlockedLevel: 1, completedLevels: [] };
  });
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [quizResults, setQuizResults] = useState<{
    score: number;
    answers: { questionId: string; isCorrect: boolean }[];
    scorecard?: Scorecard;
  } | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('interview-challenge-progress', JSON.stringify(progress));
  }, [progress]);

  const handleStartLevel = (level: Level) => {
    if (level.number <= progress.unlockedLevel) {
      setCurrentLevel(level);
      setState('QUIZ');
    }
  };

  const handleQuizComplete = (score: number, answers: { questionId: string; isCorrect: boolean }[]) => {
    let scorecard: Scorecard | undefined;
    
    // Generate scorecard for Senior levels (8-10)
    if (currentLevel && currentLevel.number >= 8) {
      scorecard = {
        logic: Math.min(10, score * 2 + Math.floor(Math.random() * 2)),
        optimization: Math.min(10, score * 2 - Math.floor(Math.random() * 2)),
        communication: Math.min(10, 8 + Math.floor(Math.random() * 3))
      };
    }

    setQuizResults({ score, answers, scorecard });
    setState('FEEDBACK');

    if (score >= 4) {
      setProgress(prev => ({
        unlockedLevel: Math.max(prev.unlockedLevel, currentLevel!.number + 1),
        completedLevels: Array.from(new Set([...prev.completedLevels, currentLevel!.number]))
      }));
    }
  };

  const handleBackToDashboard = () => {
    setState('DASHBOARD');
    setCurrentLevel(null);
    setQuizResults(null);
  };

  const hiredProgress = (progress.completedLevels.length / 10) * 100;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BrainCircuit className="text-blue-500" size={20} />
              <span className="text-sm font-bold tracking-tight uppercase">Interview Master</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Status:</span>
              <span className={`text-xs font-bold uppercase tracking-widest ${hiredProgress === 100 ? 'text-emerald-400' : 'text-blue-400'}`}>
                {hiredProgress === 100 ? 'HIRED' : 'CANDIDATE'}
              </span>
            </div>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${hiredProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <AnimatePresence mode="wait">
          {state === 'DASHBOARD' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2">
                <h1 className="text-4xl font-black tracking-tight text-white">Technical Interview Challenge</h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  Master the full-stack interview process. Unlock 10 levels of increasing difficulty, 
                  from syntax basics to senior architecture.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {interviewLevels.map((level) => (
                  <LevelCard 
                    key={level.number} 
                    level={level} 
                    isLocked={level.number > progress.unlockedLevel}
                    isCompleted={progress.completedLevels.includes(level.number)}
                    onClick={() => handleStartLevel(level)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {state === 'QUIZ' && currentLevel && (
            <QuizView 
              level={currentLevel} 
              onComplete={handleQuizComplete}
              onBack={handleBackToDashboard}
            />
          )}

          {state === 'FEEDBACK' && currentLevel && quizResults && (
            <FeedbackView 
              level={currentLevel}
              results={quizResults}
              onBack={handleBackToDashboard}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- Sub-Components ---

function LevelCard({ level, isLocked, isCompleted, onClick }: { 
  level: Level; 
  isLocked: boolean; 
  isCompleted: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={!isLocked ? { scale: 1.02, translateY: -4 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={isLocked}
      className={`relative group p-6 rounded-2xl border text-left transition-all duration-300 ${
        isLocked 
          ? 'bg-slate-900/50 border-slate-800 grayscale opacity-60 cursor-not-allowed' 
          : isCompleted
            ? 'bg-slate-900 border-emerald-500/30 hover:border-emerald-500/50'
            : 'bg-slate-900 border-blue-500/30 hover:border-blue-500/50'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${isLocked ? 'bg-slate-800' : 'bg-blue-500/10 text-blue-500'}`}>
          {isLocked ? <Lock size={18} /> : <Code2 size={18} />}
        </div>
        {isCompleted && (
          <div className="text-emerald-500">
            <CheckCircle2 size={18} />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          Level {level.number} • {level.difficulty}
        </div>
        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
          {level.title}
        </h3>
      </div>

      {!isLocked && (
        <div className="mt-4 flex items-center text-xs font-bold text-blue-500 group-hover:translate-x-1 transition-transform">
          {isCompleted ? 'REVIEW CHALLENGE' : 'START CHALLENGE'}
          <ChevronRight size={14} />
        </div>
      )}
    </motion.button>
  );
}

function QuizView({ level, onComplete, onBack }: { 
  level: Level; 
  onComplete: (score: number, answers: { questionId: string; isCorrect: boolean }[]) => void;
  onBack: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ questionId: string; isCorrect: boolean }[]>([]);

  const currentQuestion = level.questions[currentIndex];

  const handleNext = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const newAnswers = [...answers, { questionId: currentQuestion.id, isCorrect }];
    
    if (currentIndex < level.questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      const score = newAnswers.filter(a => a.isCorrect).length;
      onComplete(score, newAnswers);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Question {currentIndex + 1} of {level.questions.length}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl">
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-bold uppercase tracking-widest">
            {level.difficulty} Challenge
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            {currentQuestion.text}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(index)}
              className={`p-5 rounded-xl border text-left transition-all duration-200 ${
                selectedOption === index
                  ? 'bg-blue-500/10 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                  : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                  selectedOption === index ? 'border-blue-500 bg-blue-500 text-white' : 'border-slate-600'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                {option}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className={`w-full py-4 rounded-xl font-bold tracking-widest transition-all ${
            selectedOption !== null
              ? 'bg-blue-500 text-white hover:bg-blue-400 shadow-lg shadow-blue-500/20'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          {currentIndex === level.questions.length - 1 ? 'FINISH CHALLENGE' : 'NEXT QUESTION'}
        </button>
      </div>
    </motion.div>
  );
}

function FeedbackView({ level, results, onBack }: { 
  level: Level; 
  results: { score: number; answers: { questionId: string; isCorrect: boolean }[]; scorecard?: Scorecard };
  onBack: () => void;
}) {
  const isSuccess = results.score >= 4;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="text-center space-y-4">
        <div className={`inline-flex p-4 rounded-full ${isSuccess ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
          {isSuccess ? <Trophy size={48} /> : <Zap size={48} />}
        </div>
        <h2 className="text-4xl font-black tracking-tight">
          {isSuccess ? 'Level Cleared!' : 'Challenge Failed'}
        </h2>
        <p className="text-slate-400">
          You scored <span className={`font-bold ${isSuccess ? 'text-emerald-400' : 'text-red-400'}`}>{results.score} out of 5</span>.
          {isSuccess ? ' You have unlocked the next stage.' : ' You need at least 4 correct answers to progress.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <BarChart3 size={16} />
            Detailed Review
          </h3>
          <div className="space-y-4">
            {level.questions.map((q, idx) => {
              const answer = results.answers.find(a => a.questionId === q.id);
              return (
                <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-bold text-white">{idx + 1}. {q.text}</h4>
                    {answer?.isCorrect ? (
                      <span className="text-emerald-500 flex-shrink-0"><CheckCircle2 size={20} /></span>
                    ) : (
                      <span className="text-red-500 flex-shrink-0"><Zap size={20} /></span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed italic">
                    "{q.explanation}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <UserCircle2 size={16} />
              Interviewer Feedback
            </h3>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BrainCircuit size={80} />
              </div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Senior Lead Engineer</div>
                    <div className="text-[10px] text-blue-400 uppercase font-bold tracking-widest">Hiring Manager</div>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed italic text-sm">
                  "{level.interviewerFeedback}"
                </p>
              </div>
            </div>
          </div>

          {results.scorecard && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <BarChart3 size={16} />
                Performance Scorecard
              </h3>
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                {[
                  { label: 'Logic', value: results.scorecard.logic },
                  { label: 'Optimization', value: results.scorecard.optimization },
                  { label: 'Communication', value: results.scorecard.communication },
                ].map((stat) => (
                  <div key={stat.label} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                      <span className="text-slate-500">{stat.label}</span>
                      <span className="text-blue-400">{stat.value}/10</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.value * 10}%` }}
                        className="h-full bg-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button 
            onClick={onBack}
            className="w-full py-4 bg-blue-500 text-white rounded-2xl font-bold text-sm hover:bg-blue-400 transition-all transform hover:scale-[1.02] shadow-xl shadow-blue-500/20"
          >
            RETURN TO DASHBOARD
          </button>
        </div>
      </div>
    </motion.div>
  );
}
