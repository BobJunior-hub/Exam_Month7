export interface Manager {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  status: 'faol' | 'ishdan bo\'shatilgan';
  createdAt: string;
}

export interface CreateManagerData {
  name: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
}