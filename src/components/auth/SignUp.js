import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    Paper,
    Alert,
    CircularProgress,
    IconButton,
    InputAdornment,
    OutlinedInput,
    FormControl,
    InputLabel,
    FormHelperText
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate, Link as RouterLink } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { SignUpDto } from "../../dtos/auth/signUpDto";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Link } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const SignUp = ({ currentTheme, t }) => {
    const { signUp } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        surname: "",
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
        confirmPassword: Yup.string().min(8, t("passwordLengthValidation")).required(t("passwordValidation")),
    });

    return (
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", mt: 5 }}>
            <Container maxWidth="md">
                <Paper
                    elevation={6}
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        overflow: "hidden",
                        animation: "fadeIn 1s",
                        "@keyframes fadeIn": {
                            from: { opacity: 0 },
                            to: { opacity: 1 },
                        },
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            color: "text.primary",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 4,
                        }}
                    >
                        <Typography variant="h4" gutterBottom>
                            {t("welcomeTitle")}
                        </Typography>
                        <Typography variant="body1" align="center">
                            {t("signUpSubtitle")}
                        </Typography>
                    </Box>

                    <Box sx={{ flex: 1, p: 4 }}>
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
                            <FormControl sx={{ mb:1, mt: 2, width: '100%' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">{t("password")}</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    label={t("password")}
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={!!formErrors.password}
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
                                    {formErrors.password || ""}
                                </FormHelperText>
                            </ FormControl>

                            <FormControl sx={{ mb:1, mt: 2, width: '100%' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">{t("confirmPassword")}</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    label={t("confirmPassword")}
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={!!formErrors.confirmPassword}
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
                                    {formErrors.confirmPassword || ""}
                                </FormHelperText>
                            </ FormControl>

                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                                sx={{ mt: 2, borderRadius: 5 }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} sx={{ color: "white" }} />
                                ) : (
                                    t("signUpBtn")
                                )}
                            </Button>
                        </form>

                        <Box textAlign="center" sx={{ mt: 2 }}>
                            <Link component={RouterLink} to="/login">{t("redirectToLoginText")}</Link>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box >
    );
};