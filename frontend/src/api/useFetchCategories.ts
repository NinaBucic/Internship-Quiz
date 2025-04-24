import { useQuery } from "@tanstack/react-query";
import { api } from "./base";
import { CATEGORIES_PATH } from "../constants";
import { Category } from "../types";

const fetchCategories = () => {
  return api.get<never, Category[]>(CATEGORIES_PATH);
};

export const useFetchCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};
