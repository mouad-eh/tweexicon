import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function SignInCard() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    useEffect(() => {
        setIncorrectEmail(false);
    }, [email]);
    const [password, setPassword] = useState("");
    useEffect(() => {
        setIncorrectPassword(false);
    }, [password]);
    const [incorrectEmail, setIncorrectEmail] = useState(false);
    const [incorrectPassword, setIncorrectPassword] = useState(false);

    return (
        <form onSubmit={
            (e) => {
                e.preventDefault();
                axios.post(
                    "http://localhost:3000/signin",
                    { email: email, password: password },
                    { headers: { 'Content-Type': 'application/json' } }
                ).then(function (response) {
                    const payload = jwt(response.data.jwt);
                    Cookies.set("jwt-authorization", response.data.jwt, {
                        path: '/',
                        // domain: 'localhost',
                        expires: new Date(payload.exp * 1000)
                    })
                    // redirection to the main page
                    navigate("/mainpage");
                }).catch(function (err) {
                    const error = err.response.data.error;
                    if (error.code === 450) {
                        setIncorrectEmail(true);
                    }
                    else { // error.code == 451
                        setIncorrectPassword(true);
                    }
                });
            }
        }>
            <Sheet sx={{
                width: {
                    xs: 280, //0
                    sm: 400, //600
                    md: 400, //900
                    lg: 450, //1200
                    xl: 500  //1536
                },
                mx: 'auto',
                my: "3rem",
                px: "1.5rem",
                py: "2rem",
                display: 'flex',
                flexDirection: 'column',
                gap: "1rem",
                borderRadius: 'sm',
                boxShadow: 'md'
            }}>
                <Box>
                    <Typography level="h4" component="h1">
                        <b>Welcome!</b>
                    </Typography>
                    <Typography level="body2">Sign in to continue.</Typography>
                </Box>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        name="email"
                        type="email"
                        placeholder="email"
                        value={email}
                        color={incorrectEmail ? 'danger' : 'neutral'}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {incorrectEmail ? <Typography level='body2' color='danger'>incorrect email, try again.</Typography> : null}
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        name="password"
                        type="password"
                        placeholder="password"
                        value={password}
                        color={incorrectPassword ? 'danger' : 'neutral'}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {incorrectPassword ? <Typography level='body2' color='danger'>incorrect password, try again.</Typography> : null}
                </FormControl>
                <Box sx={{ mt: "0.5rem" }}>
                    <Button color='primary' variant='solid' sx={{ width: "100%" }} type='submit'>
                        Sign in
                    </Button>
                    <Typography level='body2' sx={{ mt: "0.5rem", textAlign: "center" }}>
                        if you didn't sign up yet, please{' '}
                        <Link underline="hover" href='/signup' sx={{ color: "#096bde" }}>sign up</Link>
                    </Typography>
                </Box>
            </Sheet >
        </form>
    )
}