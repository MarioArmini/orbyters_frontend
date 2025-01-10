import {
    Box,
    Typography,
    Container,
    Paper,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const ResetPasswordConfirmation = ({ currentTheme, t }) => {
    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <Container maxWidth="sm" sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                <Paper
                    elevation={6}
                    sx={{
                        p: 4,
                        width: "100%",
                        animation: "fadeIn 1s",
                        "@keyframes fadeIn": {
                            from: { opacity: 0 },
                            to: { opacity: 1 },
                        },
                    }}
                >
                    <Typography variant="h4" align="center" gutterBottom>
                        {t("resetPasswordConfirmationTitle")}
                    </Typography>
                </Paper>
            </Container>
            <Box textAlign="center" sx={{ mt: 2 }}>
                <Link component={RouterLink} to="/login">{t("redirectToLoginTextReset")}</Link>
            </Box>
        </Box>
    );
};