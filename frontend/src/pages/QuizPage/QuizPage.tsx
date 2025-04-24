import { useNavigate, useParams } from "react-router-dom";
import { useFetchQuiz } from "../../api/useFetchQuiz";
import { useFetchUserQuizRank } from "../../api/useFetchUserQuizRank";
import {
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { fallbackImage } from "../../constants";
import { ROUTES } from "../../router";

export const QuizPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();

  const {
    data: quizDetails,
    isLoading: isQuizLoading,
    isError: isQuizError,
  } = useFetchQuiz(quizId!);

  const {
    data: userRank,
    isError: isRankError,
    error: rankError,
  } = useFetchUserQuizRank(quizId!);

  if (isQuizLoading)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  if (isQuizError || !quizDetails)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <Typography variant="h6" color="error">
          Failed to load quiz details.
        </Typography>
      </Box>
    );

  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {quizDetails.title}
      </Typography>

      <Card sx={{ maxWidth: 400, mb: 3 }}>
        <CardMedia
          component="img"
          height="200"
          image={quizDetails.category.imageUrl || fallbackImage}
          alt={quizDetails.category.title}
          sx={{ objectFit: "cover" }}
        />
      </Card>

      <Typography variant="subtitle1" gutterBottom>
        Category: {quizDetails.category.title}
      </Typography>

      {isRankError ? (
        <Typography color="text.secondary">
          {typeof rankError === "string"
            ? rankError
            : rankError?.message || "Something went wrong."}
        </Typography>
      ) : (
        userRank && (
          <Typography color="text.secondary">
            {userRank.message} — Your high score: {userRank.points} points
          </Typography>
        )
      )}

      <Box display="flex" gap={2} mt={2}>
        <Button variant="contained" color="primary" /*onClick={handleStart}*/>
          PLAY QUIZ
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate(ROUTES.QUIZZES_PAGE)}
        >
          BACK TO QUIZZES
        </Button>
      </Box>
    </Box>
  );
};
