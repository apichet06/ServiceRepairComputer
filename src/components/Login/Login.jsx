/* eslint-disable react/prop-types */
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Box,
    Typography,
    Alert, Container, Card, CardContent, LinearProgress
} from "@mui/material";
import axios from "axios"; // Make sure to import Axios
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide(props) {
    const { api } = props;
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [massageAlert, setMassageAlert] = useState();
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setloading] = useState(false);

    useEffect(() => {
        let timer;

        if (showAlert) {
            timer = setTimeout(() => {
                setShowAlert(false);
            }, 30000); // 1 minute in milliseconds
        }

        return () => {
            clearTimeout(timer);
        };
    }, [showAlert]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setloading(true)
        const data = new FormData(event.currentTarget);

        const username = data.get("Username");
        const password = data.get("password");

        // Validate fields
        if (!username) {
            setUsernameError(true);
            setloading(false)
            return;
        }
        if (!password) {
            setPasswordError(true);
            setloading(false)
            return;
        }

        try {
            const response = await axios.post(`${api}EmployeeApi/Login`,
                {
                    username,
                    password,
                }
            );
            const token = response.data.token; // Assuming the token is returned in the JSON response
            const userData = response.data.resulte;
            // console.log(token);
            // Store the token in localStorage or sessionStorage
            localStorage.setItem("token", token);
            localStorage.setItem("userData", JSON.stringify(userData));
            setShowAlert(false)
            setloading(false)
            navigate("/Dashboard")

        } catch (error) {
            setShowAlert(true);
            setloading(false)
            setMassageAlert(error.response.data.message);
        }

    };

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" className="">
                            Sign In Computer Repair  <br /><br />
                        </Typography>
                        <Card>
                            <CardContent>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="Username"
                                        label="Username*"
                                        name="Username"
                                        autoComplete="Username"
                                        autoFocus
                                        variant="standard"
                                        error={usernameError}
                                        helperText={usernameError && "กรุณากรอก Username!"}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        name="password"
                                        label="Password*"
                                        type="password"
                                        id="password"
                                        autoComplete="off"
                                        variant="standard"
                                        error={passwordError}
                                        helperText={passwordError && "กรุณากรอก Password!"}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        disabled={loading}>
                                        {!loading ? "Sign In" : "Loading..."}
                                    </Button>
                                    {loading && <LinearProgress color="success" />}

                                    {showAlert && (
                                        <Alert variant="filled" severity="warning">
                                            {massageAlert}
                                        </Alert>
                                    )}
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Container>
            </ThemeProvider >
        </>
    );
}
