import { useState, useEffect } from 'react';
import type { Admin, CreateAdminData } from '../types/admin';

const API_URL = 'https://68b7477273b3ec66cec441b4.mockapi.io/asaxiy';

export const adminApi = {
  async getAdmins(): Promise<Admin[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch admins');
    return response.json();
  },

  async createAdmin(data: CreateAdminData): Promise<Admin> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        status: 'active',
        createdAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) throw new Error('Failed to create admin');
    return response.json();
  },

  async updateAdmin(id: string, data: Partial<Admin>): Promise<Admin> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update admin');
    return response.json();
  },

  async deleteAdmin(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete admin');
  },
};

export const useAdmins = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAdmins = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminApi.getAdmins();
      setAdmins(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const createAdmin = async (data: CreateAdminData): Promise<boolean> => {
    setLoading(true);
    try {
      const newAdmin = await adminApi.createAdmin(data);
      setAdmins(prev => [...prev, newAdmin]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Yaratishda xatolik');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateAdmin = async (id: string, data: Partial<Admin>): Promise<boolean> => {
    setLoading(true);
    try {
      const updatedAdmin = await adminApi.updateAdmin(id, data);
      setAdmins(prev => prev.map(a => a.id === id ? updatedAdmin : a));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Yangilashda xatolik');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteAdmin = async (id: string): Promise<boolean> => {
    setLoading(true);
    try {
      await adminApi.deleteAdmin(id);
      setAdmins(prev => prev.filter(a => a.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'O\'chirishda xatolik');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  return {
    admins,
    loading,
    error,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    refresh: loadAdmins,
  };
};