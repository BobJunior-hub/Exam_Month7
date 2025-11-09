import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const user = JSON.parse(localStorage.getItem('auth') || '{}').user;

  return (
    <header className="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Boshqaruv paneli</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '🌙' : '☀️'}
          </button>

          <div className="text-right">
            <p className="font-medium text-gray-900 dark:text-white">{user?.email}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Admin</p>
          </div>
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {user?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Chiqish
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;