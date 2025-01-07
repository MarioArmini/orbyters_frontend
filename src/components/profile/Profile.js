import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    AppBar,
    Toolbar,
    Paper,
    Alert,
  } from "@mui/material";
  import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
  import { useAuth } from "../../context/AuthContext";

export const Profile = () => {
    const { user, logout } = useAuth();
  
    if (!user) {
      return <Navigate to="/login" />;
    }
  
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
          <Typography variant="h5" align="center">
            Welcome, {user.name}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Email: {user.Email}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={logout}
            sx={{ mt: 3 }}
          >
            Logout
          </Button>
        </Paper>
      </Container>
    );
  };