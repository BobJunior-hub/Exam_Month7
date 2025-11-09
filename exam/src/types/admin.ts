export interface Admin {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface CreateAdminData {
  name: string;
  email: string;
  phone?: string;
  role: string;
}