import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    Paper,
    Alert,
    CircularProgress,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { SignUpDto } from "../../dtos/auth/signUpDto";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export const SignUp = ({ currentTheme, t }) => {
    const { signUp } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        surname: "",
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
            const signUpDto = SignUpDto(formData);
            await signUp(signUpDto);
            setLoading(false)
            navigate("/login")
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
        name: Yup.string().required(t("nameValidation")),
        surname: Yup.string().required(t("surnameValidation")),
        email: Yup.string().email(t("emailFormatValidation")).required(t("emailValidation")),
        password: Yup.string().min(8, t("passwordLengthValidation")).required(t("passwordValidation")),
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
                        {t("signUpTitle")}
                    </Typography>

                    {error && <Alert severity="error">{error}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label={t("name")}
                            margin="normal"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!formErrors.name}
                            helperText={formErrors.name}
                        />
                        <TextField
                            fullWidth
                            label={t("surname")}
                            margin="normal"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            error={!!formErrors.surname}
                            helperText={formErrors.surname}
                        />
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
                        <TextField
                            fullWidth
                            label={t("password")}
                            type="password"
                            margin="normal"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!formErrors.password}
                            helperText={formErrors.password}
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
                                t("signUpBtn")
                            )}
                        </Button>
                    </form>

                    <Box textAlign="center" sx={{ mt: 2 }}>
                        <Link to="/login">{t("redirectToLoginText")}</Link>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};