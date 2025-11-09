import { useState, useEffect } from 'react';
import type { Group, CreateGroupData } from '../types/group';
const API_URL = 'https://690a56851a446bb9cc224f41.mockapi.io/guruhlar';

export const groupApi = {
  async getGroups(): Promise<Group[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch groups');
    return response.json();
  },

  async createGroup(data: CreateGroupData): Promise<Group> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        status: 'active',
        createdAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) throw new Error('Failed to create group');
    return response.json();
  },

  async updateGroup(id: string, data: Partial<Group>): Promise<Group> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update group');
    return response.json();
  },

  async deleteGroup(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete group');
  },
};

export const useGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadGroups = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await groupApi.getGroups();
      setGroups(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async (data: CreateGroupData): Promise<boolean> => {
    setLoading(true);
    try {
      const newGroup = await groupApi.createGroup(data);
      setGroups(prev => [...prev, newGroup]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Yaratishda xatolik');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateGroup = async (id: string, data: Partial<Group>): Promise<boolean> => {
    setLoading(true);
    try {
      const updatedGroup = await groupApi.updateGroup(id, data);
      setGroups(prev => prev.map(g => g.id === id ? updatedGroup : g));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Yangilashda xatolik');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteGroup = async (id: string): Promise<boolean> => {
    setLoading(true);
    try {
      await groupApi.deleteGroup(id);
      setGroups(prev => prev.filter(g => g.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'O\'chirishda xatolik');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGroups();
  }, []);

  return {
    groups,
    loading,
    error,
    createGroup,
    updateGroup,
    deleteGroup,
    refresh: loadGroups,
  };
};