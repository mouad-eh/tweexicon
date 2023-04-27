import React from 'react';
import { Box, Button, Sheet, Typography } from '@mui/joy';
import Logout from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt from 'jwt-decode';
import { JWT_COOKIE, queryClient } from '../utils/constants';



export default function AuthHeader() {
    const payload = jwt(Cookies.get(JWT_COOKIE));
    function capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }

    return (
        <Sheet sx={{
            px: "1rem",
            py: "0.5rem",
            mb: {
                xs: "1rem",
                sm: "0.5rem"
            },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "sm"
        }} >
            <Typography level='h5' fontWeight="bold" sx={{ color: "primary.500" }}>
                <Link to='/' style={{ textDecoration: 'none', color: "inherit" }}>
                    tweexicon
                </Link>
            </Typography>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem"
            }}>
                <Typography level='body1' sx={{
                    color: "neutral.500",
                    display: {
                        xs: "none",
                        sm: "inherit"
                    }
                }}>
                    {capitalize(payload.firstName) + ' ' + capitalize(payload.lastName)}
                </Typography>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <Button color='primary' variant='solid' startDecorator={<Logout />} onClick={() => {
                        queryClient.clear();
                        const payload = jwt(Cookies.get(JWT_COOKIE));
                        Cookies.remove(JWT_COOKIE, {
                            path: '/',
                            domain: process.env.REACT_APP_DOMAIN,
                            expires: new Date(payload.exp * 1000)
                        })
                    }}>
                        log out
                    </Button>
                </Link>
            </Box>
        </Sheet >
    )
}