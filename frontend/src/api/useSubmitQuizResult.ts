import { useMutation } from "@tanstack/react-query";
import { USER_QUIZ_ANSWERS_PATH } from "../constants";
import { CreateUserQuizAnswer } from "../types";
import { api } from "./base";

const submitQuizResult = (data: CreateUserQuizAnswer) => {
  return api.post<CreateUserQuizAnswer, any>(USER_QUIZ_ANSWERS_PATH, data);
};

export const useSubmitQuizResult = () =>
  useMutation({
    mutationKey: ["submit-quiz-result"],
    mutationFn: submitQuizResult,
  });
