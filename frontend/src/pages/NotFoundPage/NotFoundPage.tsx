import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../router";
import { Box, Button, Typography } from "@mui/material";
import NotFoundImage from "../../assets/images/notFound.png";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("jwt");
  const isLoggedIn = !!token;

  const handleRedirect = () => {
    if (isLoggedIn) {
      navigate(ROUTES.QUIZZES_PAGE);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      px={2}
    >
      <img
        src={NotFoundImage}
        alt="Page not found"
        style={{
          maxWidth: "300px",
          marginBottom: "2rem",
        }}
      />

      <Typography variant="h4" gutterBottom>
        Oops! Page not found.
      </Typography>

      <Typography variant="body1" mb={4} maxWidth="500px">
        We couldn't find the page you're looking for. Let's get you back on
        track.
      </Typography>

      <Button variant="contained" size="large" onClick={handleRedirect}>
        {isLoggedIn ? "Go to Quizzes" : "Go to Home"}
      </Button>
    </Box>
  );
};
