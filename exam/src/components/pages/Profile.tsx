import React, { useState, useEffect } from 'react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    position: 'Administrator',
    department: 'IT Department'
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const authUser = JSON.parse(localStorage.getItem('auth') || '{}').user;
    
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else if (authUser) {
      setProfile(prev => ({
        ...prev,
        name: authUser.name || 'Admin User',
        email: authUser.email
      }));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-200">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white transition-colors duration-200">
          Profile
        </h2>
        <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
          Shaxsiy ma'lumotlaringiz
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white transition-colors duration-200">
              Shaxsiy ma'lumotlar
            </h3>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                isEditing 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isEditing ? 'Saqlash' : 'Tahrirlash'}
            </button>
          </div>

          <div className="flex items-center space-x-6 mb-8">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-semibold">
                {profile.name.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white transition-colors duration-200">
                {profile.name || 'Foydalanuvchi'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
                {profile.position}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                Ism
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  placeholder="Ismingizni kiriting"
                />
              ) : (
                <p className="text-gray-900 dark:text-white transition-colors duration-200">
                  {profile.name || 'Kiritilmagan'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  placeholder="Email manzilingiz"
                />
              ) : (
                <p className="text-gray-900 dark:text-white transition-colors duration-200">
                  {profile.email || 'Kiritilmagan'}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                Telefon
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  placeholder="Telefon raqamingiz"
                />
              ) : (
                <p className="text-gray-900 dark:text-white transition-colors duration-200">
                  {profile.phone || 'Kiritilmagan'}
                </p>
              )}
            </div>

         
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                Lavozim
              </label>
              {isEditing ? (
                <select
                  name="position"
                  value={profile.position}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Manager">Manager</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Teacher">Ustoz</option>
                </select>
              ) : (
                <p className="text-gray-900 dark:text-white transition-colors duration-200">
                  {profile.position}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-200">
                Bo'lim
              </label>
              {isEditing ? (
                <select
                  name="department"
                  value={profile.department}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200"
                >
                  <option value="IT Department">IT Department</option>
                  <option value="HR Department">HR Department</option>
                  <option value="Finance Department">Finance Department</option>
                  <option value="Marketing Department">Marketing Department</option>
                  <option value="Education Department">Education Department</option>
                </select>
              ) : (
                <p className="text-gray-900 dark:text-white transition-colors duration-200">
                  {profile.department}
                </p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 mr-3"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Saqlash
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;