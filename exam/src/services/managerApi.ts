import { useState, useEffect } from 'react';
import type { Manager, CreateManagerData } from '../types/manager';

const API_URL = 'https://68b03acd3b8db1ae9c033d61.mockapi.io/manager';

export const managerApi = {
  async getManagers(): Promise<Manager[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch managers');
    return response.json();
  },

  async createManager(data: CreateManagerData): Promise<Manager> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        status: 'faol',
        createdAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) throw new Error('Failed to create manager');
    return response.json();
  },

  async updateManager(id: string, data: Partial<Manager>): Promise<Manager> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update manager');
    return response.json();
  },

  async deleteManager(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete manager');
  },
};

export const useManagers = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadManagers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await managerApi.getManagers();
      setManagers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const createManager = async (data: CreateManagerData): Promise<boolean> => {
    setLoading(true);
    try {
      const newManager = await managerApi.createManager(data);
      setManagers(prev => [...prev, newManager]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Yaratishda xatolik');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateManager = async (id: string, data: Partial<Manager>): Promise<boolean> => {
    setLoading(true);
    try {
      const updatedManager = await managerApi.updateManager(id, data);
      setManagers(prev => prev.map(m => m.id === id ? updatedManager : m));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Yangilashda xatolik');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteManager = async (id: string): Promise<boolean> => {
    setLoading(true);
    try {
      await managerApi.deleteManager(id);
      setManagers(prev => prev.filter(m => m.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'O\'chirishda xatolik');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadManagers();
  }, []);

  return {
    managers,
    loading,
    error,
    createManager,
    updateManager,
    deleteManager,
    refresh: loadManagers,
  };
};