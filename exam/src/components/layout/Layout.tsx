import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentPage, 
  onPageChange, 
  onLogout 
}) => {
  return (
    <div className="flex h-screen bg-white dark:bg-black">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={onPageChange} 
        onLogout={onLogout} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={onLogout} />
        <main className="flex-1 overflow-auto p-6 bg-white dark:bg-black">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;