import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    AppBar,
    Toolbar,
    Paper,
    Alert,
    CircularProgress
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { SignUpDto } from "../../dtos/auth/signUpDto";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

export const SignUp = () => {
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

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Register
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        margin="normal"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                    />
                    <TextField
                        fullWidth
                        label="Surname"
                        margin="normal"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        error={!!formErrors.surname}
                        helperText={formErrors.surname}
                    />
                    <TextField
                        fullWidth
                        label="Email"
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
                        label="Password"
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
                            <CircularProgress size={24} sx={{ color: 'white' }} />
                        ) : (
                            "Register"
                        )}
                        Register
                    </Button>
                </form>
                <Box textAlign="center" sx={{ mt: 2 }}>
                    <Link to="/login">Already have an account? Login</Link>
                </Box>
            </Paper>
        </Container>
    );
};