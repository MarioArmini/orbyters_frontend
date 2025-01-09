import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    CircularProgress,
    Paper,
    Alert,
} from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ForgotPasswordDto } from "../../dtos/auth/forgotPasswordDto";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const ForgotPassword = ({ currentTheme, t }) => {
    const { forgotPassword } = useAuth();
    const [formData, setFormData] = useState({
        email: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFormErrors({});
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            const forgotPasswordDto = ForgotPasswordDto(formData);
            await forgotPassword(forgotPasswordDto);
            setLoading(false)
            navigate("/forgot-password-confirmation")
        } catch (err) {
            setLoading(false)
            if (err.name === "ValidationError") {
                const errors = err.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {});
                setFormErrors(errors);
            } else {
                setError(err.message);
            }
        }
    };

    const validationSchema = Yup.object({
        email: Yup.string().email(t("emailFormatValidation")).required(t("emailValidation"))
    });

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
                        {t("forgotPasswordTitle")}
                    </Typography>

                    {error && <Alert severity="error">{error}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label={t("email")}
                            type="email"
                            margin="normal"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ mt: 2 }}
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ color: "white" }} />
                            ) : (
                                t("confirmForgotPasswordBtn")
                            )}
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};