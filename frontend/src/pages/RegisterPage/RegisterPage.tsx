import { Box, Button, TextField, Typography } from "@mui/material";

export const RegisterPage = () => {
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
      <form>
        <TextField label="Username" fullWidth margin="normal" required />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          required
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Box>
  );
};
