import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, Check, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, user, logout } = useShop();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      login(email || 'aryan.varma@saksox.com', name || 'Aryan Varma');
    } else if (mode === 'register') {
      register(name || 'Aryan Varma', email || 'aryan.varma@saksox.com', phone || '+91 98112 45890');
    } else if (mode === 'forgot') {
      setForgotSent(true);
      setTimeout(() => {
        setForgotSent(false);
        setMode('login');
      }, 2500);
    }
  };

  const handleDemoFill = () => {
    setEmail('aryan.varma@saksox.com');
    setPassword('••••••••••••');
    setName('Aryan Varma');
    setPhone('+91 98112 45890');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => setIsAuthModalOpen(false)}
      />

      <div className="relative z-10 w-full max-w-md bg-[#121419] border border-[#272d3a] shadow-2xl p-6 sm:p-8 text-[#f5f3ef]">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 text-[#88909e] hover:text-white p-1"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {user ? (
          /* Already Logged In State */
          <div className="text-center py-4">
            <div className="h-16 w-16 bg-[#c9a96e]/20 border border-[#c9a96e] rounded-full flex items-center justify-center mx-auto mb-4 text-[#dfbe7d] text-xl font-bold">
              {user.name.charAt(0)}
            </div>
            <h3 className="text-xl font-serif font-semibold text-white mb-1">
              {user.name}
            </h3>
            <p className="text-xs text-[#88909e] mb-4">{user.email}</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsAuthModalOpen(false);
                  window.location.hash = '#/account';
                }}
                className="flex-1 py-2.5 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Go to My Account
              </button>
              <button
                onClick={logout}
                className="px-4 py-2.5 bg-[#1e222b] hover:bg-[#2c3240] text-xs uppercase tracking-wider text-white border border-[#313745] transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          /* Guest / Auth Form */
          <div>
            {/* Header */}
            <div className="text-center mb-6">
              <span className="text-[10px] font-mono tracking-widest text-[#c9a96e] uppercase">
                SAKSOX MEMBERS CLUB
              </span>
              <h2 className="text-2xl font-serif font-medium tracking-wide text-white mt-1">
                {mode === 'login' && 'Sign In to SAKSOX'}
                {mode === 'register' && 'Create Your SAKSOX ID'}
                {mode === 'forgot' && 'Reset Password'}
              </h2>
              <p className="text-xs text-[#88909e] mt-1">
                {mode === 'login' && 'Access early drops, saved orders, and your personal scent profile.'}
                {mode === 'register' && 'Unlock 10% off your first drop with code WELCOME10.'}
                {mode === 'forgot' && 'Enter your email to receive recovery instructions.'}
              </p>
            </div>

            {/* Quick Demo Fill Pill */}
            <div className="mb-4">
              <button
                type="button"
                onClick={handleDemoFill}
                className="w-full py-1.5 px-3 bg-[#181a22] hover:bg-[#20232e] border border-[#2d3444] text-[11px] text-[#c9a96e] flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>⚡ Auto-fill VIP Demo Profile</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === 'register' && (
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#88909e] mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-[#606777]" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Aryan Varma"
                      className="w-full bg-[#16181f] border border-[#2a2f3d] pl-9 pr-3 py-2 text-xs text-white placeholder:text-[#525763] focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#88909e] mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[#606777]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aryan.varma@saksox.com"
                    className="w-full bg-[#16181f] border border-[#2a2f3d] pl-9 pr-3 py-2 text-xs text-white placeholder:text-[#525763] focus:outline-none focus:border-[#c9a96e]"
                  />
                </div>
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#88909e] mb-1">
                    Mobile Number (India)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-[#606777]" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98112 45890"
                      className="w-full bg-[#16181f] border border-[#2a2f3d] pl-9 pr-3 py-2 text-xs text-white placeholder:text-[#525763] focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>
                </div>
              )}

              {mode !== 'forgot' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] uppercase tracking-wider text-[#88909e]">
                      Password
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-[10px] text-[#c9a96e] hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[#606777]" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-[#16181f] border border-[#2a2f3d] pl-9 pr-3 py-2 text-xs text-white placeholder:text-[#525763] focus:outline-none focus:border-[#c9a96e]"
                    />
                  </div>
                </div>
              )}

              {forgotSent && (
                <div className="p-3 bg-[#17221b] border border-[#22c55e]/30 text-xs text-[#22c55e] flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <span>Password reset link sent to {email || 'your email'}.</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 bg-[#c9a96e] hover:bg-[#dfbe7d] text-[#0a0b0d] text-xs font-bold uppercase tracking-widest transition-all mt-4"
              >
                {mode === 'login' && 'Sign In'}
                {mode === 'register' && 'Complete Registration'}
                {mode === 'forgot' && 'Send Reset Link'}
              </button>
            </form>

            {/* Toggle Modes */}
            <div className="mt-5 pt-4 border-t border-[#222733] text-center text-xs text-[#88909e]">
              {mode === 'login' ? (
                <span>
                  Don't have an account?{' '}
                  <button
                    onClick={() => setMode('register')}
                    className="text-[#dfbe7d] font-semibold hover:underline"
                  >
                    Join SAKSOX
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('login')}
                    className="text-[#dfbe7d] font-semibold hover:underline"
                  >
                    Sign In
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
