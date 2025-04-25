import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../../utils";
import { ROUTES } from "../../router";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFetchCategories } from "../../api/useFetchCategories";
import { useFetchQuestions } from "../../api/useFetchQuestions";

export const AdminCreateQuizPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin()) {
      toast.error("You are not authorized to access this page.");
      navigate(ROUTES.QUIZZES_PAGE);
    }
  }, [navigate]);

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

  const { data: categories, isLoading: loadingCategories } =
    useFetchCategories();
  const { data: questions, isLoading: loadingQuestions } = useFetchQuestions();

  const handleToggleQuestion = (id: string) => {
    setSelectedQuestionIds((prev) =>
      prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (!title || !categoryId || selectedQuestionIds.length < 5) {
      toast.error("Please fill in all fields and select at least 5 questions");
      return;
    }

    const types = new Set(
      questions
        ?.filter((q) => selectedQuestionIds.includes(q.id))
        .map((q) => q.type)
    );
    if (types.size < 2) {
      toast.error("Select questions of at least two different types");
      return;
    }
  };

  if (loadingCategories || loadingQuestions) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" mb={4}>
        Create New Quiz
      </Typography>

      <Box display="flex" flexDirection="column" gap={3} maxWidth={600}>
        <TextField
          label="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />

        <FormControl fullWidth>
          <InputLabel>Select Category</InputLabel>
          <Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <MenuItem value="">
              <em>Choose category</em>
            </MenuItem>
            {categories?.map((cat) => (
              <MenuItem key={`cat-${cat.id}`} value={cat.id}>
                {cat.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <Typography variant="subtitle1" mb={1}>
            Select Questions (min 5, at least 2 types)
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
            Must select at least 5 questions of at least 2 different types
          </Typography>
          {questions?.map((q) => (
            <div key={`q-${q.id}`}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedQuestionIds.includes(q.id)}
                    onChange={() => handleToggleQuestion(q.id)}
                  />
                }
                label={`${q.title} (${q.type})`}
              />
            </div>
          ))}
        </Box>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create Quiz
        </Button>
      </Box>
    </Box>
  );
};
