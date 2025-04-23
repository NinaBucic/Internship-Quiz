import { useSearchParams } from "react-router-dom";
import { useFetchQuizzes } from "../../api/useFetchQuizzes";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { fallbackImage } from "../../constants";

export const QuizzesPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const { data: quizzes, isLoading, isError } = useFetchQuizzes(search);

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <Typography>Error loading quizzes.</Typography>
      </Box>
    );

  if (!quizzes || quizzes.length === 0)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <Typography variant="h4">No quizzes found.</Typography>
      </Box>
    );

  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        QUIZZES
      </Typography>
      <Grid container spacing={3}>
        {quizzes.map((quiz) => (
          <Grid key={quiz.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <CardMedia
                component="img"
                height="160"
                image={quiz.category.imageUrl || fallbackImage}
                alt={quiz.title}
                style={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6">{quiz.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {quiz.category.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
