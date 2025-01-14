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
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '1px',
                        backgroundColor: theme.palette.text.footerText,
                        marginBottom: '16px',
                    }}
                />

                <Box sx={{ mt: 3, width: "100%" }}>
                    <Typography sx={{ justifyContent: "flex-start" }} variant="body2" color="text.footerText">
                        © {new Date().getFullYear()} {t("copiright")}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};
