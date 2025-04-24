import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../utils";
import { ROUTES } from "../../router";
import toast from "react-hot-toast";
import { Box, Typography } from "@mui/material";

export const AdminCreateQuizPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin()) {
      toast.error("You are not authorized to access this page.");
      navigate(ROUTES.QUIZZES_PAGE);
    }
  }, [navigate]);

  return (
    <Box p={4} maxWidth={500} mx="auto">
      <Typography variant="h5" mb={3}>
        Create Quiz
      </Typography>
    </Box>
  );
};
