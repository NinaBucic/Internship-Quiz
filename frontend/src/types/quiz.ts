import { QuestionType } from "./question";

export type Quiz = {
  id: string;
  title: string;
  category: {
    title: string;
    imageUrl?: string;
  };
};

export type QuizDetails = {
  id: string;
  title: string;
  category: {
    title: string;
    imageUrl?: string;
  };
  quizQuestions: {
    question: {
      title: string;
      type: QuestionType;
      options?: any;
      correctAnswer: any;
    };
  }[];
};
