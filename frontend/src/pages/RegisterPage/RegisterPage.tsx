import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../api/useRegister";
import { ROUTES } from "../../router";
import { validateEmail } from "../../utils";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const registerMutation = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }
    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters long");
      return;
    }
    if (password.length < 5) {
      setPasswordError("Password must be at least 5 characters long");
      return;
    }

    setUsernameError("");
    setPasswordError("");
    setEmailError("");

    registerMutation.mutate(
      { username, email, password },
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
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          required
          value={username}
          error={!!usernameError}
          helperText={usernameError}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          required
          value={email}
          error={!!emailError}
          helperText={emailError}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          required
          value={password}
          error={!!passwordError}
          helperText={passwordError}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          type="submit"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? (
            <CircularProgress size={24} />
          ) : (
            "REGISTER"
          )}
        </Button>
      </form>
      <Typography mt={2} textAlign="center">
        Already have an account? <Link to={ROUTES.LOGIN}>LOGIN</Link>
      </Typography>
    </Box>
  );
};
