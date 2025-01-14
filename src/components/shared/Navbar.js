import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Menu,
  Avatar
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import logoDark from '../../logo_dark.png';
import logoLight from '../../logo_light.png';
import { useState } from "react";

export const Navbar = ({ themeMode, toggleTheme, t, changeLanguage, language }) => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDashboardClick = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img
              src={themeMode === 'dark' ? logoDark : logoLight}
              alt="Logo"
              style={{ width: 50, height: 50, objectFit: 'contain' }}
            />
          </Link>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <FormControl size="small">
          <InputLabel>{t("language")}</InputLabel>
          <Select
            value={language}
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
          <Button
            variant="contained"
            color="secondary"
            onClick={user ? handleMenuClick : handleAuthClick}
          >
            {user ? <Avatar
              src={`https://ui-avatars.com/api/?name=${user.name}`}
              alt={`${user.name} ${user.surname}`}
              sx={{ width: "2rem", height: "2rem", mx: 'auto' }}
            /> : t("login")}
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {user && (
              <>
                <MenuItem onClick={handleDashboardClick}>Dashboard</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
