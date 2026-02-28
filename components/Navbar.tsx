import React, { useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import { SUPPORTED_LANGUAGES } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';
import { useLibrary } from '../contexts/LibraryContext';

const Navbar: React.FC = () => {
  const { currentLang, setLanguage, t, selectedLanguageObj } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { openAuth, openLibrary } = useUI();
  const { library } = useLibrary();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Calculate daily progress
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const learnedToday = library.filter(item => item.timestamp >= todayStart.getTime()).length;
  const dailyGoal = user?.dailyGoal || 5;
  const isGoalMet = learnedToday >= dailyGoal;
  const progressPercentage = Math.min((learnedToday / dailyGoal) * 100, 100);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto pl-6 pr-4 h-16 md:h-20 flex items-center justify-between relative z-50 glass bg-white/80 dark:bg-[#1C1E26]/80 rounded-full border-2 border-white/50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl">
        <Logo className="w-8 h-8 md:w-10 md:h-10" />
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-stone-600 dark:text-stone-300">
          <a href="#about" className="hover:text-[#2D3277] dark:hover:text-white transition-colors hover:scale-105">{t.nav.how}</a>
          <a href="#about" className="hover:text-[#2D3277] dark:hover:text-white transition-colors hover:scale-105">{t.nav.why}</a>
          <a href="#demo" className="hover:text-[#2D3277] dark:hover:text-white transition-colors hover:scale-105">{t.nav.demo}</a>
        </div>

        {/* Language Switcher & Theme & CTA */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-[#FFD6E0] dark:hover:bg-[#2D3277] hover:text-[#FF5C8D] dark:hover:text-white transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          {/* Language Desktop / Tablet */}
          <div className="relative hidden sm:block" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all text-xs md:text-sm font-bold text-stone-700 dark:text-stone-200 active:scale-95"
            >
              <span className="text-base">{selectedLanguageObj.flag}</span>
              <span>{selectedLanguageObj.name}</span>
              <svg className={`w-3 h-3 md:w-4 md:h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-[#1A1D24] rounded-3xl shadow-xl border-2 border-stone-100 dark:border-stone-800 py-2 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => {
                      setLanguage(lang.id);
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-bold transition-colors ${currentLang === lang.id ? 'bg-[#E8F8F9] dark:bg-[#2D3277]/30 text-[#2D3277] dark:text-white' : 'text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-white/5'}`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth Button */}
          {user ? (
            <div className="relative" ref={userRef}>
              <div className="flex items-center gap-2">
                {/* Daily Goal Pill */}
                <div className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black border transition-all ${isGoalMet ? 'bg-[#F2F0FF] dark:bg-[#2D3277]/50 text-[#7E57C2] border-[#AF86FF]' : 'bg-stone-50 dark:bg-white/5 text-stone-500 border-stone-200 dark:border-white/10'}`}>
                   <span>{isGoalMet ? '🔥' : '🎯'}</span>
                   <span>{learnedToday}/{dailyGoal}</span>
                   {/* Progress Bar background could be added but text is clear */}
                </div>

                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-4 py-1.5 bg-[#E8F8F9] dark:bg-[#2D3277]/30 rounded-full border border-[#73CED5]/30 hover:bg-[#73CED5]/20 transition-all active:scale-95"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-xl shadow-sm relative">
                    {user.avatar}
                    {isGoalMet && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#AF86FF] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#7E57C2]"></span>
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-bold text-[#2D3277] dark:text-[#73CED5] max-w-[80px] truncate">{user.name}</span>
                </button>
              </div>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#1A1D24] rounded-3xl shadow-xl border-2 border-stone-100 dark:border-stone-800 py-4 animate-in fade-in zoom-in-95 duration-200 z-50">
                  <div className="px-6 pb-4 border-b border-stone-100 dark:border-white/5 mb-2">
                    <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">Daily Goal</p>
                    <div className="flex justify-between items-end mb-2">
                       <span className="text-2xl font-black text-[#2D3277] dark:text-white">{learnedToday} <span className="text-sm text-stone-400 font-medium">/ {dailyGoal} words</span></span>
                       <span className="text-2xl">{isGoalMet ? '🎉' : '🌱'}</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-stone-100 dark:bg-stone-700 rounded-full overflow-hidden">
                       <div 
                         className={`h-full rounded-full transition-all duration-500 ${isGoalMet ? 'bg-gradient-to-r from-[#73CED5] to-[#AF86FF]' : 'bg-[#73CED5]'}`} 
                         style={{ width: `${progressPercentage}%` }}
                       ></div>
                    </div>
                    {isGoalMet && <p className="text-xs font-bold text-[#AF86FF] mt-2">Goal crushed! Amazing job!</p>}
                  </div>

                  <button
                    onClick={() => {
                      openLibrary();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-6 py-3 text-sm font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-white/5 transition-colors flex items-center gap-3"
                  >
                    <span className="text-lg">📚</span> My Library
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-6 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-3"
                  >
                    <span className="text-lg">👋</span> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={openAuth}
              className="px-5 py-2.5 bg-[#2D3277] text-white rounded-full text-sm font-bold hover:bg-[#3D44A6] transition-all active:scale-95 shadow-lg shadow-[#2D3277]/20 flex items-center gap-2"
            >
              <span>Login</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2.5 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 dark:bg-[#0F1115]/95 backdrop-blur-xl pt-28 px-6 animate-in slide-in-from-top-5 duration-300 flex flex-col items-center justify-start gap-8 lg:hidden">
          <div className="flex flex-col items-center gap-6 w-full max-w-sm">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-stone-800 dark:text-white hover:text-[#73CED5] transition-colors w-full text-center py-2 border-b border-stone-100 dark:border-white/10">{t.nav.how}</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-stone-800 dark:text-white hover:text-[#73CED5] transition-colors w-full text-center py-2 border-b border-stone-100 dark:border-white/10">{t.nav.why}</a>
            <a href="#demo" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-stone-800 dark:text-white hover:text-[#73CED5] transition-colors w-full text-center py-2 border-b border-stone-100 dark:border-white/10">{t.nav.demo}</a>
            
            {/* Mobile Language Switcher */}
            <div className="flex flex-wrap justify-center gap-2 py-4">
               {SUPPORTED_LANGUAGES.map(lang => (
                 <button
                    key={lang.id}
                    onClick={() => {
                      setLanguage(lang.id);
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-2 rounded-xl border-2 font-bold ${currentLang === lang.id ? 'border-[#73CED5] bg-[#E8F8F9] text-[#2D3277]' : 'border-stone-100 text-stone-500'}`}
                 >
                   {lang.flag} {lang.name}
                 </button>
               ))}
            </div>
            
            <button 
              onClick={() => {
                document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="w-full mt-2 px-6 py-4 bg-[#2D3277] text-white rounded-3xl text-lg font-bold shadow-xl active:scale-95 transition-transform brand-font"
            >
              {t.nav.cta}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;