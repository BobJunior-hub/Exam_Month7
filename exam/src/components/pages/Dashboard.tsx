import React from 'react';
import { 
  FaUserShield, 
  FaUserTie, 
  FaChalkboardTeacher, 
  FaGraduationCap, 
  FaUsers, 
  FaCheckCircle 
} from 'react-icons/fa';
import { useAdmins } from '../../services/adminApi';
import { useManagers } from '../../services/managerApi';
import { useTeachers } from '../../services/teacherApi';
import { useStudents } from '../../services/studentApi';
import { useGroups } from '../../services/groupApi';

const Dashboard: React.FC = () => {
  const { admins } = useAdmins();
  const { managers } = useManagers();
  const { teachers } = useTeachers();
  const { students } = useStudents();
  const { groups } = useGroups();

  const stats = [
    {
      title: 'Jami Adminlar',
      value: admins.length,
      icon: FaUserShield,
      color: 'bg-blue-500',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Jami Menagerlar',
      value: managers.length,
      icon: FaUserTie,
      color: 'bg-green-500',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Jami Ustozlar',
      value: teachers.length,
      icon: FaChalkboardTeacher,
      color: 'bg-purple-500',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Jami Studentlar',
      value: students.length,
      icon: FaGraduationCap,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      title: 'Jami Guruhlar',
      value: groups.length,
      icon: FaUsers,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      title: 'Faol Guruhlar',
      value: groups.filter(g => g.status === 'active').length,
      icon: FaCheckCircle,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600 dark:text-emerald-400',
    },
  ];


  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Asosiy</h2>
        <p className="text-gray-600 dark:text-gray-400">CRM boshqaruv paneliga xush kelibsiz</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <p className={`text-3xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center text-white`}>
                <stat.icon className="text-2xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Summary */}
      <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Umumiy Statistika</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white/80 text-sm mb-1">Jami Foydalanuvchilar</p>
            <p className="text-2xl font-bold text-white">
              {admins.length + managers.length + teachers.length + students.length}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white/80 text-sm mb-1">Jami Xodimlar</p>
            <p className="text-2xl font-bold text-white">
              {admins.length + managers.length + teachers.length}
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white/80 text-sm mb-1">Jami O'quvchilar</p>
            <p className="text-2xl font-bold text-white">{students.length}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-white/80 text-sm mb-1">Jami Guruhlar</p>
            <p className="text-2xl font-bold text-white">{groups.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;