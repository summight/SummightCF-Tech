
import React, { useState, FormEvent } from 'react';
import { User } from '../types';

type AuthMode = 'login' | 'register';

interface AuthPageProps {
  mode: AuthMode;
  onLogin: (credentials: Omit<User, 'name'>) => Promise<boolean>;
  onRegister: (newUser: User) => Promise<boolean>;
  onSwitchView: (view: 'landing' | 'auth') => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ mode, onLogin, onRegister }) => {
  const [authMode, setAuthMode] = useState<AuthMode>(mode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isLogin = authMode === 'login';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    let success = false;
    try {
      if (isLogin) {
        success = await onLogin({ email, password });
        if (!success) {
          setError('Invalid email or password. Please try again.');
        }
      } else {
        if (!name || !email || !password) {
          setError('All fields are required for registration.');
          setIsLoading(false);
          return;
        }
        success = await onRegister({ name, email, password });
        if (!success) {
          setError('An account with this email already exists.');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setAuthMode(isLogin ? 'register' : 'login');
    setError(null);
    // Clear fields on mode switch
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="flex items-center justify-center min-h-full animate-fade-in">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
        <div>
          <h2 className="text-3xl font-bold text-center text-white">
            {isLogin ? 'Welcome Back!' : 'Create Your Account'}
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            {isLogin ? "Sign in to continue your journey" : "to start learning web development today"}
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="Alex Doe"
                />
              </div>
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          {error && <p className="text-sm text-red-400">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-slate-400">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={toggleMode} className="ml-1 font-medium text-cyan-400 hover:text-cyan-300">
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
