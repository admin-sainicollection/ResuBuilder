import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Loader2, Sparkles, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface AuthPagesProps {
  initialMode?: 'login' | 'signup';
  onBackToHome: () => void;
  onAuthSuccess: (user: { email: string; name: string }) => void;
  hasPendingTemplate?: boolean;
}

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
}

export default function AuthPages({ initialMode = 'login', onBackToHome, onAuthSuccess, hasPendingTemplate = false }: AuthPagesProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // General banner error and field-specific errors
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [errorAction, setErrorAction] = useState<{ label: string; onClick: () => void } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Switch tabs and reset errors
  const handleModeSwitch = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    setError(null);
    setFieldErrors({});
    setErrorAction(null);
  };

  // Quick Login with demo account
  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});
    setErrorAction(null);
    localStorage.setItem('ats_has_account', 'true');
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({
        email: 'demo.developer@resubuilder.pro',
        name: 'Demo Candidate'
      });
    }, 800);
  };

  const validateForm = (): boolean => {
    const cleanEmail = email.trim();
    const cleanName = name.trim();
    const cleanPassword = password.trim();
    const errors: FieldErrors = {};

    // 1. Full Name Validation (Signup only)
    if (mode === 'signup') {
      if (!cleanName) {
        errors.name = 'Full name is required.';
      } else if (cleanName.length < 2) {
        errors.name = 'Please enter a valid full name (at least 2 characters).';
      }
    }

    // 2. Email Validation
    if (!cleanEmail) {
      errors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        errors.email = 'Please enter a valid email address (e.g. alex@example.com).';
      }
    }

    // 3. Password Validation
    if (!cleanPassword) {
      errors.password = 'Password is required.';
    } else if (cleanPassword.length < 5) {
      errors.password = 'Password must be at least 5 characters long.';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setError('Please fix the errors highlighted below before proceeding.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setErrorAction(null);

    if (!validateForm()) {
      return;
    }

    const cleanEmail = email.trim();
    const cleanName = name.trim();
    const cleanPassword = password.trim();

    setIsLoading(true);

    try {
      const userDocRef = doc(db, 'users', cleanEmail.toLowerCase());

      if (mode === 'signup') {
        // Check if user already exists in Firestore
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setError('An account with this email address already exists.');
          setFieldErrors({ email: 'This email is already registered.' });
          setErrorAction({
            label: 'Switch to Login',
            onClick: () => handleModeSwitch('login')
          });
          setIsLoading(false);
          return;
        }

        // Save new user in Firestore
        const newUser = { 
          email: cleanEmail, 
          name: cleanName, 
          password: cleanPassword,
          createdAt: new Date().toISOString()
        };
        await setDoc(userDocRef, newUser);

        localStorage.setItem('ats_has_account', 'true');
        setIsLoading(false);
        onAuthSuccess({ email: cleanEmail, name: cleanName });
      } else {
        // Login check against Firestore
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          if (userData.password === cleanPassword) {
            localStorage.setItem('ats_has_account', 'true');
            setIsLoading(false);
            onAuthSuccess({ email: userData.email, name: userData.name });
          } else {
            setError('Incorrect password for this account.');
            setFieldErrors({ password: 'Password does not match our records.' });
            setIsLoading(false);
          }
        } else {
          // Check for demo account
          if (cleanEmail.toLowerCase() === 'demo.developer@resubuilder.pro' && cleanPassword === 'demopass') {
            localStorage.setItem('ats_has_account', 'true');
            setIsLoading(false);
            onAuthSuccess({ email: 'demo.developer@resubuilder.pro', name: 'Demo Candidate' });
          } else {
            setError('No account found with this email address.');
            setFieldErrors({ email: 'No account registered under this email.' });
            setErrorAction({
              label: 'Create Account',
              onClick: () => handleModeSwitch('signup')
            });
            setIsLoading(false);
          }
        }
      }
    } catch (err: any) {
      console.error('Auth error in Firestore', err);
      const isNetworkErr = err?.message?.toLowerCase().includes('offline') || err?.message?.toLowerCase().includes('network');
      if (isNetworkErr) {
        setError('Network error: Unable to connect to authentication server. Please check your internet connection.');
      } else {
        setError('An unexpected error occurred while processing your request. Please try again or use the 1-Click Demo Login.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-blue-100 selection:text-blue-900 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]">
      
      {/* Decorative colored blur bubbles */}
      <div className="absolute top-10 left-10 w-[250px] h-[250px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-indigo-100/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Back button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 hover:border-slate-300 transition-all shadow-3xs cursor-pointer"
        >
          <ArrowLeft size={13} />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo and Greeting */}
        <div className="flex justify-center mb-4">
          <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20">
            <svg className="w-6.5 h-6.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
        </div>
        
        <h2 className="text-center text-3xl font-black text-slate-900 tracking-tight">
          {mode === 'login' ? 'Welcome back' : 'Create your workspace'}
        </h2>
        <p className="mt-1 text-center text-xs text-slate-400 font-medium">
          {mode === 'login' ? 'Sign in to access your ATS resumes' : 'Sign up for free to build and download resumes'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 border border-slate-200 rounded-2xl shadow-sm sm:px-10 space-y-6">
          
          {/* Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
            <button
              type="button"
              onClick={() => handleModeSwitch('login')}
              className={`grow text-center py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'login' ? 'bg-white text-slate-900 shadow-3xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch('signup')}
              className={`grow text-center py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'signup' ? 'bg-white text-slate-900 shadow-3xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          {hasPendingTemplate && (
            <div className="p-3 bg-blue-50 border border-blue-200/80 rounded-xl text-xs text-blue-900 font-medium flex items-center gap-2.5 animate-fade-in shadow-2xs">
              <Sparkles className="text-blue-600 shrink-0" size={16} />
              <span>
                {mode === 'signup' 
                  ? 'Create an account to start customizing your selected CV template!' 
                  : 'Log in to your account to start customizing your selected CV template!'}
              </span>
            </div>
          )}

          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-medium flex flex-col gap-2 animate-fade-in">
              <div className="flex items-start gap-2">
                <AlertCircle className="text-rose-600 shrink-0 mt-0.5" size={16} />
                <span className="leading-relaxed">{error}</span>
              </div>
              {errorAction && (
                <button
                  type="button"
                  onClick={errorAction.onClick}
                  className="self-end px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-[11px] transition-colors cursor-pointer shadow-3xs"
                >
                  {errorAction.label} &rarr;
                </button>
              )}
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Full Name</label>
                <div className="relative">
                  <span className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${fieldErrors.name ? 'text-rose-500' : 'text-slate-400'}`}>
                    <User size={14} />
                  </span>
                  <input
                    type="text"
                    disabled={isLoading}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (fieldErrors.name) setFieldErrors(prev => ({ ...prev, name: undefined }));
                      if (error) setError(null);
                    }}
                    placeholder="Alex Mercer"
                    className={`w-full pl-9 pr-3 py-2.5 text-xs border rounded-lg bg-slate-50 outline-hidden font-medium placeholder-slate-400 transition-all ${
                      fieldErrors.name 
                        ? 'border-rose-300 bg-rose-50/20 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30' 
                        : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                    }`}
                  />
                </div>
                {fieldErrors.name && (
                  <p className="text-[11px] font-semibold text-rose-600 animate-fade-in flex items-center gap-1 mt-1">
                    <span>{fieldErrors.name}</span>
                  </p>
                )}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Email Address</label>
              <div className="relative">
                <span className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${fieldErrors.email ? 'text-rose-500' : 'text-slate-400'}`}>
                  <Mail size={14} />
                </span>
                <input
                  type="email"
                  disabled={isLoading}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
                    if (error) setError(null);
                  }}
                  placeholder="alex.mercer@gmail.com"
                  className={`w-full pl-9 pr-3 py-2.5 text-xs border rounded-lg bg-slate-50 outline-hidden font-medium placeholder-slate-400 transition-all ${
                    fieldErrors.email 
                      ? 'border-rose-300 bg-rose-50/20 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30' 
                      : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                  }`}
                />
              </div>
              {fieldErrors.email && (
                <p className="text-[11px] font-semibold text-rose-600 animate-fade-in flex items-center gap-1 mt-1">
                  <span>{fieldErrors.email}</span>
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setError("Password reset is disabled for simulation. You can create a new account or log in with the 1-Click Demo Login.");
                      setErrorAction({
                        label: 'Use Demo Login',
                        onClick: handleQuickDemoLogin
                      });
                    }}
                    className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <span className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${fieldErrors.password ? 'text-rose-500' : 'text-slate-400'}`}>
                  <Lock size={14} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: undefined }));
                    if (error) setError(null);
                  }}
                  placeholder="••••••••"
                  className={`w-full pl-9 pr-10 py-2.5 text-xs border rounded-lg bg-slate-50 outline-hidden font-medium placeholder-slate-400 transition-all ${
                    fieldErrors.password 
                      ? 'border-rose-300 bg-rose-50/20 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30' 
                      : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {fieldErrors.password ? (
                <p className="text-[11px] font-semibold text-rose-600 animate-fade-in flex items-center gap-1 mt-1">
                  <span>{fieldErrors.password}</span>
                </p>
              ) : (
                <p className="text-[9px] text-slate-400">Must be at least 5 characters.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:bg-blue-400"
            >
              {isLoading ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>{mode === 'login' ? 'Sign In to My Account' : 'Create My Free Account'}</span>
              )}
            </button>
          </form>

          {/* Quick evaluation box */}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5">
              <Sparkles className="text-blue-500 animate-pulse" size={13} />
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Fast Evaluation Profile</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-normal font-medium">
              Skip registration and sign in instantly with our preloaded professional demo sandbox.
            </p>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer text-center hover:border-slate-300"
            >
              🚀 1-Click Demo Login
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

