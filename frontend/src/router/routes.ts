type Routes = {
  [key: string]: string;
};

export const ROUTES: Routes = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  QUIZZES_PAGE: "/quizzes",
  QUIZ_PAGE: "/quizzes/:quizId",
  ADMIN_USERS: "/admin/users",
  ADMIN_CREATE_QUIZ: "/admin/create-quiz",
  NOT_FOUND_PAGE: "*",
};
