import { useMutation } from "@tanstack/react-query";
import { REGISTER_USER_PATH } from "../constants";
import { JwtResponse, RegisterData } from "../types";
import { api } from "./base";
import toast from "react-hot-toast";

const registerUser = (registerData: RegisterData) => {
  return api.post<RegisterData, JwtResponse>(REGISTER_USER_PATH, registerData);
};

export const useRegister = () =>
  useMutation({
    mutationKey: ["register-user"],
    mutationFn: registerUser,
    onSuccess: (data: JwtResponse) => {
      localStorage.setItem("jwt", JSON.stringify(data.access_token));
      toast.success("Registration successful!");
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
