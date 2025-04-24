import { jwtDecode } from "jwt-decode";
import { JwtPayload, UserRole } from "../types";

export const isAdmin = (): boolean => {
  const token = localStorage.getItem("jwt");
  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.role === UserRole.Admin;
  } catch {
    return false;
  }
};
