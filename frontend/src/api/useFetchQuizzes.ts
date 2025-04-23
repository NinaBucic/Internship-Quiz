import { useQuery } from "@tanstack/react-query";
import { QUIZZES_PATH } from "../constants";
import { Quiz } from "../types";
import { api } from "./base";

const fetchQuizzes = (search?: string) => {
  return api.get<never, Quiz[]>(`${QUIZZES_PATH}?search=${search || ""}`);
};

export const useFetchQuizzes = (search?: string) =>
  useQuery({
    queryKey: ["quizzes", search],
    queryFn: () => fetchQuizzes(search),
  });
