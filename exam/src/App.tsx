import React, { useState, useEffect } from 'react';
import Login from './components/auth/Login';
import Layout from './components/layout/Layout';
import Dashboard from './components/pages/Dashboard';
import Managers from './components/pages/Managers';
import Admins from './components/pages/Admins';
import Teachers from './components/pages/Teachers';
import Students from './components/pages/Students';
import Groups from './components/pages/Groups';
import Courses from './components/pages/Courses';
import Payments from './components/pages/Payments';
import Profile from './components/pages/Profile';
import Settings from './components/pages/Settings';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    const saved = localStorage.getItem('auth');
    if (saved) {
      const auth = JSON.parse(saved);
      setIsAuthenticated(auth.isAuthenticated);
    }
  }, []);

  const handleLogin = (email: string) => {
    const user = { id: '1', email, name: 'Admin User', role: 'admin' };
    const authState = { isAuthenticated: true, user };
    localStorage.setItem('auth', JSON.stringify(authState));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'managers':
        return <Managers />;
      case 'admins':
        return <Admins />;
      case 'teachers':
        return <Teachers />;
      case 'students':
        return <Students />;
      case 'groups':
        return <Groups />;
      case 'courses':
        return <Courses />;
      case 'payments':
        return <Payments />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      currentPage={currentPage} 
      onPageChange={setCurrentPage} 
      onLogout={handleLogout} 
    >
      {renderPage()}
    </Layout>
  );
};

export default App;