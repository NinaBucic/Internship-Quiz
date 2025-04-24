export enum QuestionType {
  TrueFalse = "TrueFalse",
  MultipleChoice = "MultipleChoice",
  ShortAnswer = "ShortAnswer",
}

export type Question = {
  id: string;
  title: string;
  type: QuestionType;
};
