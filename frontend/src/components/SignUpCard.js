import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { HOME_PATH, JWT_COOKIE, SIGNUP_ENDPOINT } from '../utils/constants';

export default function SignUpCard() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    useEffect(() => {
        setDuplicateEmail(false);
    }, [email])
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    useEffect(() => {
        setPasswordNoMatch(false);
    }, [confirmPassword])
    const [passwordNoMatch, setPasswordNoMatch] = useState(false);
    const [duplicateEmail, setDuplicateEmail] = useState(false);
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            if (password !== confirmPassword) {
                setPasswordNoMatch(true);
            } else {
                axios.post(
                    SIGNUP_ENDPOINT,
                    { firstName, lastName, email, password },
                    { headers: { 'Content-Type': 'application/json' } }
                ).then(function (response) {
                    const payload = jwt(response.data.jwt);
                    Cookies.set(JWT_COOKIE, response.data.jwt, {
                        path: '/',
                        domain: process.env.REACT_APP_DOMAIN,
                        expires: new Date(payload.exp * 1000)
                    })
                    // redirection to the home page
                    navigate(HOME_PATH);
                }).catch(function (err) {
                    setDuplicateEmail(true);
                });
            }

        }}>
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
                    <Typography level="body2">Sign up to continue.</Typography>
                </Box>
                <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input
                        name="firstname"
                        type="text"
                        placeholder="first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                        name="lastname"
                        type="text"
                        placeholder="last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        name="email"
                        type="email"
                        placeholder="email"
                        value={email}
                        color={duplicateEmail ? 'danger' : 'neutral'}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {duplicateEmail ? <Typography level='body2' color='danger'>email already in use.</Typography> : null}
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        name="password"
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        name="confirmpassword"
                        type="password"
                        placeholder="confirm password"
                        color={passwordNoMatch ? 'danger' : 'neutral'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {passwordNoMatch ? <Typography level='body2' color='danger'>passwords are not matching, try again.</Typography> : null}
                </FormControl>
                <Button color='primary' variant='solid' sx={{ mt: "0.5rem" }} type='submit'>Sign up</Button>
            </Sheet>
        </form>
    )
}