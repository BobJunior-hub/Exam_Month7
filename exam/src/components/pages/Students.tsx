import React, { useState, useMemo } from 'react';
import { useStudents } from '../../services/studentApi';
import type { Student } from '../../types/student';
import SearchBar from '../common/SearchBa';
import Filter from '../common/Filter';

const Students: React.FC = () => {
  const { students, loading, error, createStudent, updateStudent, deleteStudent } = useStudents();
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    group: '',
  });

  const filteredStudents = useMemo(() => {
    if (!searchTerm && !statusFilter) {
      return students;
    }
    
    const searchLower = searchTerm.toLowerCase();
    return students.filter(student => {
      const matchesSearch = !searchTerm || 
                          (student.name?.toLowerCase().includes(searchLower) ?? false) ||
                          (student.lastName?.toLowerCase().includes(searchLower) ?? false) ||
                          (student.email?.toLowerCase().includes(searchLower) ?? false) ||
                          (student.group?.toLowerCase().includes(searchLower) ?? false);
      const matchesFilter = !statusFilter || student.status === statusFilter;
      return matchesSearch && matchesFilter;
    });
  }, [students, searchTerm, statusFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = editingStudent 
      ? await updateStudent(editingStudent.id, formData)
      : await createStudent(formData);
    
    if (success) {
      setShowForm(false);
      setEditingStudent(null);
      setFormData({ name: '', lastName: '', email: '', phone: '', group: '' });
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone,
      group: student.group,
    });
    setShowForm(true);
  };

  const handleStatusChange = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    await updateStudent(id, { status: newStatus });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Haqiqatan ham o\'chirmoqchimisiz?')) {
      await deleteStudent(id);
    }
  };

  const statusOptions = [
    { value: 'active', label: 'Faol' },
    { value: 'inactive', label: 'Nofaol' },
  ];

  const groupOptions = [
    { value: 'Frontend-1', label: 'Frontend-1' },
    { value: 'Frontend-2', label: 'Frontend-2' },
    { value: 'Backend-1', label: 'Backend-1' },
    { value: 'Backend-2', label: 'Backend-2' },
    { value: 'Mobile-1', label: 'Mobile-1' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Studentlar</h2>
          <p className="text-gray-600 dark:text-gray-400">Barcha studentlarni boshqarish</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Yangi student
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Studentlarni qidirish..."
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
              {editingStudent ? 'Tahrirlash' : 'Yangi Student'}
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Guruh</label>
                <select
                  value={formData.group}
                  onChange={(e) => setFormData({...formData, group: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Guruhni tanlang</option>
                  {groupOptions.map(option => (
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
                    setEditingStudent(null);
                    setFormData({ name: '', lastName: '', email: '', phone: '', group: '' });
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ism</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Familiya</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Telefon</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Guruh</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Holat</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amallar</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{student.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{student.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{student.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{student.group}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    student.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                      : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                  }`}>
                    {student.status === 'active' ? 'faol' : 'nofaol'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => handleStatusChange(student.id, student.status)}
                    className={student.status === 'active' 
                      ? 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300' 
                      : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                    }
                  >
                    {student.status === 'active' ? 'Nofaollashtirish' : 'Faollashtirish'}
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    O'chirish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStudents.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Hech qanday student topilmadi
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

export default Students;