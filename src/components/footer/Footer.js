import {
    Box,
    Typography,
    Container,
    useTheme,
} from "@mui/material";
import { t } from "i18next";
import React from "react";
import { useLocation } from 'react-router-dom';


export const Footer = () => {
    const theme = useTheme();
    const location = useLocation();

    const isChatbotRoute = location.pathname.includes('/chatbot');
    const isDocRoute = location.pathname.includes('/doc');

    if (isChatbotRoute) {
        return null;
    }

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: theme.palette.background.footer,
                color: theme.palette.text.footerText,
                p: 4,
                mt: 'auto',
                display: 'flex',
                '@media (max-width:600px)': {
                    padding: 2,
                },
            }}
        >
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isDocRoute ? "end" : "center",
                }}
            >
                <Box
                    sx= {isDocRoute ? 
                        {
                            width: '80%',
                            height: '1px',
                            backgroundColor: theme.palette.text.footerText,
                            marginBottom: '16px',
                            ml: 5
                        } : 
                        {
                            width: '100%',
                            height: '1px',
                            backgroundColor: theme.palette.text.footerText,
                            marginBottom: '16px',
                        }
                    } 
                />

                <Box sx={{ mt: 3, width: isDocRoute ? "80%" : "100%" }}>
                    <Typography sx={{ justifyContent: isDocRoute ? "center" : "flex-start", display: 'flex' }} variant="body2" color="text.footerText">
                        © {new Date().getFullYear()} {t("copiright")}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};
