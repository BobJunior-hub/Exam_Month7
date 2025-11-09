import React, { useState, useMemo } from 'react';
import { useGroups } from '../../services/groupApi';
import type { Group } from '../../types/group';
import SearchBar from '../common/SearchBa';
import Filter from '../common/Filter';

const Groups: React.FC = () => {
  const { groups, loading, error, createGroup, updateGroup, deleteGroup } = useGroups();
  const [showForm, setShowForm] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    teacher: '',
    studentsCount: 0,
    course: '',
  });

  const filteredGroups = useMemo(() => {
    if (!searchTerm && !statusFilter) {
      return groups;
    }
    
    const searchLower = searchTerm.toLowerCase();
    return groups.filter(group => {
      const matchesSearch = !searchTerm || 
                          (group.name?.toLowerCase().includes(searchLower) ?? false) ||
                          (group.teacher?.toLowerCase().includes(searchLower) ?? false) ||
                          (group.course?.toLowerCase().includes(searchLower) ?? false);
      const matchesFilter = !statusFilter || group.status === statusFilter;
      return matchesSearch && matchesFilter;
    });
  }, [groups, searchTerm, statusFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = editingGroup 
      ? await updateGroup(editingGroup.id, formData)
      : await createGroup(formData);
    
    if (success) {
      setShowForm(false);
      setEditingGroup(null);
      setFormData({ name: '', teacher: '', studentsCount: 0, course: '' });
    }
  };

  const handleEdit = (group: Group) => {
    setEditingGroup(group);
    setFormData({
      name: group.name,
      teacher: group.teacher,
      studentsCount: group.studentsCount,
      course: group.course,
    });
    setShowForm(true);
  };

  const handleStatusChange = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    await updateGroup(id, { status: newStatus });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Haqiqatan ham o\'chirmoqchimisiz?')) {
      await deleteGroup(id);
    }
  };

  const statusOptions = [
    { value: 'active', label: 'Faol' },
    { value: 'inactive', label: 'Nofaol' },
  ];

  const courseOptions = [
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Backend', label: 'Backend' },
    { value: 'Mobile', label: 'Mobile' },
    { value: 'Data Science', label: 'Data Science' },
  ];

  const teacherOptions = [
    { value: 'Ali Valiyev', label: 'Ali Valiyev' },
    { value: 'Hasan Husanov', label: 'Hasan Husanov' },
    { value: 'Dilshod Rahimov', label: 'Dilshod Rahimov' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Guruhlar</h2>
          <p className="text-gray-600 dark:text-gray-400">Barcha guruhlarni boshqarish</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Yangi guruh
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Guruhlarni qidirish..."
        />
        <Filter
          filterValue={statusFilter}
          onFilterChange={setStatusFilter}
          options={statusOptions}
          placeholder="Holat bo'yicha filtr"
        />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 dark:bg-red-900 dark:border-red-700 dark:text-red-100">
          {error}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 dark:text-white">
              {editingGroup ? 'Tahrirlash' : 'Yangi Guruh'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Guruh nomi</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">O'qituvchi</label>
                <select
                  value={formData.teacher}
                  onChange={(e) => setFormData({...formData, teacher: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">O'qituvchini tanlang</option>
                  {teacherOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Studentlar soni</label>
                <input
                  type="number"
                  value={formData.studentsCount}
                  onChange={(e) => setFormData({...formData, studentsCount: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kurs</label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Kursni tanlang</option>
                  {courseOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saqlanmoqda...' : 'Saqlash'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingGroup(null);
                    setFormData({ name: '', teacher: '', studentsCount: 0, course: '' });
                  }}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nomi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">O'qituvchi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Studentlar soni</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Kurs</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Holat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amallar</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredGroups.map((group) => (
              <tr key={group.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{group.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{group.teacher}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{group.studentsCount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{group.course}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    group.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                      : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                  }`}>
                    {group.status === 'active' ? 'faol' : 'nofaol'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEdit(group)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => handleStatusChange(group.id, group.status)}
                    className={group.status === 'active' 
                      ? 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300' 
                      : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                    }
                  >
                    {group.status === 'active' ? 'Nofaollashtirish' : 'Faollashtirish'}
                  </button>
                  <button
                    onClick={() => handleDelete(group.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    O'chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredGroups.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Hech qanday guruh topilmadi
          </div>
        )}
        {loading && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Yuklanmoqda...
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;