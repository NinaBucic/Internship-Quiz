import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { ROUTES } from "./routes";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { Layout } from "../components/Layout";
import { QuizzesPage } from "../pages/QuizzesPage";
import { QuizPage } from "../pages/QuizPage";
import { AdminUsersPage } from "../pages/AdminUsersPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { AdminCreateQuizPage } from "../pages/AdminCreateQuizPage";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

        <Route element={<Layout />}>
          <Route path={ROUTES.QUIZZES_PAGE} element={<QuizzesPage />} />
          <Route path={ROUTES.QUIZ_PAGE} element={<QuizPage />} />
          <Route path={ROUTES.ADMIN_USERS} element={<AdminUsersPage />} />
          <Route
            path={ROUTES.ADMIN_CREATE_QUIZ}
            element={<AdminCreateQuizPage />}
          />
        </Route>

        <Route path={ROUTES.NOT_FOUND_PAGE} element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
