import { useQuery } from "@tanstack/react-query";
import { QUIZZES_PATH } from "../constants";
import { QuizDetails } from "../types";
import { api } from "./base";

const fetchQuiz = (quizId: string) => {
  return api.get<never, QuizDetails>(`${QUIZZES_PATH}/${quizId}`);
};

export const useFetchQuiz = (quizId: string) =>
  useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => fetchQuiz(quizId),
    enabled: !!quizId,
  });
