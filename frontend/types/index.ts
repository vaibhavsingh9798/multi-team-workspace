export type Role = "OWNER" | "MANAGER" | "MEMBER";

export interface User {
  id: string;
  name: string;
  email: string;
  companies: CompanyUser[];
}

export interface Company {
  id: string;
  name: string;
  teams: Team[];
}

export interface CompanyUser {
  id: string;
  role: Role;
  userId: string;
  companyId: string;
  company: Company;
}

export interface Team {
  id: string;
  name: string;
  companyId: string;
  projects: Project[];
}

export interface Project {
  id: string;
  name: string;
  teamId: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  tags: string[];
  attachments?: any;
  activityLog?: any;
  assigneeId?: string;
  projectId: string;
  parentId?: string;
  subtasks?: Task[];
}

export interface AuthResponse {
  token: string;
  user: User;
}
