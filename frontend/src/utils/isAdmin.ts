import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types";

export const isAdmin = (): boolean => {
  const token = localStorage.getItem("jwt");
  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.role === "Admin";
  } catch {
    return false;
  }
};
