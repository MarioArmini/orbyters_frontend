import {
    Box,
    Typography,
    Container,
    Paper,
    useTheme,
} from "@mui/material";
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
        <Paper
            component="footer"
            sx={{
                backgroundColor: theme.palette.background.paper,
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
                <Typography variant="subtitle1" color="text.footerText">
                    Email: support@example.com
                </Typography>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" color="text.footerText">
                        Follow us:
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        <a href="https://facebook.com" style={{ marginRight: '10px', textDecoration: 'none', color: theme.palette.text.footerText }}>
                            Facebook
                        </a>
                        <a href="https://twitter.com" style={{ marginRight: '10px', textDecoration: 'none', color: theme.palette.text.footerText }}>
                            Twitter
                        </a>
                        <a href="https://linkedin.com" style={{ textDecoration: 'none', color: theme.palette.text.footerText }}>
                            LinkedIn
                        </a>
                    </Typography>
                </Box>

                <Box sx={{ mt: 3 }}>
                    <Typography variant="body2" color="text.footerText">
                        © {new Date().getFullYear()} YourCompany. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Paper>
    );
};
