import React from 'react';

const Payments: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">To'lovlar</h2>
        <p className="text-gray-600 dark:text-gray-400">Barcha to'lovlarni boshqarish</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">To'lovlar ro'yxati</h3>
        <p className="text-gray-600 dark:text-gray-300">Bu sahifa hozircha ishlab chiqilmoqda...</p>
      </div>
    </div>
  );
};

export default Payments;