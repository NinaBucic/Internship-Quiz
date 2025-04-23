import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLogin } from "../../api/useLogin";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../router";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate(ROUTES.QUIZZES_PAGE);
        },
      }
    );
  };

  return (
    <Box
      maxWidth={400}
      mx="auto"
      mt={10}
      p={4}
      border="1px solid #ccc"
      borderRadius={2}
    >
      <Typography variant="h5" mb={3}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          type="submit"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? <CircularProgress size={24} /> : "LOGIN"}
        </Button>
      </form>
      <Typography mt={2} textAlign="center">
        Don’t have an account? <Link to={ROUTES.REGISTER}>REGISTER</Link>
      </Typography>
    </Box>
  );
};
