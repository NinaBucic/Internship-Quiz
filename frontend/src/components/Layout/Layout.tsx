import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../../router";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../../types";
import toast from "react-hot-toast";
import { Navigation } from "../Navigation";

export const Layout = () => {
  const location = useLocation();
  const token = localStorage.getItem("jwt");

  if (!token) {
    toast.error("Please log in to continue");
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("jwt");
      return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }
  } catch (err) {
    toast.error("Invalid token. Please log in again.");
    localStorage.removeItem("jwt");
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};
