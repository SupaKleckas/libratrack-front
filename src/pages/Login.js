import React, { useState } from "react"
import '../index.css'
import URL from "../utils/Url.js"
import { Container, Grid, Box } from "@mui/material"
import { setRefreshToken, setJwtToken } from "../utils/Auth"
import { useNavigate } from "react-router-dom"
import Typography from "@mui/material/Typography"
import { TextField, Button } from '@mui/material';

export default function Login() {
    const navigate = useNavigate();

    const initialData = Object.freeze({
        UserName: "",
        password: ""
    });
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.clear()
        sessionStorage.clear()
        doLogin();
    };

    async function doLogin() {

        let data = {
            Username: formData.userName,
            Password: formData.password
        };
        let url = URL + "/login";

        let assignedLibrary = null;

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.ok ? response.json() : null)
            .catch(error => {
                console.log(error);
            });
        if (response == null) {
            return;
        } else {
            setJwtToken(response.accessToken);
            setRefreshToken(response.refreshToken);
            assignedLibrary = response.assignedLibrary

            localStorage.setItem("assignedLibrary", assignedLibrary)

            navigate("/");
        }
    }  

    return (
        <Grid container justifyContent="center" alignItems="center" direction="column" sx={{mt: 10}} >
            <Typography
                variant="h6"
                sx={{
                    fontFamily: 'Open Sans, sans-serif',
                    fontWeight: 800,
                    fontSize: 40,
                    textAlign: 'start'
                }}
            >
                LibraTrack
            </Typography>
            <Container maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="Username"
                            name="userName"
                            autoFocus
                            onChange={handleChange}
                            color="warning"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handleChange}
                            color="warning"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor:"#907163", fontFamily: 'Open Sans, sans-serif',  '&:hover': {bgcolor: "#52433d"}}}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Grid>
    )
}
