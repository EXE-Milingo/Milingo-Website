import React, { useState } from 'react';
import Logo from './Logo';
import { useAuth } from '../contexts/AuthContext';
import { useUI } from '../contexts/UIContext';

const AVATARS = ['🐱', '🐶', '🐰', '🐼', '🐨', '🦊', '🐯', '🦄'];
const GOAL_OPTIONS = [3, 5, 10, 20];

const AuthModal: React.FC = () => {
  const { login } = useAuth();
  const { isAuthOpen, closeAuth } = useUI();

  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [dailyGoal, setDailyGoal] = useState(5);
  const [isLoginView, setIsLoginView] = useState(true);

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name, dailyGoal);
      closeAuth();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm transition-opacity"
        onClick={closeAuth}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-[#1A1D24] w-full max-w-md rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] p-8 overflow-hidden animate-in zoom-in-95 duration-300 border-4 border-white dark:border-stone-700">
        
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FFD6E0] rounded-full blur-2xl opacity-60 pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#C3E2C2] rounded-full blur-2xl opacity-60 pointer-events-none"></div>

        <button 
          onClick={closeAuth}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="relative flex flex-col items-center text-center space-y-6">
          <Logo className="w-16 h-16" />
          
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-[#2D3277] dark:text-white brand-font">
              {isLoginView ? 'Welcome Back!' : 'Join the Fun!'}
            </h3>
            <p className="text-stone-500 font-medium">
              {isLoginView ? 'Ready to learn more words?' : 'Start your collection today!'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="space-y-4">
               {/* Avatar Selector */}
               <div className="flex justify-center gap-2 flex-wrap">
                  {AVATARS.map(avatar => (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar)}
                      className={`text-2xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full transition-all ${selectedAvatar === avatar ? 'bg-[#73CED5] scale-110 shadow-lg shadow-teal-200' : 'bg-stone-100 hover:bg-stone-200 grayscale hover:grayscale-0'}`}
                    >
                      {avatar}
                    </button>
                  ))}
               </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="What should we call you?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 bg-stone-50 dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 rounded-2xl outline-none focus:border-[#AF86FF] focus:ring-4 focus:ring-[#AF86FF]/10 transition-all font-bold text-lg text-center placeholder:font-normal text-[#2D3277] dark:text-white"
                  required
                />
              </div>

              {/* Daily Goal Selector */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-400 uppercase tracking-wider">Daily Goal (words)</label>
                <div className="flex justify-center gap-3">
                  {GOAL_OPTIONS.map(goal => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setDailyGoal(goal)}
                      className={`px-4 py-2 rounded-xl font-bold transition-all border-2 ${
                        dailyGoal === goal 
                        ? 'border-[#AF86FF] bg-[#F2F0FF] text-[#7E57C2]' 
                        : 'border-stone-100 dark:border-stone-700 text-stone-400 hover:border-[#AF86FF]/50'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#2D3277] text-white rounded-2xl font-bold text-xl shadow-lg shadow-[#2D3277]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>{isLoginView ? 'Let\'s Go!' : 'Create Account'}</span>
              <span className="text-2xl">{selectedAvatar}</span>
            </button>
          </form>

          <div className="text-sm font-bold text-stone-400 cursor-pointer hover:text-[#73CED5] transition-colors" onClick={() => setIsLoginView(!isLoginView)}>
            {isLoginView ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;