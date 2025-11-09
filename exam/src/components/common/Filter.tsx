import React from 'react';

interface FilterProps {
  filterValue: string;
  onFilterChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Filter: React.FC<FilterProps> = ({ 
  filterValue, 
  onFilterChange, 
  options, 
  placeholder = "Filtr" 
}) => {
  return (
    <select
      value={filterValue}
      onChange={(e) => onFilterChange(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
      <option value="">{placeholder}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Filter;