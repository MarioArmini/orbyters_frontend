import './App.css';
import {
  CssBaseline,
  Box,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";
import { Profile } from "./components/profile/Profile";
import { ThemeProvider } from "@mui/material";
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n/config';
import { getTheme } from './Theme';
import { Footer } from './components/footer/Footer';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { ForgotPasswordConfirmation } from './components/auth/ForgotPasswordConfirmation';
import { ResetPassword } from './components/auth/ResetPassword';
import { ResetPasswordConfirmation } from './components/auth/ResetPasswordConfirmation';
import { Navbar } from './components/shared/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chatbot } from './components/chatbot/Chatbot';
import { ChatbotProvider } from './context/ChatbotContext';
import { MainComponent } from './components/MainComponent';

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
        <ChatbotProvider>
          <Router>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: theme.palette.background.gradient
              }}
            >
              <Navbar
                themeMode={themeMode}
                toggleTheme={toggleTheme}
                t={t}
                changeLanguage={changeLanguage}
                language={i18n.language}
              />

              <Box
                component="main"
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Routes>
                  <Route path="/login" element={<Login currentTheme={themeMode} t={t} />} />
                  <Route path="/signup" element={<SignUp currentTheme={themeMode} t={t} />} />
                  <Route path="/profile" element={<Profile currentTheme={themeMode} t={t} />} />
                  <Route path="/" element={<MainComponent currentTheme={themeMode} t={t} />} />
                  <Route path="/forgot-password" element={<ForgotPassword currentTheme={themeMode} t={t} />} />
                  <Route path='/forgot-password-confirmation' element={<ForgotPasswordConfirmation currentTheme={themeMode} t={t} />} />
                  <Route path='/reset-password' element={<ResetPassword currentTheme={themeMode} t={t} />} />
                  <Route path='/reset-password-confirmation' element={<ResetPasswordConfirmation currentTheme={themeMode} t={t} />} />
                  <Route path='/chatbot' element={<Chatbot currentTheme={themeMode} t={t} />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </Router>
        </ChatbotProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
