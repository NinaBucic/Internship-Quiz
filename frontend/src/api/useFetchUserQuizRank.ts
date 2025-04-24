import { useQuery } from "@tanstack/react-query";
import { api } from "./base";
import { UserQuizRank } from "../types/userQuizAnswers";
import { USER_QUIZ_ANSWERS_PATH } from "../constants";

const fetchUserQuizRank = (quizId: string) => {
  return api.get<never, UserQuizRank>(
    `${USER_QUIZ_ANSWERS_PATH}/rank/${quizId}`
  );
};

export const useFetchUserQuizRank = (quizId: string) =>
  useQuery({
    queryKey: ["user-quiz-rank", quizId],
    queryFn: () => fetchUserQuizRank(quizId),
    retry: false,
  });
