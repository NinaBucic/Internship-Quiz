type Routes = {
  [key: string]: string;
};

export const ROUTES: Routes = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  QUIZZES_PAGE: "/quizzes",
  QUIZ_PAGE: "/quizzes/:quizId",
};
