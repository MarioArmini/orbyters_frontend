import { createTheme } from "@mui/material";

export const getTheme = (themeMode) =>
    createTheme({
        palette: {
            mode: themeMode,
            ...(themeMode === "dark"
                ? {
                    primary: {
                        main: "#001831"
                    },
                    secondary: {
                        main: "#4B2D00",
                    },
                    background: {
                        default: "#001831",
                        paper: "#001831",
                        footer: "#001831"
                    },
                    text: {
                        primary: "#ffffff",
                        secondary: "#001831",
                        footerText: "#ffffff",
                        accents: "#AB6600",
                        chatColor: "ffffff",
                    },
                }
                : {
                    primary: {
                        main: "#ffffff",
                    },
                    secondary: {
                        main: "#001831",
                    },
                    background: {
                        default: "#ffffff",
                        paper: "#f5f5f5",
                        footer: "#ffffff"
                    },
                    text: {
                        primary: "#001831",
                        secondary: "#ffffff",
                        footerText: "#001831",
                        accents: "#001831",
                        chatColor: "#ffffff",
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
                            borderColor: themeMode === "dark" ? "#AB6600" : "#001831",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: themeMode === "dark" ? "#AB6600" : "#001831",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: themeMode === "dark" ? "#AB6600" : "#001831",
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
                        color: themeMode === "dark" ? "#AB6600" : "#001831",
                        "&.Mui-focused": {
                            color: themeMode === "dark" ? "#AB6600" : "#001831",
                        },
                        "&.MuiFormLabel-filled": {
                            color: themeMode === "dark" ? "#AB6600" : "#001831",
                        },
                    },
                },
            },
            MuiLink: {
                styleOverrides: {
                    root: {
                        color: themeMode === "dark" ? "#AB6600" : "#001831",
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
                        backgroundColor: themeMode === "dark" ? "#001831" : "#ffffff",
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
                        backgroundColor: themeMode === 'dark' ? '#001831' : '#f5f5f5',
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: themeMode === 'dark' ? '#AB6600' : '#001831',
                        borderRadius: '4px',
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: themeMode === 'dark' ? '#AB6600' : '#1565c0',
                    },
                    'body': {
                        scrollbarColor: themeMode === 'dark' ? '#4B2D00 #1e1e1e' : '#1976d2 #f5f5f5',
                    },
                },
            }
        },
    });
