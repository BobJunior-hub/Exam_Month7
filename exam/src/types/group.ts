export interface Group {
  id: string;
  name: string;
  teacher: string;
  studentsCount: number;
  course: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface CreateGroupData {
  name: string;
  teacher: string;
  studentsCount: number;
  course: string;
}