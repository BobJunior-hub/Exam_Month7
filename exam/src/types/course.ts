export interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  status: 'active' | 'inactive';
  createdAt: string;
}