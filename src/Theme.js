import { createTheme } from "@mui/material";

export const getTheme = (themeMode) =>
    createTheme({
        palette: {
            mode: themeMode,
            ...(themeMode === "dark"
                ? {
                    primary: {
                        main: "#00173d",
                    },
                    secondary: {
                        main: "#00bcd4",
                    },
                    background: {
                        default: "#00173d",
                        paper: "#002855",
                    },
                    text: {
                        primary: "#ffffff",
                        secondary: "#00bcd4",
                    },
                }
                : {
                    primary: {
                        main: "#f5f5f5",
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
        },
    });