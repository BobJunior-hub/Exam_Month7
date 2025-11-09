export interface Teacher {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface CreateTeacherData {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
}