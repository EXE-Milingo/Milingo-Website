
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveDemo from './components/InteractiveDemo';
import AboutUs from './components/AboutUs';
import Logo from './components/Logo';
import AuthModal from './components/AuthModal';
import LibraryModal from './components/LibraryModal';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import { SUPPORTED_LANGUAGES } from './types';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { LibraryProvider } from './contexts/LibraryContext';
import { UIProvider } from './contexts/UIContext';
import { chatWithMi } from './services/geminiService';

type ChatRole = 'user' | 'assistant';
interface ChatMessage {
  role: ChatRole;
  text: string;
}

const CHAT_MESSAGES_KEY = "milingo_chat_messages_v2";
const CHAT_OPEN_KEY = "milingo_chat_open_v2";
const MASCOT_SRC = `${import.meta.env.BASE_URL}img/Mascot.png`;

const sanitizeChatText = (input: string): string => {
  return input
    .replace(/\*\*/g, '')
    .replace(/__/g, '')
    .replace(/`/g, '')
    .replace(/\r\n/g, '\n')
    .trim();
};

const AppContent: React.FC = () => {
  const { t, selectedLanguageObj } = useLanguage();
  const getViewFromPath = (): 'home' | 'privacy' | 'terms' => {
    const path = window.location.pathname;
    if (path === '/privacy') return 'privacy';
    if (path === '/terms') return 'terms';
    return 'home';
  };

  const [view, setView] = useState<'home' | 'privacy' | 'terms'>(getViewFromPath);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem(CHAT_OPEN_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatKeyboardOffset, setChatKeyboardOffset] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const rawMessages = localStorage.getItem(CHAT_MESSAGES_KEY); /*
      text: 'Xin chào! Mình là Mi trợ lí ảo của Milingo. Mình có thể giúp bạn gì nào?'
      */
      if (rawMessages) {
        const parsed = JSON.parse(rawMessages) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignore invalid cached state
    }
    return [
      {
        role: 'assistant',
        text: 'Xin chào! Mình là Mi trợ lí ảo của Milingo. Mình có thể giúp bạn gì nào?'
      }
    ];
  });
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Sync view <-> URL pathname
  useEffect(() => {
    const path = view === 'privacy' ? '/privacy' : view === 'terms' ? '/terms' : '/';
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
  }, [view]);

  useEffect(() => {
    const onPopState = () => setView(getViewFromPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, chatLoading]);

  useEffect(() => {
    try {
      localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(chatMessages));
    } catch {
      // Ignore storage errors
    }
  }, [chatMessages]);

  useEffect(() => {
    try {
      localStorage.setItem(CHAT_OPEN_KEY, isChatOpen ? "1" : "0");
    } catch {
      // Ignore storage errors
    }
  }, [isChatOpen]);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    const updateKeyboardOffset = () => {
      // iOS keyboard reduces visual viewport height; lift chat by the overlap.
      const overlap = Math.max(0, window.innerHeight - (vv.height + vv.offsetTop));
      setChatKeyboardOffset(overlap);
    };

    updateKeyboardOffset();
    vv.addEventListener('resize', updateKeyboardOffset);
    vv.addEventListener('scroll', updateKeyboardOffset);
    window.addEventListener('orientationchange', updateKeyboardOffset);

    return () => {
      vv.removeEventListener('resize', updateKeyboardOffset);
      vv.removeEventListener('scroll', updateKeyboardOffset);
      window.removeEventListener('orientationchange', updateKeyboardOffset);
    };
  }, []);

  const sendChatMessage = useCallback(async (rawMessage: string) => {
    const message = rawMessage.trim();
    if (!message || chatLoading) return;

    setChatMessages((prev) => [...prev, { role: 'user', text: message }]);
    setChatInput('');
    setChatLoading(true);
    try {
      const reply = await chatWithMi(message, selectedLanguageObj.promptName);
      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', text: sanitizeChatText(reply) }
      ]);
    } catch (error) {
      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Mi dang gap loi ket noi AI. Ban thu lai sau it phut nhe.' }
      ]);
    } finally {
      setChatLoading(false);
    }
  }, [chatLoading, selectedLanguageObj.promptName]);

  const handleSendChat = async () => {
    await sendChatMessage(chatInput);
  };

  useEffect(() => {
    const handleOpenChat = () => {
      setIsChatOpen(true);
      window.setTimeout(() => {
        chatInputRef.current?.focus();
      }, 60);
    };

    window.addEventListener('milingo:open-chat', handleOpenChat as EventListener);
    return () => {
      window.removeEventListener('milingo:open-chat', handleOpenChat as EventListener);
    };
  }, []);

  if (view === 'privacy') {
    return <PrivacyPolicy onBack={() => setView('home')} />;
  }
  
  if (view === 'terms') {
    return <TermsOfUse onBack={() => setView('home')} />;
  }

  return (
    <main className="bg-[#FEF3E2]/25 dark:bg-[#0F1115] transition-colors duration-300">
      <Navbar />
      <AuthModal />
      <LibraryModal />
      
      <Hero />
      <InteractiveDemo />
      
      {/* Problem Section */}
      <section className="pt-14 pb-14 sm:pt-20 sm:pb-20 md:pt-28 md:pb-24 px-4 md:px-8 bg-[#FEF3E2]/25 dark:bg-[#13161C] transition-colors duration-300 relative overflow-hidden">
        <div className="absolute -top-16 -left-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#e6332a]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-12 w-56 h-56 sm:w-80 sm:h-80 bg-[#f9b233]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center px-4 sm:px-5 py-1.5 sm:py-2 bg-[#e6332a]/10 text-[#e6332a] rounded-full text-[11px] sm:text-xs font-black uppercase tracking-[0.2em] mb-3 sm:mb-5 shadow-sm">
               {t.problem.badge}
            </div>
            <h2 className="text-[2rem] leading-tight sm:text-5xl md:text-6xl font-black tracking-tight text-[#2D2926] dark:text-white brand-font max-w-4xl mx-auto">
              {t.problem.title}
            </h2>
            <p className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl text-stone-500 dark:text-stone-400 max-w-2xl mx-auto italic font-medium">
              {t.problem.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {t.problem.cards.map((item: any, i: number) => (
              <div key={i} className="relative p-6 sm:p-10 md:p-12 bg-white dark:bg-[#1A1D24] rounded-[2rem] sm:rounded-[4rem] shadow-sm border-2 border-stone-100 dark:border-white/5 hover:border-[#e6332a] transition-all duration-500 hover:-translate-y-2 group max-w-md mx-auto w-full">
                <div className="w-12 h-12 sm:w-20 sm:h-20 xl:w-24 xl:h-24 bg-stone-50 dark:bg-stone-800 rounded-full flex items-center justify-center text-3xl sm:text-6xl mb-4 sm:mb-8 group-hover:scale-110 transition-transform shadow-inner">
                    {['🧠', '📝', '😴'][i]}
                </div>
                <h3 className="text-lg sm:text-2xl xl:text-3xl font-black text-[#2D2926] dark:text-white mb-2 sm:mb-5 brand-font">{item.title}</h3>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-sm sm:text-lg md:text-xl font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-language Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 md:px-8 bg-white dark:bg-[#0F1115] overflow-hidden transition-colors duration-300 relative">
         <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FEF3E2] dark:from-[#0F1115] to-white dark:to-[#0F1115] pointer-events-none"></div>
         <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-24 space-y-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#2D2926] dark:text-white brand-font tracking-tight">{t.multi.title}</h2>
            <div className="w-20 sm:w-24 h-1.5 sm:h-2 bg-gradient-to-r from-[#e6332a] to-[#f9b233] mx-auto rounded-full mb-4 sm:mb-6"></div>
            <p className="text-lg sm:text-xl md:text-2xl text-stone-500 dark:text-stone-400 max-w-2xl mx-auto font-medium">
              {t.multi.desc}
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-8 md:gap-12">
            {SUPPORTED_LANGUAGES.filter(l => l.id !== 'vi').map((lang) => (
              <div 
                key={lang.id} 
                className="group p-6 sm:p-10 xl:p-12 bg-[#F9F9FB] dark:bg-[#1A1D24] rounded-[2rem] sm:rounded-[4rem] text-center hover:bg-white dark:hover:bg-[#252830] transition-all duration-500 border-2 border-transparent hover:border-[#e6332a] shadow-sm hover:shadow-xl hover:-translate-y-2 flex flex-col items-center"
              >
                <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 mb-4 sm:mb-8 relative">
                  <img 
                    src={lang.flag} 
                    alt={lang.name}
                    className="w-full h-full object-cover rounded-full shadow-lg border-2 sm:border-4 border-white dark:border-stone-800 relative z-10"
                  />
                </div>
                <h4 className="text-lg sm:text-2xl xl:text-3xl font-black text-[#2D2926] dark:text-white brand-font tracking-wide">{lang.name}</h4>
                <div className="w-8 h-1 bg-stone-100 dark:bg-stone-800 mt-3 sm:mt-5 rounded-full group-hover:w-16 group-hover:bg-[#e6332a] transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutUs />

      {/* Floating Live Chat Button + Panel */}
      <div
        className="fixed right-4 sm:right-6 z-[120] flex flex-col items-end gap-3 pointer-events-none"
        style={{ bottom: `calc(env(safe-area-inset-bottom, 0px) + ${20 + chatKeyboardOffset}px)` }}
      >
        {isChatOpen && (
          <div className="w-[min(92vw,360px)] h-[min(68dvh,500px)] min-h-[320px] rounded-[1.5rem] border border-[#f9b233]/30 bg-white/95 dark:bg-[#1A1D24]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col pointer-events-auto">
            <div className="px-4 py-3 bg-gradient-to-r from-[#e6332a] to-[#f9b233] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={MASCOT_SRC}
                  alt="Mi Mascot"
                  className="w-8 h-8 rounded-full bg-white/20 object-cover shrink-0"
                />
                <div>
                  <p className="text-sm font-black leading-none">MiLingo AI</p>
                  <p className="text-[10px] opacity-90">Chụp, Kể, Hiểu</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-sm font-black"
                aria-label="Đóng chat"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-[#FFF9F3] dark:bg-[#111318]">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-[#e6332a] to-[#f9b233] text-white rounded-br-md'
                      : 'bg-white dark:bg-[#222733] text-stone-700 dark:text-stone-100 border border-stone-200 dark:border-white/10 rounded-bl-md'
                  }`}>
                    {message.text}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-2xl rounded-bl-md text-sm bg-white dark:bg-[#222733] text-stone-500 border border-stone-200 dark:border-white/10">
                    Mi đang trả lời...
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-3 border-t border-stone-200/70 dark:border-white/10 bg-white dark:bg-[#1A1D24]">
              <div className="flex items-center gap-2">
                <input
                  ref={chatInputRef}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSendChat();
                    }
                  }}
                  placeholder="Nhập tin nhắn cho Mi..."
                  className="flex-1 px-3 py-2.5 rounded-xl border border-stone-200 dark:border-white/10 bg-white dark:bg-[#111318] text-base sm:text-sm text-stone-700 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-[#f9b233]/40"
                />
                <button
                  type="button"
                  onClick={handleSendChat}
                  disabled={chatLoading || !chatInput.trim()}
                  className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#e6332a] to-[#f9b233] text-white text-sm font-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          aria-label="Chat with Mi"
          onClick={() => setIsChatOpen((prev) => !prev)}
          className="group relative pointer-events-auto"
        >
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#e6332a] to-[#f9b233] opacity-30 blur-md group-hover:opacity-45 transition-opacity"></span>
          <img
            src={MASCOT_SRC}
            alt="Mi Mascot"
            className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white/70 shadow-[0_12px_30px_rgba(230,51,42,0.35)] hover:scale-105 active:scale-95 transition-all shrink-0"
          />
          <span className="pointer-events-none absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#e6332a] to-[#f9b233] text-white text-xs sm:text-sm font-black tracking-wide whitespace-nowrap opacity-95 shadow-lg">
            Chat with Mi
          </span>
        </button>
      </div>

      {/* FINAL CTA Section */}
      <section id="cta" className="py-24 sm:py-32 md:py-48 px-4 md:px-8 bg-gradient-to-br from-[#e6332a] to-[#f9b233] dark:from-black dark:to-stone-900 text-white rounded-t-[3rem] sm:rounded-t-[5rem] md:rounded-t-[8rem] transition-colors duration-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FEF3E2]/25 dark:from-[#0F1115] to-transparent pointer-events-none opacity-20"></div>
        <div className="max-w-7xl mx-auto text-center space-y-12 md:space-y-20 relative z-10">
          <div className="space-y-6 md:space-y-10">
            <h2 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.95] brand-font">{t.cta.title}</h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-[#FFE5D9] font-bold max-w-4xl mx-auto leading-relaxed">
              {t.cta.desc}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 md:gap-12 justify-center items-center">
            <a href="#" className="hover:scale-110 transition-transform duration-300 bg-black rounded-[1.5rem] sm:rounded-[2rem] p-2 sm:p-3 border-2 sm:border-4 border-transparent hover:border-[#FFE5D9] shadow-2xl">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10 sm:h-14 md:h-18" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform duration-300 bg-black rounded-[1.5rem] sm:rounded-[2rem] p-2 sm:p-3 border-2 sm:border-4 border-transparent hover:border-[#FFE5D9] shadow-2xl">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-10 sm:h-14 md:h-18" />
            </a>
          </div>

          <div className="pt-4">
            <a 
              href="http://kongreal.com/apk/Milingo.apk" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Tải APK Demo ứng dụng"
              className="group relative inline-flex items-center gap-3 px-6 sm:px-10 py-3.5 sm:py-4.5 bg-white text-[#e6332a] rounded-full text-lg sm:text-2xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all overflow-hidden border-2 border-white/70"
            >
              <div className="absolute inset-0 bg-[#f9b233]/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.523 15.3414L20.355 20.2474C20.58 20.6374 20.445 21.1324 20.055 21.3574C19.665 21.5824 19.17 21.4474 18.945 21.0574L16.08 16.0924C14.835 16.6774 13.455 17.0104 12 17.0104C10.545 17.0104 9.165 16.6774 7.92 16.0924L5.055 21.0574C4.83 21.4474 4.335 21.5824 3.945 21.3574C3.555 21.1324 3.42 20.6374 3.645 20.2474L6.477 15.3414C4.305 13.9164 2.85 11.4714 2.85 8.68242V8.01042H21.15V8.68242C21.15 11.4714 19.695 13.9164 17.523 15.3414ZM16.14 11.6824C16.14 12.1444 16.515 12.5194 16.977 12.5194C17.439 12.5194 17.814 12.1444 17.814 11.6824C17.814 11.2204 17.439 10.8454 16.977 10.8454C16.515 10.8454 16.14 11.2204 16.14 11.6824ZM6.186 11.6824C6.186 12.1444 6.561 12.5194 7.023 12.5194C7.485 12.5194 7.86 12.1444 7.86 11.6824C7.86 11.2204 7.485 10.8454 7.023 10.8454C6.561 10.8454 6.186 11.2204 6.186 11.6824ZM12 2.01042C14.07 2.01042 15.84 3.30042 16.56 5.10042H7.44C8.16 3.30042 9.93 2.01042 12 2.01042Z" />
              </svg>
              <span className="tracking-tight">Tải APK Demo</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER - Updated with centered branding */}
      <footer className="relative bg-white/40 dark:bg-stone-900/20 pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 md:px-8 overflow-hidden border-t border-stone-200/50 dark:border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto backdrop-blur-3xl rounded-[2.5rem] sm:rounded-[4rem] p-8 sm:p-12 md:p-16 border border-white/40 dark:border-white/5 bg-white/30 dark:bg-white/[0.02] shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16 items-start">
            
            {/* Centered Brand Column */}
            <div className="space-y-6 sm:space-y-8 text-center flex flex-col items-center">
              <Logo withText={true} className="mx-auto" />
              <p className="text-base sm:text-lg leading-relaxed text-stone-600 dark:text-stone-400 font-bold max-w-xs mx-auto">
                Milingo - Ứng dụng học ngoại ngữ thông qua Camera tích hợp AI.
              </p>
              <div className="pt-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#2D2926]/40 dark:text-white/20">
                  {t.footer.copyright}
                </p>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8 text-center md:text-left">
              <h4 className="text-[#2D2926] dark:text-white font-black text-lg sm:text-xl brand-font tracking-wide">{t.footer.aboutTitle}</h4>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base font-bold">
                <li><button onClick={() => document.getElementById('about-intro')?.scrollIntoView({behavior: 'smooth'})} className="text-stone-500 dark:text-stone-400 hover:text-[#e6332a] transition-colors">{t.nav.how}</button></li>
                <li><button onClick={() => document.getElementById('about-team')?.scrollIntoView({behavior: 'smooth'})} className="text-stone-500 dark:text-stone-400 hover:text-[#e6332a] transition-colors">{t.nav.about}</button></li>
                <li><button onClick={() => document.getElementById('demo')?.scrollIntoView({behavior: 'smooth'})} className="text-stone-500 dark:text-stone-400 hover:text-[#e6332a] transition-colors">{t.nav.demo}</button></li>
                <li><a href="https://www.facebook.com/milingo.vn" target="_blank" rel="noopener noreferrer" className="text-stone-500 dark:text-stone-400 hover:text-[#e6332a] transition-colors">{t.footer.contact}</a></li>
              </ul>
            </div>

            <div className="space-y-6 sm:space-y-8 text-center md:text-left">
              <h4 className="text-[#2D2926] dark:text-white font-black text-lg sm:text-xl brand-font tracking-wide">{t.footer.followTitle}</h4>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="https://www.facebook.com/milingo.vn" target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-stone-800 rounded-2xl flex items-center justify-center text-[#2D2926] dark:text-white hover:bg-[#e6332a] hover:text-white transition-all shadow-lg border border-stone-100 dark:border-white/5">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" /></svg>
                </a>
                <a href="https://www.instagram.com/milingo.vn" target="_blank" rel="noopener noreferrer" className="w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-stone-800 rounded-2xl flex items-center justify-center text-[#2D2926] dark:text-white hover:bg-[#e6332a] hover:text-white transition-all shadow-lg border border-stone-100 dark:border-white/5">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.717 0 3.056.01 4.122.058 1.066.048 1.79.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.637.417 1.361.465 2.427.048 1.066.058 1.405.058 4.122s-.01 3.056-.058 4.122c-.048 1.066-.217 1.79-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.637.247-1.361.417-2.427.465-1.066.048-1.405.058-4.122.058s-3.056-.01-4.122-.058c-1.066-.048-1.79-.217-2.427-.465a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.581c.637-.247 1.361-.417 2.427-.465C8.944 2.01 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-8 sm:mt-12 flex flex-col items-center gap-6 sm:gap-10">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/60 dark:bg-white/[0.05] border border-white dark:border-white/10 backdrop-blur-xl shadow-md">
               <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
               <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#2D2926] dark:text-[#e6332a]">Ứng dụng Edtech tích hợp AI - Milingo</span>
            </div>
            
            <div className="flex gap-6 sm:gap-10 text-[10px] sm:text-xs font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">
                <button onClick={() => setView('privacy')} className="hover:text-[#e6332a] transition-all">
                  {t.footer.privacy}
                </button>
                <span className="opacity-20 select-none">•</span>
                <button onClick={() => setView('terms')} className="hover:text-[#e6332a] transition-all">
                  {t.footer.terms}
                </button>
            </div>
        </div>
      </footer>
    </main>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <LibraryProvider>
            <UIProvider>
              <AppContent />
            </UIProvider>
          </LibraryProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
