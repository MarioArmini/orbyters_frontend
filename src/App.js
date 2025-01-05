import logo from './logo.svg';
import './App.css';
import {
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";
import { Profile } from "./components/profile/Profile";


function App() {
  return (
    <AuthProvider>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Orbyters
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
