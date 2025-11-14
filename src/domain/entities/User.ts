import type { Role } from './Role';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
