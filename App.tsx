import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveDemo from './components/InteractiveDemo';
import Logo from './components/Logo';
import AuthModal from './components/AuthModal';
import LibraryModal from './components/LibraryModal';
import { SUPPORTED_LANGUAGES } from './types';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { LibraryProvider } from './contexts/LibraryContext';
import { UIProvider } from './contexts/UIContext';

const MainContent: React.FC = () => {
  const { t, currentLang } = useLanguage();

  return (
    <main>
      <Navbar />
      <AuthModal />
      <LibraryModal />
      
      <Hero />

      {/* Multi-language Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white dark:bg-[#0F1115] overflow-hidden transition-colors duration-300 relative">
         {/* Decor */}
         <div className="absolute top-10 right-0 w-32 h-64 bg-[#FFE5A3]/30 rounded-l-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 md:mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-[#2D3277] dark:text-[#A5A9E8] brand-font">{t.multi.title}</h2>
            <p className="text-lg md:text-xl text-stone-500 dark:text-stone-400 max-w-2xl mx-auto">
              {t.multi.desc}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {SUPPORTED_LANGUAGES.filter(l => l.id !== 'vi').map((lang, idx) => (
              <div key={lang.id} className={`group p-6 md:p-8 bg-white dark:bg-[#1A1D24] rounded-[2.5rem] text-center hover:bg-[#F0FBFC] dark:hover:bg-[#2A2D35] transition-all duration-300 border-2 border-stone-100 dark:border-white/5 hover:border-[#73CED5] hover:shadow-[0_10px_30px_rgba(115,206,213,0.2)] hover:-translate-y-2`}>
                <div className="text-5xl md:text-7xl mb-4 md:mb-6 group-hover:scale-125 transition-transform duration-300 drop-shadow-sm">{lang.flag}</div>
                <h4 className="text-xl md:text-2xl font-bold text-[#2D3277] dark:text-white brand-font">{lang.name}</h4>
                <p className="text-[#AF86FF] font-bold text-xs md:text-sm mt-2 uppercase tracking-wider">{t.multi.version}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="about" className="py-16 md:py-24 px-4 md:px-6 bg-[#F8F7F4] dark:bg-[#13161C] transition-colors duration-300 relative overflow-hidden">
        {/* Background Squiggles */}
        <svg className="absolute top-20 left-0 w-full h-full opacity-5 pointer-events-none dark:opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0 50 Q 25 20 50 50 T 100 50" fill="none" stroke="#2D3277" strokeWidth="1" />
           <path d="M0 70 Q 25 40 50 70 T 100 70" fill="none" stroke="#AF86FF" strokeWidth="1" />
        </svg>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-20 space-y-4">
            <div className="inline-block px-4 py-2 bg-[#FFD6E0] text-[#FF5C8D] rounded-full text-sm font-bold uppercase tracking-wider mb-2 rotate-2">
               Ouch!
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#2D3277] dark:text-[#A5A9E8] brand-font">
              {t.problem.title}
            </h2>
            <p className="text-lg md:text-xl text-stone-500 dark:text-stone-400 max-w-2xl mx-auto italic">
              {t.problem.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {t.problem.cards.map((item: any, i: number) => (
              <div key={i} className="relative p-8 md:p-10 bg-white dark:bg-[#1A1D24] rounded-[3rem] shadow-sm border-2 border-stone-100 dark:border-white/5 hover:border-[#AF86FF] hover:shadow-[0_15px_40px_rgba(175,134,255,0.15)] transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-stone-50 dark:bg-stone-800 rounded-full flex items-center justify-center text-4xl md:text-5xl mb-6 md:mb-8 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                    {['🧠', '📝', '😴'][i]}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-[#2D3277] dark:text-white mb-4 brand-font">{item.title}</h3>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-base md:text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 px-4 md:px-6 bg-white dark:bg-[#0F1115] overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="p-10 md:p-12 rounded-[3.5rem] bg-[#E8F8F9] dark:bg-[#1A1D24] border-4 border-white dark:border-stone-800 shadow-xl shadow-cyan-100 dark:shadow-none relative overflow-hidden group transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#73CED5]/20 rounded-full group-hover:scale-110 transition-transform duration-700 blur-2xl"></div>
              <div className="relative z-10 space-y-6">
                <div className="inline-flex p-4 rounded-3xl bg-white dark:bg-[#252830] shadow-sm text-4xl rotate-3">🌟</div>
                <h3 className="text-3xl font-bold text-[#2D3277] dark:text-[#73CED5] brand-font uppercase tracking-tight">{t.visionMission.visionTitle}</h3>
                <p className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed font-bold font-quicksand">
                  {t.visionMission.visionText}
                </p>
              </div>
            </div>

            <div className="p-10 md:p-12 rounded-[3.5rem] bg-[#F2F0FF] dark:bg-[#1A1D24] border-4 border-white dark:border-stone-800 shadow-xl shadow-purple-100 dark:shadow-none relative overflow-hidden group transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#AF86FF]/20 rounded-full group-hover:scale-110 transition-transform duration-700 blur-2xl"></div>
              <div className="relative z-10 space-y-6">
                <div className="inline-flex p-4 rounded-3xl bg-white dark:bg-[#252830] shadow-sm text-4xl -rotate-3">🚀</div>
                <h3 className="text-3xl font-bold text-[#2D3277] dark:text-[#AF86FF] brand-font uppercase tracking-tight">{t.visionMission.missionTitle}</h3>
                <p className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed font-bold font-quicksand">
                  {t.visionMission.missionText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InteractiveDemo />

      {/* Brand Story */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-[#FCFAF8] dark:bg-[#0F1115] transition-colors duration-300 relative">
        <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-12 relative z-10">
          <div className="inline-block px-6 py-3 bg-[#FFE5A3] text-[#B38B00] rounded-full text-sm font-black uppercase tracking-widest shadow-sm -rotate-2">
              MiLingo Faith
          </div>
          <p className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3277] dark:text-white leading-tight brand-font">
            {t.hero.title1} <br className="hidden md:block"/>
            <span 
              className="text-[#73CED5] pb-2 box-decoration-clone"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 6 Q 10 12 20 6 T 40 6' stroke='%23AF86FF' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundPosition: '0 100%',
                backgroundSize: '40px 12px',
                backgroundRepeat: 'repeat-x',
              }}
            >
              {currentLang === 'vi' ? 'Đó là để trải nghiệm.' : 'It is meant to be experienced.'}
            </span>
          </p>
        </div>
        {/* Floating shapes */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-[#FFD6E0] rounded-full blur-xl opacity-60 animate-bounce delay-700"></div>
        <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-[#C3E2C2] rounded-full blur-xl opacity-60 animate-bounce"></div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 px-4 md:px-6 bg-[#2D3277] dark:bg-black text-white rounded-t-[4rem] md:rounded-t-[6rem] transition-colors duration-300 relative overflow-hidden">
        {/* Confetti-like bg */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-7xl mx-auto text-center space-y-10 md:space-y-16 relative z-10">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none brand-font">Install MiLingo Now.</h2>
            <p className="text-xl md:text-2xl text-[#A5A9E8] font-bold max-w-3xl mx-auto">
              {currentLang === 'vi' ? 'Bắt đầu hành trình chinh phục ngoại ngữ từ chính căn phòng của bạn.' : 'Start your language journey from the comfort of your own room.'}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center items-center">
            <a href="#" className="hover:scale-110 hover:-rotate-2 transition-transform duration-300 bg-black rounded-2xl p-2 border-2 border-transparent hover:border-[#73CED5]">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-12 md:h-14" />
            </a>
            <a href="#" className="hover:scale-110 hover:rotate-2 transition-transform duration-300 bg-black rounded-2xl p-2 border-2 border-transparent hover:border-[#AF86FF]">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-12 md:h-14" />
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#1C1E26] dark:bg-black text-stone-400 py-16 md:py-24 px-4 md:px-6 border-t border-stone-800/30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <Logo className="w-12 h-10" />
              <h4 className="text-white font-bold text-lg brand-font">{t.footer.whatTitle}</h4>
              <p className="text-sm leading-relaxed text-stone-500 font-medium">
                {t.footer.whatDesc}
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-white font-bold text-lg brand-font">{t.footer.aboutTitle}</h4>
              <ul className="space-y-3 text-sm font-bold">
                <li><a href="#about" className="hover:text-[#73CED5] transition-colors">{t.nav.how}</a></li>
                <li><a href="#why" className="hover:text-[#73CED5] transition-colors">{t.nav.why}</a></li>
                <li><a href="#demo" className="hover:text-[#73CED5] transition-colors">{t.nav.demo}</a></li>
                <li><a href="#" className="hover:text-[#73CED5] transition-colors">{t.footer.contact}</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-white font-bold text-lg brand-font">Legal</h4>
              <ul className="space-y-3 text-sm font-bold">
                <li><a href="#" className="hover:text-[#73CED5] transition-colors">{t.footer.privacy}</a></li>
                <li><a href="#" className="hover:text-[#73CED5] transition-colors">{t.footer.terms}</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-white font-bold text-lg brand-font">{t.footer.followTitle}</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-stone-800 rounded-2xl flex items-center justify-center hover:bg-[#73CED5] hover:text-white transition-all hover:scale-110 hover:-rotate-6">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" /></svg>
                </a>
                <a href="#" className="w-12 h-12 bg-stone-800 rounded-2xl flex items-center justify-center hover:bg-[#AF86FF] hover:text-white transition-all hover:scale-110 hover:rotate-6">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.717 0 3.056.01 4.122.058 1.066.048 1.79.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.637.417 1.361.465 2.427.048 1.066.058 1.405.058 4.122s-.01 3.056-.058 4.122c-.048 1.066-.217 1.79-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.637.247-1.361.417-2.427.465-1.066.048-1.405.058-4.122.058s-3.056-.01-4.122-.058c-1.066-.048-1.79-.217-2.427-.465a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.581c.637-.247 1.361-.417 2.427-.465C8.944 2.01 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" /></svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-stone-800/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase tracking-widest text-stone-600">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-[#FFD6E0] dark:selection:bg-[#AF86FF]/30 transition-colors duration-300 font-medium">
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <LibraryProvider>
              <UIProvider>
                <MainContent />
              </UIProvider>
            </LibraryProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;