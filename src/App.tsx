/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Flame, 
  Target, 
  ChevronRight, 
  Code2, 
  MessageSquare, 
  BookOpen, 
  UserCheck,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Sparkles,
  Award,
  Book,
  Search,
  Filter,
  LayoutDashboard
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Editor from 'react-simple-code-editor';
// @ts-ignore
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-json';
import { lessons, Lesson, Question } from './data/lessons';
import { glossaryTerms, GlossaryTerm } from './data/glossary';

type View = 'dashboard' | 'quiz' | 'stats' | 'glossary' | 'review' | 'certificate';

interface UserStats {
  xp: number;
  streak: number;
  completedLessons: string[];
  totalAnswers: number;
  correctAnswers: number;
  activeLesson?: {
    lessonId: string;
    questionIndex: number;
  } | null;
}

export default function App() {
  const [view, setViewState] = useState<View>('dashboard');
  const setView = (v: View) => {
    setViewState(v);
  };
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('devlingo_stats');
    return saved ? JSON.parse(saved) : {
      xp: 0,
      streak: 14,
      completedLessons: [],
      totalAnswers: 0,
      correctAnswers: 0
    };
  });

  const [feedback, setFeedback] = useState<{ isCorrect: boolean; show: boolean } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editableCode, setEditableCode] = useState('');

  useEffect(() => {
    localStorage.setItem('devlingo_stats', JSON.stringify(stats));
  }, [stats]);

  const handleStartLesson = (lesson: Lesson, resumeIndex?: number) => {
    const startIndex = resumeIndex !== undefined ? resumeIndex : 0;
    setSelectedLesson(lesson);
    setCurrentQuestionIndex(startIndex);
    setEditableCode(lesson.questions[startIndex].code || '');
    setView('quiz');
    
    // Save active lesson state
    setStats(prev => ({
      ...prev,
      activeLesson: { lessonId: lesson.id, questionIndex: startIndex }
    }));
  };

  const handleAnswerSelect = (optionIndex: number) => {
    if (!selectedLesson || feedback?.show) return;

    const question = selectedLesson.questions[currentQuestionIndex];
    const isCorrect = optionIndex === question.correctAnswer;

    setFeedback({ isCorrect, show: true });
    
    setStats(prev => ({
      ...prev,
      totalAnswers: prev.totalAnswers + 1,
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      xp: isCorrect ? prev.xp + 10 : prev.xp,
    }));

    if (isCorrect) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#22d3ee', '#ffffff']
      });
    }
  };

  const handleNextQuestion = () => {
    if (!selectedLesson) return;
    
    setFeedback(null);
    if (currentQuestionIndex < selectedLesson.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setEditableCode(selectedLesson.questions[nextIndex].code || '');
      
      // Update saved progress
      setStats(prev => ({
        ...prev,
        activeLesson: { lessonId: selectedLesson.id, questionIndex: nextIndex }
      }));
    } else {
      // Completed lesson
      setStats(prev => ({
        ...prev,
        xp: prev.xp + selectedLesson.xpReward,
        completedLessons: prev.completedLessons.includes(selectedLesson.id) 
          ? prev.completedLessons 
          : [...prev.completedLessons, selectedLesson.id],
        streak: prev.streak + 1, // Simplified streak for demo
        activeLesson: null // Clear progress on completion
      }));
      
      // Transition to review screen instead of dashboard
      setView('review');
    }
  };

  const relatedGlossaryItems = useMemo(() => {
    if (!selectedLesson || !selectedLesson.relatedTerms) return [];
    return glossaryTerms.filter(item => selectedLesson.relatedTerms?.includes(item.term));
  }, [selectedLesson]);

  const isAllLessonsCompleted = useMemo(() => stats.completedLessons.length === lessons.length, [stats.completedLessons]);

  const levelProgress = useMemo(() => (stats.xp % 500) / 5, [stats.xp]);

  const filteredGlossary = useMemo(() => {
    return glossaryTerms.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.translation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchTerm, selectedCategory]);

  const categories = ['All', 'Agile', 'Code', 'OOP', 'Infrastructure', 'Career'];

  return (
    <div className="h-screen flex flex-col bg-brand-dark overflow-hidden font-sans">
      {/* Immersive Header */}
      <nav className="h-16 border-b border-brand-cyan/20 bg-brand-surface flex items-center justify-between px-8 shrink-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-cyan rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <span className="text-white font-bold text-xs">DL</span>
          </div>
          <span className="font-bold tracking-tight text-xl text-white">DevLingo <span className="text-brand-cyan font-mono text-xs ml-2 opacity-60">ID</span></span>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="text-orange-400 text-sm font-bold">🔥 {stats.streak} DAY STREAK</div>
          </div>
          <div className="flex flex-col items-end hidden sm:flex">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              Pangkat: {stats.xp >= 100 ? 'Maestro' : stats.xp >= 50 ? 'Lanjutan' : 'Ahli Teknis'}
            </div>
            <div className="h-1.5 w-32 bg-slate-800 rounded-full mt-1 overflow-hidden border border-slate-700">
              <div 
                className="h-full bg-brand-cyan shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all duration-500" 
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-brand-cyan/50 p-0.5">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-brand-cyan to-blue-600 flex items-center justify-center text-[10px] font-bold text-white uppercase italic">
              User
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 border-r border-brand-cyan/10 bg-brand-aside p-6 flex-col gap-6 shrink-0">
          <div className="space-y-6">
            <div>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Navigasi Utama</h3>
              <ul className="space-y-1">
                <li 
                  onClick={() => { setView('dashboard'); setSelectedLesson(null); }}
                  className={`flex items-center gap-3 p-2.5 transition-all rounded-md cursor-pointer text-sm font-medium ${
                    view === 'dashboard' && !selectedLesson
                    ? 'bg-brand-cyan/10 text-brand-cyan shadow-sm shadow-brand-cyan/20' 
                    : 'text-slate-400 hover:bg-white/5'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </li>
                <li 
                  onClick={() => { if(isAllLessonsCompleted) setView('certificate'); }}
                  className={`flex items-center gap-3 p-2.5 transition-all rounded-md cursor-pointer text-sm font-medium ${
                    view === 'certificate'
                    ? 'bg-brand-cyan/10 text-brand-cyan shadow-sm shadow-brand-cyan/20' 
                    : isAllLessonsCompleted ? 'text-slate-400 hover:bg-white/5' : 'text-slate-700 cursor-not-allowed grayscale'
                  }`}
                >
                  <Award className="w-4 h-4" /> Sertifikat
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Materi Belajar</h3>
              <ul className="space-y-1">
                {lessons.map((lesson) => (
                  <li 
                    key={lesson.id}
                    onClick={() => handleStartLesson(lesson)}
                    className={`flex items-center gap-3 p-2.5 transition-all rounded-md cursor-pointer text-sm font-medium ${
                      selectedLesson?.id === lesson.id 
                      ? 'bg-brand-cyan/10 border-brand-cyan text-brand-cyan' 
                      : 'text-slate-400 hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${stats.completedLessons.includes(lesson.id) ? 'bg-brand-cyan' : 'bg-slate-700'}`} />
                    {lesson.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-auto">
            <div className="p-4 rounded-xl card-gradient">
              <div className="text-xs text-indigo-300 font-bold mb-1">DAILY MISSION</div>
              <div className="text-sm text-white mb-3">Solve 5 syntax challenges to unlock the 'Clean Coder' badge.</div>
              <div className="text-[10px] text-indigo-400 font-mono">PROGRESS: {stats.completedLessons.length}/5</div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main data-testid="main-content" className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center">
          <div className="w-full max-w-5xl flex flex-col gap-8">
            <AnimatePresence mode="wait">
              {view === 'dashboard' && (
                <motion.div 
                  key="dashboard"
                  data-testid="dashboard-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  {/* Dashboard Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-1">
                      <h1 className="text-4xl font-bold text-white tracking-tight border-l-4 border-brand-cyan pl-4">Technical <span className="text-brand-cyan uppercase">English</span></h1>
                      <p className="text-slate-400">Tingkatkan skill bahasa Inggris untuk karir global kamu.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {isAllLessonsCompleted && (
                        <button 
                          onClick={() => setView('certificate')}
                          className="bg-yellow-500 hover:bg-yellow-400 text-brand-dark px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] animate-bounce"
                        >
                          Klaim Sertifikat
                        </button>
                      )}
                      <div className="bg-slate-900 border border-brand-cyan/20 px-6 py-3 rounded-2xl flex flex-col items-end shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-2 h-full bg-brand-cyan opacity-20" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pencapaian XP</span>
                        <span className="text-2xl font-bold text-white font-mono leading-none">+{stats.xp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Grid: Streak & Core Stats */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Streak Visualizer */}
                    <div className="lg:col-span-8 bg-[#0d141d] rounded-3xl border border-brand-cyan/10 p-6 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Flame className="w-32 h-32 text-orange-500" />
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                           <div className="p-2 bg-orange-500/10 rounded-lg">
                             <Flame className="w-5 h-5 text-orange-500" />
                           </div>
                           <h3 className="text-lg font-bold text-white">Daily Streak</h3>
                        </div>
                        <div className="flex justify-between items-end">
                           <div className="space-y-1">
                             <span className="text-5xl font-black text-white font-mono">{stats.streak}</span>
                             <span className="text-slate-400 block text-xs font-bold uppercase tracking-widest">Hari Berturut-turut</span>
                           </div>
                           <div className="flex gap-2 mb-2">
                             {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map((day, i) => {
                               // Simulate active days based on streak (at least highlighting the current count)
                               const isActive = i < (stats.streak % 8); 
                               return (
                                 <div key={i} className="flex flex-col items-center gap-2">
                                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-500 ${isActive ? 'bg-brand-cyan border-brand-cyan text-brand-dark shadow-[0_0_10px_rgba(6,182,212,0.4)] scale-110' : 'bg-slate-800 border-slate-700 text-slate-500'}`}>
                                     {isActive ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />}
                                   </div>
                                   <span className="text-[10px] font-bold text-slate-600 uppercase">{day}</span>
                                 </div>
                               );
                             })}
                           </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats Column */}
                    <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                      <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex items-center gap-4 hover:border-brand-cyan/30 transition-colors">
                        <div className="p-3 bg-brand-cyan/10 rounded-2xl">
                          <Target className="w-6 h-6 text-brand-cyan" />
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest block">Accuracy</span>
                          <span className="text-xl font-bold text-white font-mono">{stats.totalAnswers > 0 ? Math.round((stats.correctAnswers / stats.totalAnswers) * 100) : 0}%</span>
                        </div>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl flex items-center gap-4 hover:border-brand-cyan/30 transition-colors">
                        <div className="p-3 bg-blue-500/10 rounded-2xl">
                          <CheckCircle2 className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest block">Resolved</span>
                          <span className="text-xl font-bold text-white font-mono">{stats.correctAnswers}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Grid: Continue Learning & Vocabulary */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                     {/* Continue Learning */}
                     <div className="lg:col-span-7 space-y-4">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                          < Sparkles className="w-4 h-4 text-brand-cyan" /> {stats.activeLesson ? 'Lanjutkan Progress' : 'Lanjutkan Belajar'}
                        </h3>
                        <div 
                          role="button"
                          tabIndex={0}
                          aria-label={stats.activeLesson ? 'Lanjutkan Modul' : 'Mulai Modul'}
                          onClick={() => {
                            if (stats.activeLesson) {
                              const lesson = lessons.find(l => l.id === stats.activeLesson?.lessonId);
                              if (lesson) {
                                handleStartLesson(lesson, stats.activeLesson.questionIndex);
                                return;
                              }
                            }
                            handleStartLesson(lessons.find(l => !stats.completedLessons.includes(l.id)) || lessons[0]);
                          }}
                          className="group bg-gradient-to-br from-brand-cyan/20 via-brand-surface to-brand-aside border border-brand-cyan/30 p-8 rounded-3xl cursor-pointer hover:border-brand-cyan/60 transition-all shadow-2xl relative overflow-hidden"
                        >
                          <div className="absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity transform -rotate-12 group-hover:scale-110">
                            <Code2 className="w-48 h-48" />
                          </div>
                          <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-3">
                              <span className="px-3 py-1 bg-brand-cyan text-brand-dark text-[10px] font-bold rounded uppercase tracking-tighter shadow-lg shadow-brand-cyan/20">
                                {stats.activeLesson ? 'Ongoing' : 'Up Next'}
                              </span>
                              <span className="text-xs text-slate-400 font-mono">
                                {stats.activeLesson 
                                  ? `Module ${stats.activeLesson.lessonId} // Q${stats.activeLesson.questionIndex + 1}` 
                                  : `Module ${lessons.find(l => !stats.completedLessons.includes(l.id))?.id || lessons[0].id}`
                                }
                              </span>
                            </div>
                            <div>
                              <h4 className="text-2xl font-bold text-white group-hover:text-brand-cyan transition-colors">
                                {stats.activeLesson 
                                  ? (lessons.find(l => l.id === stats.activeLesson?.lessonId)?.title || 'Resume Lesson')
                                  : (lessons.find(l => !stats.completedLessons.includes(l.id))?.title || lessons[0].title)
                                }
                              </h4>
                              <p className="text-slate-400 mt-2 text-sm leading-relaxed max-w-sm">
                                {stats.activeLesson 
                                  ? `Lanjutkan pertanyaan ke-${stats.activeLesson.questionIndex + 1} dari modul ini.`
                                  : (lessons.find(l => !stats.completedLessons.includes(l.id))?.description || lessons[0].description)
                                }
                              </p>
                            </div>
                            <button className="flex items-center gap-2 text-brand-cyan font-bold text-sm group-hover:gap-4 transition-all uppercase tracking-widest">
                              {stats.activeLesson ? 'Resume Module' : 'Launch Module'} <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                     </div>

                    {/* Random Vocabulary Card */}
                    <div className="lg:col-span-5 space-y-4">
                       <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                         <Book className="w-4 h-4 text-brand-cyan" /> Tinjauan Cepat
                       </h3>
                       <div 
                        onClick={() => setView('glossary')}
                        className="bg-slate-900 border border-slate-800 p-8 rounded-3xl h-full flex flex-col justify-between hover:border-brand-cyan/30 cursor-pointer transition-colors shadow-2xl"
                       >
                         <div>
                            <div className="text-[10px] font-bold text-brand-cyan/60 uppercase tracking-widest mb-2 px-2 py-0.5 bg-brand-cyan/5 border border-brand-cyan/10 rounded w-max">
                              Vocab Highlight
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-2">{glossaryTerms[Math.floor(Date.now() / 86400000) % glossaryTerms.length].term}</h4>
                            <p className="text-sm text-slate-400 leading-relaxed italic line-clamp-3">
                              "{glossaryTerms[Math.floor(Date.now() / 86400000) % glossaryTerms.length].definition}"
                            </p>
                         </div>
                         <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="text-xs text-slate-500">Ketuk untuk lihat kamus lengkap</span>
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                               <ChevronRight className="w-4 h-4 text-slate-400" />
                            </div>
                         </div>
                       </div>
                    </div>
                  </div>

                  {/* Modules Horizontal List */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Semua Modul</h3>
                      <div className="flex gap-2">
                         <div className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                         <div className="w-2 h-2 rounded-full bg-slate-800" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                       {lessons.map((lesson) => {
                          const isCompleted = stats.completedLessons.includes(lesson.id);
                          const isActive = stats.activeLesson?.lessonId === lesson.id;
                          const Icon = {
                            MessageSquare,
                            Code2,
                            BookOpen,
                            UserCheck
                          }[lesson.icon] || Code2;

                          return (
                            <div 
                              key={lesson.id}
                              onClick={() => {
                                if (isActive) {
                                  handleStartLesson(lesson, stats.activeLesson?.questionIndex);
                                } else {
                                  handleStartLesson(lesson);
                                }
                              }}
                              className={`group bg-[#0d141d] rounded-2xl border p-5 flex flex-col gap-4 cursor-pointer transition-all hover:bg-brand-cyan/5 shadow-xl relative overflow-hidden h-full min-h-[160px] ${
                                isActive 
                                ? 'border-brand-cyan/40 scale-[1.02] shadow-[0_0_20px_rgba(6,182,212,0.1)]' 
                                : 'border-brand-cyan/10 hover:border-brand-cyan/40'
                              }`}
                            >
                              <div className="flex justify-between items-start z-10">
                                 <div className={`p-2.5 rounded-xl ${isCompleted || isActive ? 'bg-brand-cyan/10 text-brand-cyan' : 'bg-slate-800 text-slate-400'}`}>
                                   <Icon className="w-5 h-5" />
                                 </div>
                                 {isCompleted && <CheckCircle2 className="w-4 h-4 text-brand-cyan animate-pulse" />}
                                 {isActive && (
                                   <div className="flex items-center gap-1.5 bg-brand-cyan/20 px-2 py-1 rounded text-[8px] font-black uppercase text-brand-cyan tracking-widest border border-brand-cyan/30">
                                     <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                                     In Progress
                                   </div>
                                 )}
                              </div>
                              <div className="z-10">
                                <h3 className="text-md font-bold text-white group-hover:text-brand-cyan transition-colors line-clamp-1">
                                  {lesson.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{lesson.difficulty}</span>
                                  <div className="w-1 h-1 rounded-full bg-slate-700" />
                                  <span className="text-[8px] font-bold text-brand-cyan/60 uppercase tracking-widest">
                                    {isActive ? `Q${(stats.activeLesson?.questionIndex ?? 0) + 1}/${lesson.questions.length}` : `+${lesson.xpReward} XP`}
                                  </span>
                                </div>
                              </div>
                              {isCompleted && (
                                <div className="absolute -bottom-2 -right-2 opacity-5 scale-150 rotate-12">
                                  <Trophy className="w-16 h-16 text-brand-cyan" />
                                </div>
                              )}
                              {isActive && (
                                <div className="absolute bottom-0 left-0 h-1 bg-brand-cyan" style={{ width: `${((stats.activeLesson?.questionIndex ?? 0) + 1) / lesson.questions.length * 100}%` }} />
                              )}
                            </div>
                          );
                       })}
                    </div>
                  </div>
                </motion.div>
              )}

              {view === 'quiz' && selectedLesson && (
                <motion.div 
                  key="quiz"
                  data-testid="quiz-view"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  className="flex flex-col gap-8 max-w-4xl w-full mx-auto"
                >
                <div className="flex justify-between items-center">
                    <button 
                      onClick={() => { setView('dashboard'); setSelectedLesson(null); }}
                      className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      <span className="text-sm font-bold uppercase">Kembali ke Dashboard</span>
                    </button>
                    <div className="bg-slate-900/80 border border-slate-700 px-4 py-2 rounded-lg flex items-center gap-3">
                      <span className="text-brand-cyan font-mono text-xs uppercase tracking-widest font-bold">Materi {selectedLesson.id.replace('-', '.')}</span>
                      <div className="w-px h-4 bg-slate-700"></div>
                      <span className="text-white font-mono text-sm uppercase">Soal {currentQuestionIndex + 1} / {selectedLesson.questions.length}</span>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 flex flex-col gap-6">
                      <div className="bg-[#0d141d] rounded-2xl border border-brand-cyan/20 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <p className="text-xl text-slate-200 leading-relaxed mb-8">
                          {selectedLesson.questions[currentQuestionIndex].text}
                        </p>
                        
                        {selectedLesson.questions[currentQuestionIndex].code && (
                          <div className="flex flex-col gap-3">
                            <div className="bg-[#05070a] rounded-xl font-mono text-sm border border-slate-800 shadow-inner overflow-hidden relative group">
                               <div className="flex items-center justify-between px-4 py-2 bg-slate-900/50 border-b border-slate-800">
                                 <div className="flex items-center gap-4">
                                   <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">INTERACTIVE_EDITOR.exe</span>
                                   <button 
                                     onClick={() => setEditableCode(selectedLesson.questions[currentQuestionIndex].code || '')}
                                     className="text-[8px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-brand-cyan transition-colors border border-slate-700"
                                   >
                                     RESET_CODE
                                   </button>
                                 </div>
                                 <div className="flex gap-1.5">
                                   <div className="w-2 h-2 rounded-full bg-red-900/50" />
                                   <div className="w-2 h-2 rounded-full bg-yellow-900/50" />
                                   <div className="w-2 h-2 rounded-full bg-green-900/50" />
                                 </div>
                               </div>
                               <div className="p-2">
                                <Editor
                                  value={editableCode}
                                  onValueChange={code => setEditableCode(code)}
                                  highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
                                  padding={20}
                                  className="font-mono text-sm min-h-[100px] outline-none"
                                  style={{
                                    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                                    fontSize: 14,
                                  }}
                                />
                               </div>
                            </div>
                            <div className="flex justify-end italic">
                              <span className="text-[10px] text-slate-600 uppercase tracking-tight">Tips: Kamu bisa mengubah kode di atas untuk mencoba kosa kata baru.</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedLesson.questions[currentQuestionIndex].options.map((option, idx) => {
                          const isCorrect = idx === selectedLesson.questions[currentQuestionIndex].correctAnswer;

                          return (
                            <button
                              key={idx}
                              data-testid={`quiz-option-${idx}`}
                              disabled={!!feedback}
                              onClick={() => handleAnswerSelect(idx)}
                              className={`
                                relative p-5 bg-slate-900 border text-left rounded-xl transition-all group overflow-hidden
                                ${!feedback 
                                  ? 'border-slate-700 hover:border-brand-cyan hover:bg-brand-cyan/5 active:scale-95' 
                                  : isCorrect 
                                    ? 'border-brand-cyan bg-brand-cyan/10' 
                                    : 'border-slate-800 opacity-50'
                                }
                              `}
                            >
                              <div className="flex items-center gap-4 z-10 relative">
                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${
                                  isCorrect && feedback?.show 
                                  ? 'bg-brand-cyan text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]' 
                                  : 'bg-slate-800 group-hover:bg-brand-cyan group-hover:text-white'
                                }`}>
                                  {String.fromCharCode(65 + idx)}
                                </span>
                                <span className={`font-medium tracking-wide ${isCorrect && feedback?.show ? 'text-brand-cyan' : 'text-slate-300'}`}>
                                  {option}
                                </span>
                              </div>
                              {isCorrect && feedback?.show && (
                                <div className="absolute -top-4 -right-12 bg-brand-cyan/20 w-24 h-12 rotate-45 flex items-end justify-center pb-1 text-[10px] font-bold text-brand-cyan">
                                   VALID
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Secondary Detail Column during Quiz */}
                    <div className="w-full lg:w-72 flex flex-col gap-4">
                      <AnimatePresence>
                        {feedback?.show && (
                          <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className={`p-6 rounded-2xl border flex flex-col gap-4 ${feedback.isCorrect ? 'border-brand-cyan/20 bg-brand-cyan/10' : 'border-red-500/20 bg-red-500/5'}`}
                          >
                            <div className="flex items-center gap-2">
                               {feedback.isCorrect 
                                 ? <CheckCircle2 className="text-brand-cyan w-5 h-5" /> 
                                 : <XCircle className="text-red-500 w-5 h-5" />
                               }
                               <span className={`text-xs font-bold uppercase tracking-widest ${feedback.isCorrect ? 'text-brand-cyan' : 'text-red-500'}`}>
                                 {feedback.isCorrect ? 'Jawaban Benar!' : 'Belum Tepat'}
                               </span>
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed italic">
                              {selectedLesson.questions[currentQuestionIndex].explanation}
                            </p>
                            <button 
                              onClick={handleNextQuestion}
                              className="w-full py-3 bg-brand-cyan text-brand-dark font-bold rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all active:scale-95"
                            >
                              {currentQuestionIndex < selectedLesson.questions.length - 1 ? 'SOAL BERIKUTNYA' : 'SELESAIKAN MODUL'}
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-5 flex flex-col">
                        <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Module Intel</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400 font-mono">Complexity</span>
                            <span className="text-xs font-bold text-slate-200">{selectedLesson.difficulty}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400 font-mono">XP Potential</span>
                            <span className="text-xs font-bold text-yellow-500">+{selectedLesson.xpReward}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400 font-mono">Success Rate</span>
                            <span className="text-xs font-bold text-brand-cyan">94.2%</span>
                          </div>
                        </div>
                        <div className="mt-8 pt-4 border-t border-white/5">
                           <div className="text-[10px] text-slate-500 font-bold mb-2 uppercase tracking-widest">Global Ranking</div>
                           <div className="space-y-2">
                             <div className="flex items-center justify-between py-1">
                               <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-500 text-[8px] font-bold">1</div>
                                  <span className="text-[10px] text-slate-400 italic">Budi_Frontend</span>
                               </div>
                               <span className="text-[8px] font-mono text-slate-600">12.4k</span>
                             </div>
                             <div className="flex items-center justify-between py-1 px-2 bg-brand-cyan/5 rounded border border-brand-cyan/10">
                               <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan text-[8px] font-bold">2</div>
                                  <span className="text-[10px] text-white font-bold uppercase tracking-tighter">Anda</span>
                               </div>
                               <span className="text-[8px] font-mono text-brand-cyan">{stats.xp}</span>
                             </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {view === 'review' && selectedLesson && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-4xl w-full mx-auto space-y-8"
                >
                  <div className="text-center space-y-4 py-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-cyan/20 border-2 border-brand-cyan/50 text-brand-cyan mb-2 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                      <Trophy className="w-10 h-10" />
                    </div>
                    <h2 className="text-4xl font-black text-white tracking-tight uppercase">Modul Selesai!</h2>
                    <p className="text-slate-400 max-w-md mx-auto">Selamat! Kamu baru saja menyelesaikan <span className="text-brand-cyan font-bold">{selectedLesson.title}</span>. Mari tinjau istilah penting yang kamu pelajari.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedGlossaryItems.map((item, idx) => (
                      <motion.div
                        key={item.term}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-slate-900 border border-brand-cyan/20 p-6 rounded-2xl group hover:border-brand-cyan/50 transition-all"
                      >
                         <h4 className="text-lg font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">{item.term}</h4>
                         <p className="text-sm text-slate-400 mb-3 leading-relaxed">{item.definition}</p>
                         <div className="pt-3 border-t border-white/5">
                            <span className="text-xs font-bold text-brand-cyan italic">ID: {item.translation}</span>
                         </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex justify-center pt-8">
                    <button
                      onClick={() => { setView('dashboard'); setSelectedLesson(null); }}
                      className="px-12 py-4 bg-brand-cyan text-brand-dark font-black rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
                    >
                      Kembali ke Dashboard
                    </button>
                  </div>
                </motion.div>
              )}
              
              {view === 'glossary' && (
                <motion.div
                  key="glossary"
                  data-testid="glossary-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8 w-full"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h1 className="text-3xl font-bold text-white tracking-tight italic">Kamus <span className="text-brand-cyan uppercase">Istilah</span></h1>
                      <p className="text-slate-400">Daftar istilah teknis penting untuk programmer.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {categories.map(cat => (
                         <button
                           key={cat}
                           onClick={() => setSelectedCategory(cat)}
                           className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                             selectedCategory === cat 
                             ? 'bg-brand-cyan border-brand-cyan text-brand-dark' 
                             : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-brand-cyan/50'
                           }`}
                         >
                           {cat}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="Cari istilah, definisi, atau terjemahan..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-800 focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-600 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
                     {filteredGlossary.length > 0 ? (
                       filteredGlossary.map((item, idx) => (
                         <motion.div
                           key={item.term}
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ delay: idx * 0.05 }}
                           className="bg-[#0d141d] border border-brand-cyan/10 p-6 rounded-2xl flex flex-col gap-3 hover:border-brand-cyan/30 transition-all shadow-xl group"
                         >
                           <div className="flex justify-between items-start">
                             <h4 className="text-xl font-bold text-white group-hover:text-brand-cyan transition-colors">{item.term}</h4>
                             <span className="text-[10px] font-mono font-bold text-brand-cyan/60 uppercase tracking-widest px-2 py-1 bg-brand-cyan/5 rounded border border-brand-cyan/10">
                               {item.category}
                             </span>
                           </div>
                           <div className="space-y-4">
                             <p className="text-sm text-slate-300 leading-relaxed">{item.definition}</p>
                             
                             {item.codeSnippet && (
                               <div className="bg-[#05070a] rounded-lg p-3 font-mono text-[10px] border border-slate-800 shadow-inner group-hover:border-brand-cyan/20 transition-all overflow-x-auto">
                                 <pre className="text-brand-cyan"><code>{item.codeSnippet}</code></pre>
                               </div>
                             )}

                             <div className="pt-2 border-t border-white/5">
                               <p className="text-xs text-slate-500 font-medium italic">
                                 <span className="text-brand-cyan/80 not-italic font-bold mr-1">ID:</span> {item.translation}
                               </p>
                             </div>
                           </div>
                         </motion.div>
                       ))
                     ) : (
                       <div className="col-span-full py-20 text-center glass rounded-3xl">
                         <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                           <Search className="w-8 h-8 text-slate-500" />
                         </div>
                         <h3 className="text-xl font-bold text-white mb-2">Tidak ditemukan hasil</h3>
                         <p className="text-slate-500">Coba kata kunci lain atau pilih kategori berbeda.</p>
                       </div>
                     )}
                  </div>
                </motion.div>
              )}

              {view === 'certificate' && (
                <motion.div
                  key="certificate"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="max-w-4xl w-full mx-auto pb-20 mt-4 h-full flex flex-col items-center justify-center"
                >
                  {/* Certificate Design */}
                  <div className="bg-white text-brand-dark p-8 md:p-16 rounded-sm shadow-2xl relative border-[12px] border-double border-slate-200 overflow-hidden w-full max-w-[800px] aspect-[1.4/1]">
                    {/* Watermark/Decor */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-32 -mt-32 border border-slate-100" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-50 rounded-full -ml-32 -mb-32 border border-slate-100" />
                    
                    <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                       <div className="w-16 h-16 bg-brand-cyan rounded-full flex items-center justify-center text-white mb-2 shadow-xl">
                          < Award className="w-8 h-8" />
                       </div>
                       
                       <div className="space-y-1">
                         <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-slate-500">Certificate of Completion</h2>
                         <h1 className="text-3xl md:text-4xl font-serif font-black italic text-slate-900 leading-tight">Master of Technical English</h1>
                       </div>

                       <div className="w-20 h-0.5 bg-slate-200" />

                       <p className="text-sm text-slate-600 max-w-lg mx-auto">
                         Sertifikat ini diberikan kepada kolega kami yang terhormat, diakui atas dedikasi dan keberhasilannya dalam menguasai terminologi teknis, protokol komunikasi, dan standar dokumentasi profesional.
                       </p>

                       <div className="py-2">
                         <h3 className="text-2xl font-serif font-bold text-brand-dark border-b-2 border-brand-cyan px-8 pb-1 inline-block">Programmer Indonesia</h3>
                       </div>

                       <div className="grid grid-cols-2 w-full gap-8 pt-8">
                         <div className="space-y-1">
                           <div className="h-px bg-slate-300 w-full mb-2" />
                           <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Verifikasi Sistem</span>
                           <div className="font-mono text-[10px] text-slate-500">ID: DEV-{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                         </div>
                         <div className="space-y-1">
                           <div className="h-px bg-slate-300 w-full mb-2" />
                           <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Tanggal Terbit</span>
                           <div className="font-mono text-[10px] text-slate-500">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                         </div>
                       </div>

                       <div className="pt-4 opacity-10">
                          <Code2 className="w-12 h-12 text-slate-400" />
                       </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 w-full">
                     <button 
                       onClick={() => window.print()}
                       className="px-8 py-4 bg-slate-900 border border-slate-800 text-white font-bold rounded-xl hover:border-brand-cyan transition-all flex items-center justify-center gap-2"
                     >
                       Simpan sebagai PDF
                     </button>
                     <button 
                       onClick={() => setView('dashboard')}
                       className="px-8 py-4 bg-brand-cyan text-brand-dark font-black rounded-xl shadow-lg uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                     >
                       Kembali ke Dashboard
                     </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden h-20 border-t border-brand-cyan/10 bg-brand-surface/90 backdrop-blur-xl flex items-center justify-around px-6 shrink-0 z-50 pb-safe">
        <button 
          onClick={() => { setView('dashboard'); setSelectedLesson(null); }}
          className={`flex flex-col items-center gap-1.5 transition-all ${view === 'dashboard' && !selectedLesson ? 'text-brand-cyan' : 'text-slate-500'}`}
        >
          <div className={`p-2 rounded-xl transition-all ${view === 'dashboard' && !selectedLesson ? 'bg-brand-cyan/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : ''}`}>
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
        </button>

        <button 
          onClick={() => { setView('glossary'); setSelectedLesson(null); }}
          className={`flex flex-col items-center gap-1.5 transition-all ${view === 'glossary' ? 'text-brand-cyan' : 'text-slate-500'}`}
        >
          <div className={`p-2 rounded-xl transition-all ${view === 'glossary' ? 'bg-brand-cyan/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : ''}`}>
            <Book className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Kamus</span>
        </button>

        <button 
          onClick={() => { if(isAllLessonsCompleted) setView('certificate'); }}
          className={`flex flex-col items-center gap-1.5 transition-all ${view === 'certificate' ? 'text-brand-cyan' : isAllLessonsCompleted ? 'text-slate-500' : 'text-slate-800 opacity-30'}`}
        >
          <div className={`p-2 rounded-xl transition-all ${view === 'certificate' ? 'bg-brand-cyan/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : ''}`}>
            <Award className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-center">Sertifikat</span>
        </button>
      </nav>

      <footer className="hidden lg:flex h-10 border-t border-brand-cyan/10 bg-brand-dark items-center justify-center px-8 shrink-0 text-[10px] text-slate-600 font-mono uppercase tracking-[0.2em]">
        DevLingo // Bahasa Inggris untuk Programmer Indonesia
      </footer>
    </div>
  );
}

