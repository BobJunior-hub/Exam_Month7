import { useState, useEffect } from 'react';
import type { Teacher, CreateTeacherData } from '../types/teacher';

const API_URL = 'https://690a52d71a446bb9cc2242a4.mockapi.io/Ustozlar';

export const teacherApi = {
  async getTeachers(): Promise<Teacher[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch teachers');
    return response.json();
  },

  async createTeacher(data: CreateTeacherData): Promise<Teacher> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        status: 'active',
        createdAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) throw new Error('Failed to create teacher');
    return response.json();
  },

  async updateTeacher(id: string, data: Partial<Teacher>): Promise<Teacher> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update teacher');
    return response.json();
  },

  async deleteTeacher(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete teacher');
  },
};

export const useTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTeachers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await teacherApi.getTeachers();
      setTeachers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const createTeacher = async (data: CreateTeacherData): Promise<boolean> => {
    setLoading(true);
    try {
      const newTeacher = await teacherApi.createTeacher(data);
      setTeachers(prev => [...prev, newTeacher]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Yaratishda xatolik');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateTeacher = async (id: string, data: Partial<Teacher>): Promise<boolean> => {
    setLoading(true);
    try {
      const updatedTeacher = await teacherApi.updateTeacher(id, data);
      setTeachers(prev => prev.map(t => t.id === id ? updatedTeacher : t));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Yangilashda xatolik');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteTeacher = async (id: string): Promise<boolean> => {
    setLoading(true);
    try {
      await teacherApi.deleteTeacher(id);
      setTeachers(prev => prev.filter(t => t.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'O\'chirishda xatolik');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  return {
    teachers,
    loading,
    error,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    refresh: loadTeachers,
  };
};