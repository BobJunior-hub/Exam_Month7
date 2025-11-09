import React from 'react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentPage, 
  onPageChange, 
  onLogout 
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Asosiy', active: true },
    { id: 'managers', label: 'Menagerlar', active: true },
    { id: 'admins', label: 'Adminlar', active: true },
    { id: 'teachers', label: 'Ustozlar', active: true },
    { id: 'students', label: 'Studentlar', active: true },
    { id: 'groups', label: 'Guruhlar', active: true },
    { id: 'courses', label: 'Kurslar', active: true },
    { id: 'payments', label: 'Payment', active: true },
  ];

  const settingsItems = [
    { id: 'profile', label: 'Profile', active: true },
    { id: 'settings', label: 'Sozlamalar', active: true },
    { id: 'logout', label: 'Chiqish', active: true },
  ];

  const handleMenuClick = (itemId: string) => {
    if (itemId === 'logout') {
      onLogout();
    } else {
      onPageChange(itemId);
    }
  };

  const isActive = (itemId: string) => currentPage === itemId;

  return (
    <div className="w-64 bg-white dark:bg-black shadow-lg flex flex-col border-r border-gray-200 dark:border-gray-800">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin CRM</h1>
      </div>

      <nav className="flex-1 p-4">
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Menu</h2>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.id)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  } ${!item.active ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!item.active}
                >
                  <span className="w-2 h-2 bg-current rounded-full mr-3"></span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Sozlamalar</h2>
          <ul className="space-y-2">
            {settingsItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.id)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  } ${!item.active ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!item.active}
                >
                  <span className="w-2 h-2 bg-current rounded-full mr-3"></span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;