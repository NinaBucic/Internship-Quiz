import { useSearchParams } from "react-router-dom";
import { useFetchQuizzes } from "../../api/useFetchQuizzes";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { fallbackImage } from "../../constants";
import { useEffect, useMemo, useState } from "react";

export const QuizzesPage = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const { data: quizzes, isLoading, isError } = useFetchQuizzes(search);
  const [selectedCategory, setSelectedCategory] = useState("");

  const uniqueCategories = useMemo(() => {
    if (!quizzes) return [];
    return Array.from(new Set(quizzes.map((q) => q.category.title)));
  }, [quizzes]);

  useEffect(() => {
    if (!uniqueCategories.includes(selectedCategory)) {
      setSelectedCategory("");
    }
  }, [uniqueCategories, selectedCategory]);

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

  const filteredQuizzes = selectedCategory
    ? quizzes.filter((quiz) => quiz.category.title === selectedCategory)
    : quizzes;

  return (
    <Box p={4}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        QUIZZES
      </Typography>
      <FormControl fullWidth sx={{ maxWidth: 300, mb: 5 }}>
        <InputLabel>Filter by Category</InputLabel>
        <Select
          value={selectedCategory}
          label="Filter by Category"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <MenuItem value="">All Categories</MenuItem>
          {uniqueCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        {filteredQuizzes.map((quiz) => (
          <Grid key={quiz.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
              }}
            >
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
