
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { User, Week } from './types';
import { COURSE_DATA } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CourseWeek from './pages/CourseWeek';
import AuthPage from './pages/AuthPage';

type View = 'landing' | 'auth' | 'dashboard' | 'week';
type AuthMode = 'login' | 'register';

// A simple mock for password hashing. In a real app, never store plain text passwords.
const simpleHash = (s: string) => `hashed_${s}`;

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('landing');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [selectedWeek, setSelectedWeek] = useState<Week | null>(null);
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);

  useEffect(() => {
    try {
      const loggedInUserJSON = sessionStorage.getItem('loggedInUser');
      if (loggedInUserJSON) {
        const loggedInUser: User = JSON.parse(loggedInUserJSON);
        const userProgressJSON = localStorage.getItem(`progress_${loggedInUser.email}`);
        
        setUser(loggedInUser);
        if (userProgressJSON) {
          setCompletedWeeks(JSON.parse(userProgressJSON));
        }
        setCurrentView('dashboard');
      }
    } catch (error) {
      console.error("Failed to parse session data:", error);
      sessionStorage.clear(); // Clear potentially corrupted data
    }
  }, []);

  const handleRegister = async (newUser: User): Promise<boolean> => {
    const usersJSON = localStorage.getItem('users');
    const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];
    
    if (users.some(u => u.email === newUser.email)) {
      return false; // User already exists
    }
    
    const userToSave = {
      name: newUser.name,
      email: newUser.email,
      password: simpleHash(newUser.password!),
    };
    
    users.push(userToSave);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem(`progress_${newUser.email}`, JSON.stringify([]));

    // Automatically log in the new user
    sessionStorage.setItem('loggedInUser', JSON.stringify({ name: newUser.name, email: newUser.email }));
    setUser({ name: newUser.name, email: newUser.email });
    setCompletedWeeks([]);
    setCurrentView('dashboard');
    return true;
  };

  const handleLogin = async (credentials: Omit<User, 'name'>): Promise<boolean> => {
    const usersJSON = localStorage.getItem('users');
    const users: User[] = usersJSON ? JSON.parse(usersJSON) : [];
    
    const foundUser = users.find(u => u.email === credentials.email && u.password === simpleHash(credentials.password!));
    
    if (foundUser) {
      const userToSession = { name: foundUser.name, email: foundUser.email };
      sessionStorage.setItem('loggedInUser', JSON.stringify(userToSession));

      const userProgressJSON = localStorage.getItem(`progress_${foundUser.email}`);
      const progress = userProgressJSON ? JSON.parse(userProgressJSON) : [];
      
      setUser(userToSession);
      setCompletedWeeks(progress);
      setCurrentView('dashboard');
      return true;
    }
    
    return false;
  };
  
  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('loggedInUser');
    setUser(null);
    setCurrentView('landing');
    setCompletedWeeks([]);
  }, []);

  const handleSelectWeek = useCallback((week: Week) => {
    setSelectedWeek(week);
    setCurrentView('week');
  }, []);

  const handleCompleteWeek = useCallback((weekId: number) => {
    if (!user) return;

    if (!completedWeeks.includes(weekId)) {
        const newCompletedWeeks = [...completedWeeks, weekId].sort((a, b) => a - b);
        setCompletedWeeks(newCompletedWeeks);
        localStorage.setItem(`progress_${user.email}`, JSON.stringify(newCompletedWeeks));
    }
    setCurrentView('dashboard');
  }, [completedWeeks, user]);

  const handleNavigateToDashboard = useCallback(() => {
    setCurrentView('dashboard');
  }, []);
  
  const handleNavigateToAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setCurrentView('auth');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            user={user!}
            course={COURSE_DATA}
            completedWeeks={completedWeeks}
            onSelectWeek={handleSelectWeek}
          />
        );
      case 'week':
        return (
          <CourseWeek
            week={selectedWeek!}
            onComplete={handleCompleteWeek}
            onBackToDashboard={handleNavigateToDashboard}
            isCompleted={completedWeeks.includes(selectedWeek?.id ?? -1)}
          />
        );
      case 'auth':
        return <AuthPage mode={authMode} onLogin={handleLogin} onRegister={handleRegister} onSwitchView={setCurrentView} />;
      case 'landing':
      default:
        return <LandingPage onEnroll={() => handleNavigateToAuth('register')} />;
    }
  };
  
  const progressPercentage = useMemo(() => {
    if (!user) return 0;
    return (completedWeeks.length / COURSE_DATA.weeks.length) * 100;
  }, [completedWeeks.length, user]);

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-200 font-sans">
      <Header user={user} onLogout={handleLogout} progress={progressPercentage} onNavigateToAuth={handleNavigateToAuth} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
