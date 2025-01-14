import { createTheme } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';


export const getTheme = (themeMode) =>
    createTheme({
        palette: {
            mode: themeMode,
            ...(themeMode === "dark"
                ? {
                    primary: {
                        main: "#06303E",
                    },
                    secondary: {
                        main: "#00bcd4",
                    },
                    background: {
                        default: "#06303E",
                        paper: "#06303E",
                    },
                    text: {
                        primary: "#ffffff",
                        secondary: "#06303E",
                        footerText: "#cccccc",
                        accents: "#00bcd4",
                    },
                }
                : {
                    primary: {
                        main: "#ffffff",
                    },
                    secondary: {
                        main: "#1976d2",
                    },
                    background: {
                        default: "#ffffff",
                        paper: "#f5f5f5",
                    },
                    text: {
                        primary: "#000000",
                        secondary: "#1976d2",
                        footerText: "#555555",
                        accents: "#06303E",
                    },
                }),
        },
        typography: {
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        },
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: themeMode === "dark" ? "#00bcd4" : "#9e9e9e",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: themeMode === "dark" ? "#00bcd4" : "#1976d2",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: themeMode === "dark" ? "#00bcd4" : "#1976d2",
                        },
                    },
                    input: {
                        color: themeMode === "dark" ? "#ffffff" : "#000000",
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: themeMode === "dark" ? "#00bcd4" : "#9e9e9e",
                        "&.Mui-focused": {
                            color: themeMode === "dark" ? "#00bcd4" : "#1976d2",
                        },
                        "&.MuiFormLabel-filled": {
                            color: themeMode === "dark" ? "#00bcd4" : "#1976d2",
                        },
                    },
                },
            },
            MuiLink: {
                styleOverrides: {
                    root: {
                        color: themeMode === "dark" ? "#00bcd4" : "#1976d2",
                        textDecoration: "none",
                        "&:hover": {
                            textDecoration: "underline",
                        },
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        color: themeMode === "dark" ? "#ffffff" : "#000000",
                        backgroundColor: themeMode === "dark" ? "#06303E" : "#ffffff",
                        "&:hover": {
                            backgroundColor: themeMode === "dark" ? "#002d40" : "#f0f0f0",
                        },
                    },
                },
            },
            MuiCssBaseline: {
                styleOverrides: {
                    html: {
                        scrollBehavior: 'smooth',
                    },
                    '*::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '*::-webkit-scrollbar-track': {
                        backgroundColor: themeMode === 'dark' ? '#06303E' : '#f5f5f5',
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: themeMode === 'dark' ? '#00bcd4' : '#1976d2',
                        borderRadius: '4px',
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: themeMode === 'dark' ? '#00acc1' : '#1565c0',
                    },
                    'body': {
                        scrollbarColor: themeMode === 'dark' ? '#00bcd4 #1e1e1e' : '#1976d2 #f5f5f5',
                    },
                },
            }
        },
    });
