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
} from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Profile = () => {
  const { user, logout } = useAuth();
  const theme = useTheme();

  if (!user) {
    return <Typography>Loading user profile...</Typography>;
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
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: theme.palette.text.primary }}>
            User Profile
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Profile Content */}
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
          {/* Avatar */}
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mb: 3,
              backgroundColor: theme.palette.secondary.main,
              fontSize: "2rem",
            }}
          >
            {user.name[0]}
          </Avatar>

          {/* User Name */}
          <Typography variant="h4" gutterBottom>
            {user.name} {user.surname}
          </Typography>

          {/* User Details */}
          <Box sx={{ width: "100%", mt: 3 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Email:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {user.email}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
              Roles:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {user.roles.map((role) => role.Name).join(", ") || "No roles assigned"}
            </Typography>
          </Box>

          {/* Logout Button */}
          <Button
            variant="contained"
            color="secondary"
            onClick={logout}
            sx={{ mt: 4, color: theme.palette.text.primary }}
          >
            Logout
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};
