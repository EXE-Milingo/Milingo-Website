
import React, { useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import { SUPPORTED_LANGUAGES } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const { currentLang, setLanguage, t, selectedLanguageObj } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = ['about-intro', 'about-team', 'demo', 'cta'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = window.innerWidth >= 768 ? 100 : 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  const getLanguageName = (id: string) => {
    return t.languages[id] || id;
  };

  const navItemClass = (id: string) => {
    const isActive = activeSection === id;
    return `px-5 xl:px-7 py-2.5 rounded-full transition-all duration-500 font-bold whitespace-nowrap text-sm xl:text-base ${
      isActive 
        ? 'text-[#2D2926] dark:text-white bg-[#FFEBEA] dark:bg-[#e6332a]/20 shadow-sm' 
        : 'text-stone-500 dark:text-stone-400 hover:text-[#e6332a] dark:hover:text-white'
    }`;
  };

  return (
    <nav className="fixed top-3 sm:top-6 left-3 sm:left-6 right-3 sm:right-6 z-[100] transition-all duration-500">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 sm:h-16 md:h-20 flex items-center relative z-50 glass bg-white/80 dark:bg-[#0F1115]/90 rounded-full border border-white/40 dark:border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl">
        
        {/* Left: Branding Section - Text Only */}
        <div className="flex-1 flex justify-start items-center">
           <Logo withText={true} />
        </div>
        
        {/* Center: Desktop Navigation Section */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button onClick={() => scrollTo('demo')} className={navItemClass('demo')}>{t.nav.demo}</button>
          <button onClick={() => scrollTo('about-intro')} className={navItemClass('about-intro')}>{t.nav.how}</button>
          <button onClick={() => scrollTo('about-team')} className={navItemClass('about-team')}>{t.nav.about}</button>
          <button onClick={() => scrollTo('cta')} className={navItemClass('cta')}>{t.nav.cta}</button>
        </div>

        {/* Right: Utilities Section */}
        <div className="flex-1 flex items-center justify-end gap-1.5 sm:gap-3">
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-1.5 sm:p-2.5 rounded-full bg-white/50 dark:bg-stone-800/50 text-stone-600 dark:text-stone-300 hover:bg-[#FFE5D9]/30 dark:hover:bg-[#FFE5D9]/10 transition-all shadow-sm border border-stone-100 dark:border-white/5"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>

          {/* Language Selector (Desktop) */}
          <div className="relative hidden lg:block" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2 rounded-full bg-stone-100 dark:bg-stone-800/50 hover:bg-stone-200 transition-all text-[11px] xl:text-sm font-bold text-stone-700 dark:text-stone-200 border border-transparent hover:border-[#e6332a]/20"
            >
              <img 
                src={selectedLanguageObj.flag} 
                alt={selectedLanguageObj.name}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover shadow-sm border border-white/20"
              />
              <span className="max-w-[80px] truncate">{getLanguageName(selectedLanguageObj.id)}</span>
              <svg className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#1A1D24] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-stone-100 dark:border-stone-800 py-3 rounded-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden z-[110]">
                <div className="px-5 pb-2 mb-2 border-b border-stone-50 dark:border-white/5 text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">CHỌN NGÔN NGỮ</p>
                </div>
                <div className="max-h-[60vh] overflow-y-auto scrollbar-thin grid grid-cols-1 p-1">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => {
                        setLanguage(lang.id);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-5 py-3 text-left text-sm font-bold transition-all rounded-xl ${currentLang === lang.id ? 'text-[#2D2926] dark:text-[#e6332a] bg-[#e6332a]/5 border border-[#e6332a]/20' : 'text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-white/5 border border-transparent'}`}
                    >
                      <img 
                        src={lang.flag} 
                        alt={lang.name}
                        className="w-6 h-6 rounded-full object-cover shadow-sm border border-white/20"
                      />
                      <div className="flex flex-col">
                        <span className="leading-none">{getLanguageName(lang.id)}</span>
                        <span className="text-[9px] font-black uppercase opacity-40 mt-0.5">{lang.id}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-1.5 sm:p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100/50 dark:hover:bg-white/10 rounded-full transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 flex flex-col justify-between items-center py-1">
               <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}></span>
               <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
               <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-stone-900/10 dark:bg-black/40 backdrop-blur-md" onClick={() => setIsMenuOpen(false)}></div>
          
          <div className={`absolute top-[4.5rem] left-3 right-3 bg-white dark:bg-[#1A1D24] rounded-[2rem] shadow-2xl border border-white dark:border-white/5 p-4 transition-all duration-500 origin-top transform z-[120] ${isMenuOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 -translate-y-4 opacity-0'}`}>
              
              <div className="flex flex-col space-y-0.5 mb-4">
                 {[
                   { id: 'demo', label: t.nav.demo },
                   { id: 'about-intro', label: t.nav.how },
                   { id: 'about-team', label: t.nav.about }
                 ].map(item => (
                   <button 
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className="flex items-center justify-center px-3 py-2.5 rounded-xl transition-all hover:bg-stone-50 dark:hover:bg-white/5"
                   >
                      <span className="text-lg sm:text-xl font-black text-[#2D2926] dark:text-white brand-font uppercase tracking-tight">{item.label}</span>
                   </button>
                 ))}
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-white/5 space-y-4">
                 <div className="flex items-center justify-center">
                    <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500 text-center">
                      CHỌN NGÔN NGỮ
                    </p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-[32vh] p-0.5 scrollbar-thin">
                    {SUPPORTED_LANGUAGES.map(lang => (
                       <button
                          key={lang.id}
                          onClick={() => {
                             setLanguage(lang.id);
                             setIsMenuOpen(false);
                          }}
                          className={`flex items-center gap-2.5 px-3 py-3 rounded-xl border-2 transition-all active:scale-95 ${currentLang === lang.id ? 'bg-[#FFF5F2] dark:bg-[#e6332a]/10 border-[#e6332a] text-[#2D2926] dark:text-[#e6332a]' : 'bg-stone-50 dark:bg-white/5 border-transparent text-stone-500 dark:text-stone-400'}`}
                       >
                          <img 
                             src={lang.flag} 
                             alt={lang.name}
                             className="w-7 h-7 rounded-full object-cover shadow-sm border border-white/20"
                          />
                          <div className="flex flex-col items-start min-w-0">
                            <span className="text-[10px] sm:text-[11px] font-black truncate w-full">{getLanguageName(lang.id)}</span>
                            <span className={`text-[8px] font-black uppercase opacity-60 ${currentLang === lang.id ? 'text-[#e6332a]' : 'text-stone-400'}`}>{lang.id}</span>
                          </div>
                       </button>
                    ))}
                 </div>
              </div>

              <div className="mt-4">
                <button 
                    onClick={() => scrollTo('cta')}
                    className="w-full py-3.5 bg-[#e6332a] text-white rounded-xl font-black brand-font text-base shadow-lg active:scale-95 transition-all uppercase tracking-[0.12em]"
                 >
                    {t.nav.cta}
                 </button>
              </div>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
