import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  CircularProgress,
  Paper,
  Alert,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate, Link as RouterLink } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { LoginDto } from "../../dtos/auth/loginDto";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Link } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const Login = ({ currentTheme, t }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors({});
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const loginDto = LoginDto(formData);
      await login(loginDto);
      setLoading(false)
      navigate("/profile")
    } catch (err) {
      setLoading(false)
      if (err.name === "ValidationError") {
        const errors = err.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setFormErrors(errors);
      } else {
        setError(err.message);
      }
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email(t("emailFormatValidation")).required(t("emailValidation")),
    password: Yup.string().min(8, t("passwordLengthValidation")).required(t("passwordValidation")),
  });

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", flex: 1 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: "100%",
            animation: "fadeIn 1s",
            "@keyframes fadeIn": {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            {t("loginTitle")}
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={t("email")}
              type="email"
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            <FormControl sx={{ mb: 1, mt: 2, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">{t("password")}</InputLabel>
              <OutlinedInput
                fullWidth
                label={t("password")}
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={!!formErrors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? 'hide the password' : 'display the password'
                      }
                      onClick={handleShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText sx={{ color: 'error.main' }}>
                {formErrors.password || ""}
              </FormHelperText>
            </ FormControl>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2, borderRadius: 5 }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                t("loginBtn")
              )}
            </Button>
          </form>

          <Box textAlign="center" sx={{ mt: 2 }}>
            <Link component={RouterLink} to="/signup">{t("redirectToSignUpText")}</Link>
          </Box>
          <Box textAlign="center" sx={{ mt: 2 }}>
            <Link component={RouterLink} to="/forgot-password">{t("redirectToForgotPasswordText")}</Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};