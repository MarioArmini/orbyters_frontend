import {
  Button,
  Box,
  Typography,
  Container,
  AppBar,
  Toolbar,
  Paper,
  Avatar,
  useTheme,
  CircularProgress
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Profile = () => {
  const { user, logout, loading, fetchUser } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        if (!user) {
          await fetchUser();
        }
      } catch (error) {
        console.error("Error fetching user in Profile:", error);
        navigate("/login");
      } finally {
        setInitialLoading(false);
      }
    };

    initialize();
  }, [fetchUser, navigate, user]);

  if (initialLoading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading your profile...</Typography>
      </Box>
    );
  }

  if (!user) {
    console.log('bnastado')
    return <Navigate to="/login" />;
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: theme.palette.text.primary }}>
            User Profile
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mb: 3,
              backgroundColor: theme.palette.background.main,
              fontSize: "2rem",
              color: "text.accents"
            }}
          >
            {user.name[0]}
          </Avatar>

          <Typography variant="h4" gutterBottom>
            {user.name} {user.surname}
          </Typography>

          <Box sx={{ width: "100%", mt: 3 }}>
            <Typography variant="subtitle1" color="text.accents">
              Email:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {user.email}
            </Typography>

            <Typography variant="subtitle1" color="text.accents" sx={{ mt: 2 }}>
              Roles:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {user.roles.map((role) => role.Name).join(", ") || "No roles assigned"}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              logout();
              navigate("/");
            }}
            sx={{ mt: 4, color: theme.palette.text.primary }}
          >
            Logout
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};