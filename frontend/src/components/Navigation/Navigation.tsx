import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../router";
import { AppBar, Box, Button, TextField, Toolbar } from "@mui/material";
import { isAdmin } from "../../utils";

export const Navigation = () => {
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initialSearch = searchParams.get("search") || "";
    setSearch(initialSearch);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    setSearchParams(params);
    navigate({ pathname: ROUTES.QUIZZES_PAGE, search: params.toString() });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate(ROUTES.HOME);
  };

  if (
    !location.pathname.startsWith("/quizzes") &&
    !location.pathname.startsWith("/quiz") &&
    !location.pathname.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box component="form" onSubmit={handleSearch} display="flex" gap={1}>
          <TextField
            size="small"
            placeholder="Search quizzes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Search
          </Button>
        </Box>

        <Box display="flex" gap={1}>
          {isAdmin() && (
            <>
              <Button
                variant="outlined"
                onClick={() => navigate(ROUTES.ADMIN_USERS)}
              >
                Users
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate(ROUTES.ADMIN_CREATE_QUIZ)}
              >
                Create Quiz
              </Button>
            </>
          )}
          <Button onClick={handleLogout} color="error" variant="outlined">
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
