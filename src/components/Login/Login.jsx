/* eslint-disable react/prop-types */
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Paper,
    Box,
    Grid,
    Typography,
    Alert,
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
        // State to handle login error
        const data = new FormData(event.currentTarget);
        // console.log({
        //   username: data.get("Username"),
        //   password: data.get("password"),
        // });
        const username = data.get("Username");
        const password = data.get("password");

        // Validate fields
        if (!username) {
            setUsernameError(true);
            return;
        }
        if (!password) {
            setPasswordError(true);
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
            setShowAlert(false);
            navigate("/Dashboard")

        } catch (error) {
            setShowAlert(true);
            setMassageAlert(error.response.data.message);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            "url(https://source.unsplash.com/random?wallpapers)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>

                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                fullWidth
                                id="Username"
                                label="Username"
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
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                variant="standard"
                                error={passwordError}
                                helperText={passwordError && "กรุณากรอก Password!"}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            {showAlert && (
                                <Alert variant="filled" severity="warning">
                                    {massageAlert}
                                </Alert>
                            )}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
