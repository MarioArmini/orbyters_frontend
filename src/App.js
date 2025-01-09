import logoDark from './logo_dark.png';
import logoLight from './logo_light.png'
import './App.css';
import {
  Typography,
  AppBar,
  Toolbar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  IconButton
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";
import { Profile } from "./components/profile/Profile";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n/config'
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { getTheme } from './Theme';
import { Footer } from './components/footer/Footer'

function App() {
  const storedThemeMode = localStorage.getItem('themeMode');
  const initialThemeMode = storedThemeMode ? storedThemeMode : "light";
  const [themeMode, setThemeMode] = useState(initialThemeMode);
  const theme = useMemo(() => getTheme(themeMode), [themeMode]);

  const toggleTheme = () => {
    const newThemeMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newThemeMode);
    localStorage.setItem('themeMode', newThemeMode);
  };

  const { i18n, t } = useTranslation();

  const changeLanguage = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppBar position="fixed">
            <Toolbar>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <img
                  src={themeMode === 'dark' ? logoDark : logoLight}
                  alt="Logo"
                  style={{ width: 50, height: 50, objectFit: 'contain', display: 'block' }}
                />
                </Link>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <FormControl size="small">
                <InputLabel>{t("language")}</InputLabel>
                <Select
                  value={i18n.language}
                  onChange={changeLanguage}
                  label={t("language")}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="it">Italiano</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ ml: 3, display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton onClick={toggleTheme} color="inherit">
                  {themeMode === "dark" ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/login" element={<Login currentTheme={themeMode} t={t} />} />
            <Route path="/signup" element={<SignUp currentTheme={themeMode} t={t} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
