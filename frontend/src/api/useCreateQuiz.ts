import { useMutation } from "@tanstack/react-query";
import { QUIZZES_PATH } from "../constants";
import { CreateQuizDto } from "../types";
import { api } from "./base";

const createQuiz = (data: CreateQuizDto) => {
  return api.post<CreateQuizDto, any>(QUIZZES_PATH, data);
};

export const useCreateQuiz = () =>
  useMutation({
    mutationKey: ["create-quiz"],
    mutationFn: createQuiz,
  });
