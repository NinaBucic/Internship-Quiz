import { useMutation } from "@tanstack/react-query";
import { LOGIN_USER_PATH } from "../constants";
import { JwtResponse, LoginData } from "../types";
import { api } from "./base";
import toast from "react-hot-toast";

const loginUser = (loginData: LoginData) => {
  return api.post<LoginData, JwtResponse>(LOGIN_USER_PATH, loginData);
};

export const useLogin = () =>
  useMutation({
    mutationKey: ["login-user"],
    mutationFn: loginUser,
    onSuccess: (data: JwtResponse) => {
      localStorage.setItem("jwt", JSON.stringify(data.access_token));
      toast.success("Login successful!");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Login failed!");
    },
  });
