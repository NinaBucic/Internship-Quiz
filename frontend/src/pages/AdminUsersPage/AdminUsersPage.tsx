import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TableContainer,
  CircularProgress,
} from "@mui/material";
import { useFetchAdminUsers } from "../../api/useFetchAdminUsers";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAdmin } from "../../utils";
import toast from "react-hot-toast";
import { ROUTES } from "../../router";

export const AdminUsersPage = () => {
  const { data: users, isLoading, isError } = useFetchAdminUsers();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin()) {
      toast.error("You are not authorized to access this page.");
      navigate(ROUTES.QUIZZES_PAGE);
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={10}
      >
        <CircularProgress />
        <Typography>Loading users...</Typography>
      </Box>
    );
  }

  if (isError || !users) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <Typography color="error">Failed to load users.</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" mb={4}>
        All Users:
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Username</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Role</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Total Points</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">{user.totalPoints}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
