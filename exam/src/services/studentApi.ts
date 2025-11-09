import { useState, useEffect } from 'react';
import type { Student, CreateStudentData } from '../types/student';

const API_URL = 'https://690a549c1a446bb9cc2248c9.mockapi.io/studentlar';

export const studentApi = {
  async getStudents(): Promise<Student[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch students');
    return response.json();
  },

  async createStudent(data: CreateStudentData): Promise<Student> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        status: 'active',
        createdAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) throw new Error('Failed to create student');
    return response.json();
  },

  async updateStudent(id: string, data: Partial<Student>): Promise<Student> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update student');
    return response.json();
  },

  async deleteStudent(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete student');
  },
};

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentApi.getStudents();
      setStudents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  const createStudent = async (data: CreateStudentData): Promise<boolean> => {
    setLoading(true);
    try {
      const newStudent = await studentApi.createStudent(data);
      setStudents(prev => [...prev, newStudent]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Yaratishda xatolik');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async (id: string, data: Partial<Student>): Promise<boolean> => {
    setLoading(true);
    try {
      const updatedStudent = await studentApi.updateStudent(id, data);
      setStudents(prev => prev.map(s => s.id === id ? updatedStudent : s));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Yangilashda xatolik');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id: string): Promise<boolean> => {
    setLoading(true);
    try {
      await studentApi.deleteStudent(id);
      setStudents(prev => prev.filter(s => s.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'O\'chirishda xatolik');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return {
    students,
    loading,
    error,
    createStudent,
    updateStudent,
    deleteStudent,
    refresh: loadStudents,
  };
};