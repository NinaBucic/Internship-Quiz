import { useQuery } from "@tanstack/react-query";
import { USER_PATH } from "../constants";
import { AdminUser } from "../types";
import { api } from "./base";

const fetchAdminUsers = () => {
  return api.get<never, AdminUser[]>(USER_PATH);
};

export const useFetchAdminUsers = () => {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: fetchAdminUsers,
  });
};
