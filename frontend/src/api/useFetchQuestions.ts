import { useQuery } from "@tanstack/react-query";
import { QUESTIONS_PATH } from "../constants";
import { Question } from "../types";
import { api } from "./base";

const fetchQuestions = () => {
  return api.get<never, Question[]>(QUESTIONS_PATH);
};

export const useFetchQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: fetchQuestions,
  });
};
