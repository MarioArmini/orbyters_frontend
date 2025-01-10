import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    CircularProgress,
    Paper,
    Alert,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate, Link as RouterLink, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ResetPasswordDto } from "../../dtos/auth/resetPasswordDto";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const ResetPassword = ({ currentTheme, t }) => {
    const { resetPassword } = useAuth();
    const location = useLocation();

    const queryParameters = new URLSearchParams(location.search);
    const token = queryParameters.get("token");

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmNewPassword: "",
        token: token
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setFormErrors({});

        if (formData.newPassword !== formData.confirmNewPassword) {
            setError(t("resetPasswordError"));
            setLoading(false);
            return;
        }

        try {
            await validationSchema.validate(formData, { abortEarly: false });
            const resetPasswordDto = ResetPasswordDto(formData);
            await resetPassword(resetPasswordDto);
            setLoading(false)
            navigate("/reset-password-confirmation")
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
        newPassword: Yup.string().min(8, t("passwordLengthValidation")).required(t("passwordValidation")),
        confirmNewPassword: Yup.string().min(8, t("passwordLengthValidation")).required(t("passwordValidation")),
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
                        {t("resetPasswordTitle")}
                    </Typography>

                    {error && <Alert severity="error">{error}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <FormControl sx={{ mb: 1, mt: 2, width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">{t("newPassword")}</InputLabel>
                            <OutlinedInput
                                fullWidth
                                label={t("newPassword")}
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                error={!!formErrors.newPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleShowPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText sx={{ color: 'error.main' }}>
                                {formErrors.newPassword || ""}
                            </FormHelperText>
                        </ FormControl>

                        <FormControl sx={{ mb: 1, mt: 2, width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">{t("confirmNewPassword")}</InputLabel>
                            <OutlinedInput
                                fullWidth
                                label={t("confirmNewPassword")}
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmNewPassword"
                                value={formData.confirmNewPassword}
                                onChange={handleChange}
                                error={!!formErrors.confirmNewPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showConfirmPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleShowConfirmPassword}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText sx={{ color: 'error.main' }}>
                                {formErrors.confirmNewPassword || ""}
                            </FormHelperText>
                        </ FormControl>

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
                                t("resetPasswordBtn")
                            )}
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Box>
    );
};