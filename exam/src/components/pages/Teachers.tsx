import React, { useState, useMemo } from 'react';
import { useTeachers } from '../../services/teacherApi';
import type { Teacher } from '../../types/teacher';
import SearchBar from '../common/SearchBa';
import Filter from '../common/Filter';

const Teachers: React.FC = () => {
  const { teachers, loading, error, createTeacher, updateTeacher, deleteTeacher } = useTeachers();
  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
  });

  const filteredTeachers = useMemo(() => {
    if (!searchTerm && !statusFilter) {
      return teachers;
    }
    
    const searchLower = searchTerm.toLowerCase();
    return teachers.filter(teacher => {
      const matchesSearch = !searchTerm || 
                          (teacher.name?.toLowerCase().includes(searchLower) ?? false) ||
                          (teacher.lastName?.toLowerCase().includes(searchLower) ?? false) ||
                          (teacher.email?.toLowerCase().includes(searchLower) ?? false) ||
                          (teacher.subject?.toLowerCase().includes(searchLower) ?? false);
      const matchesFilter = !statusFilter || teacher.status === statusFilter;
      return matchesSearch && matchesFilter;
    });
  }, [teachers, searchTerm, statusFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = editingTeacher 
      ? await updateTeacher(editingTeacher.id, formData)
      : await createTeacher(formData);
    
    if (success) {
      setShowForm(false);
      setEditingTeacher(null);
      setFormData({ name: '', lastName: '', email: '', phone: '', subject: '' });
    }
  };

  const handleEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      name: teacher.name,
      lastName: teacher.lastName,
      email: teacher.email,
      phone: teacher.phone,
      subject: teacher.subject,
    });
    setShowForm(true);
  };

  const handleStatusChange = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    await updateTeacher(id, { status: newStatus });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Haqiqatan ham o\'chirmoqchimisiz?')) {
      await deleteTeacher(id);
    }
  };

  const statusOptions = [
    { value: 'active', label: 'Faol' },
    { value: 'inactive', label: 'Nofaol' },
  ];

  const subjectOptions = [
    { value: 'Matematika', label: 'Matematika' },
    { value: 'Fizika', label: 'Fizika' },
    { value: 'Kimyo', label: 'Kimyo' },
    { value: 'Biologiya', label: 'Biologiya' },
    { value: 'Informatika', label: 'Informatika' },
    { value: 'Ingliz tili', label: 'Ingliz tili' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Ustozlar</h2>
          <p className="text-gray-600 dark:text-gray-400">Barcha ustozlarni boshqarish</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Yangi ustoz
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Ustozlarni qidirish..."
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
              {editingTeacher ? 'Tahrirlash' : 'Yangi Ustoz'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ism</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Familiya</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telefon</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fan</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Fanni tanlang</option>
                  {subjectOptions.map(option => (
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
                    setEditingTeacher(null);
                    setFormData({ name: '', lastName: '', email: '', phone: '', subject: '' });
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
 {/* Таблица */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ism</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Familiya</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Telefon</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Holat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amallar</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTeachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{teacher.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{teacher.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{teacher.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{teacher.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{teacher.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    teacher.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                      : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                  }`}>
                    {teacher.status === 'active' ? 'faol' : 'nofaol'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEdit(teacher)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => handleStatusChange(teacher.id, teacher.status)}
                    className={teacher.status === 'active' 
                      ? 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300' 
                      : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                    }
                  >
                    {teacher.status === 'active' ? 'Nofaollashtirish' : 'Faollashtirish'}
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    O'chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTeachers.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Hech qanday ustoz topilmadi
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

export default Teachers;