import {
  Button,
  Box,
  Typography,
  Container,
  AppBar,
  Toolbar,
  Paper,
  Grid2,
  Avatar,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            User Profile
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Avatar
            sx={{ width: 100, height: 100, mb: 3, backgroundColor: "primary.main" }}
          >
            {user.name[0]}
          </Avatar>

          <Typography variant="h4" gutterBottom>
            {user.name} {user.surname}
          </Typography>

          <Grid2 container spacing={2} sx={{ mt: 2 }}>
            <Grid2 item xs={12} md={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Email
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {user.email}
              </Typography>
            </Grid2>

            <Grid2 item xs={12} md={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Roles
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {user.roles.map(role => role.Name).join(", ") || "No roles assigned"}
              </Typography>
            </Grid2>
          </Grid2>

          <Button
            variant="contained"
            color="secondary"
            onClick={logout}
            sx={{ mt: 4 }}
          >
            Logout
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};
