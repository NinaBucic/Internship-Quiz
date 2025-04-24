import { Box, Button, Typography } from "@mui/material";
import { ROUTES } from "../../router";
import { useNavigate } from "react-router-dom";
import QuizImage from "../../assets/images/quiz_time.png";

export const Home = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("jwt");
  const isLoggedIn = !!token;

  const handleClick = () => {
    if (isLoggedIn) {
      navigate(ROUTES.QUIZZES_PAGE);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="100vh"
      p={4}
    >
      <img
        src={QuizImage}
        alt="Welcome to Quiz App"
        style={{
          maxWidth: "300px",
          marginBottom: "2rem",
          animation: "float 3s ease-in-out infinite",
        }}
      />
      <Typography variant="h4" gutterBottom>
        {isLoggedIn ? "Welcome back!" : "Welcome to the Ultimate Quiz Site!"}
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 400, mb: 4 }}>
        Test your knowledge across various categories, colect points, and become
        a quiz master.
      </Typography>
      <Button variant="contained" size="large" onClick={handleClick}>
        {isLoggedIn ? "Go to Quizzes" : "Login / Register"}
      </Button>
    </Box>
  );
};
