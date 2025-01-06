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
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { LoginDto } from "../../dtos/auth/loginDto";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await login(email, password);
        setError("");
      } catch (err) {
        setError(err.message);
      }
    };
  
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>
          <Box textAlign="center" sx={{ mt: 2 }}>
            <Link to="/register">Don't have an account? Register</Link>
          </Box>
        </Paper>
      </Container>
    );
  };