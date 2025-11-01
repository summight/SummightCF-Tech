
import React from 'react';
import { User } from '../types';
import ProgressBar from './ProgressBar';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  progress: number;
  onNavigateToAuth: (mode: 'login' | 'register') => void;
}

const CodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);


const Header: React.FC<HeaderProps> = ({ user, onLogout, progress, onNavigateToAuth }) => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
             <div className="bg-cyan-500 p-2 rounded-lg">
                <CodeIcon className="w-6 h-6 text-slate-900" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Coding <span className="text-cyan-400">Hub</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:block text-right">
                    <span className="text-sm text-slate-400">Welcome back,</span>
                    <p className="font-semibold text-white">{user.name}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-slate-900 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                 <button
                  onClick={() => onNavigateToAuth('login')}
                  className="px-4 py-2 text-sm font-medium text-white bg-transparent rounded-md hover:bg-slate-700 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigateToAuth('register')}
                  className="px-4 py-2 text-sm font-medium text-slate-900 bg-cyan-500 rounded-md hover:bg-cyan-600 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
        {user && (
            <div className="mt-3">
                <ProgressBar percentage={progress} />
            </div>
        )}
      </div>
    </header>
  );
};

export default Header;