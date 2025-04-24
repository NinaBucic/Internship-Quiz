export type UserQuizRank = {
  points: number;
  rank: number;
  totalPlayers: number;
  message: string;
};

export type CreateUserQuizAnswer = {
  quizId: string;
  points: number;
};
