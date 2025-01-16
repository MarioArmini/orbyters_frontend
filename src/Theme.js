import { alpha, createTheme } from "@mui/material";

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
                        main: "#ffffff",
                    },
                    background: {
                        default: "#001831",
                        paper: "#001831",
                        footer: "#001831",
                        main: "rgb(2,0,6)",
                        gradient: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,24,49,1) 3%, rgba(0,24,49,1) 12%)",
                    },
                    text: {
                        primary: "#ffffff",
                        secondary: "#001831",
                        footerText: "#ffffff",
                        accents: "#D16014",
                        accents2: "#A53860",
                        chatColor: "#001831",
                    },
                    cards: {
                        background1: alpha("#D16014", 0.4),
                        background2: alpha("#607466", 0.4),
                        background3: alpha("#71A9F7", 0.8),
                        background4: alpha("#875C74", 0.8),
                        buttonColor1: alpha("#23CE6B", 0.4)
                    }
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
                    cards: {
                        background1: alpha("#D16014", 0.4),
                        background2: alpha("#23CE6B", 0.4),
                        background3: alpha("#71A9F7", 0.4),
                        background4: alpha("#875C74", 0.4),
                        buttonColor1: alpha("#23CE6B", 0.8)
                    }
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
                            borderColor: themeMode === "dark" ? "#ffffff" : "#001831",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: themeMode === "dark" ? "#ffffff" : "#001831",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: themeMode === "dark" ? "#ffffff" : "#001831",
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
                        color: themeMode === "dark" ? "#ffffff" : "#001831",
                        "&.Mui-focused": {
                            color: themeMode === "dark" ? "#ffffff" : "#001831",
                        },
                        "&.MuiFormLabel-filled": {
                            color: themeMode === "dark" ? "#ffffff" : "#001831",
                        },
                    },
                },
            },
            MuiLink: {
                styleOverrides: {
                    root: {
                        color: themeMode === "dark" ? "#ffffff" : "#001831",
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
                        backgroundColor: themeMode === 'dark' ? '#001831' : '#ffffff',
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: themeMode === 'dark' ? '#ffffff' : '#001831',
                        borderRadius: '4px',
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: themeMode === 'dark' ? '#f5f5f5' : '#1565c0',
                    },
                    'body': {
                        scrollbarColor: themeMode === 'dark' ? '#710627 #1e1e1e' : '#1976d2 #f5f5f5',
                    },
                },
            }
        },
    });
