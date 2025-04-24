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
import { useState } from "react";
import { QuestionItem } from "../../components/QuestionItem";
import { useSubmitQuizResult } from "../../api/useSubmitQuizResult";
import toast from "react-hot-toast";

export const QuizPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [answers, setAnswers] = useState<{ [index: number]: string }>({});

  const {
    data: quizDetails,
    isLoading: isQuizLoading,
    isError: isQuizError,
  } = useFetchQuiz(quizId!);

  const {
    data: userRank,
    isError: isRankError,
    error: rankError,
    refetch: refetchUserRank,
  } = useFetchUserQuizRank(quizId!);

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handlePlay = () => {
    setAnswers({});
    setIsPlaying(true);
  };

  const { mutate: submitQuiz } = useSubmitQuizResult();

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

  const handleSubmit = () => {
    let points = 0;

    quizDetails.quizQuestions.forEach((qq, index) => {
      const userAnswer = String(answers[index]).trim().toLowerCase();
      const correctAnswer = String(qq.question.correctAnswer)
        .trim()
        .toLowerCase();

      if (userAnswer === correctAnswer) {
        points++;
      }
    });

    submitQuiz(
      { quizId: quizId!, points },
      {
        onSuccess: () => {
          toast.success(
            `You scored ${points}/${quizDetails.quizQuestions.length} point(s)!`
          );
          setIsPlaying(false);
          refetchUserRank();
        },
        onError: (error) => {
          toast.error(`Failed to submit quiz: ${error}`);
        },
      }
    );
  };

  if (isPlaying) {
    return (
      <Box p={4}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          {quizDetails.title}
        </Typography>

        <Box display="flex" flexDirection="column" gap={3}>
          {quizDetails.quizQuestions.map((qq, index) => (
            <QuestionItem
              key={index}
              index={index}
              title={qq.question.title}
              type={qq.question.type}
              options={qq.question.options}
              value={answers[index] || ""}
              onChange={(value) => handleAnswerChange(index, value)}
            />
          ))}
        </Box>

        <Button
          variant="contained"
          color="success"
          sx={{ mt: 4 }}
          onClick={handleSubmit}
        >
          SUBMIT QUIZ
        </Button>
      </Box>
    );
  }

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

      {isRankError && typeof rankError === "string" ? (
        <Typography color="text.secondary" sx={{ mt: 3 }}>
          {rankError}
        </Typography>
      ) : (
        userRank && (
          <Typography color="text.secondary">
            {userRank.message} — Your high score: {userRank.points}/
            {quizDetails.quizQuestions.length} points
          </Typography>
        )
      )}

      <Box display="flex" gap={2} mt={2}>
        <Button variant="contained" color="primary" onClick={handlePlay}>
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
