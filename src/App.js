import logo from './logo.svg';
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
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";
import { Profile } from "./components/profile/Profile";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n/config'
import { Brightness4, Brightness7 } from "@mui/icons-material";

function App() {

  const [themeMode, setThemeMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
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
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Orbyters
              </Typography>
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
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
