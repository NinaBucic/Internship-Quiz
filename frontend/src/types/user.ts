export enum UserRole {
  Admin = "Admin",
  User = "User",
}

export type AdminUser = {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  totalPoints: number;
};
