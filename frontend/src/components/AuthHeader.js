import React, { useEffect, useState } from 'react';
import { Box, Button, Sheet, Typography } from '@mui/joy';
import Logout from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt from 'jwt-decode';



export default function AuthHeader() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    function capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }

    useEffect(() => {
        const payload = jwt(Cookies.get("jwt-authorization"));
        setFirstName(capitalize(payload.firstName));
        setLastName(capitalize(payload.lastName));
    }, []);
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
            <Typography level='h5' fontWeight="bold" sx={{ color: "primary.500" }}>tweexicon</Typography>
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
                    {firstName + ' ' + lastName}
                </Typography>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <Button color='primary' variant='solid' startDecorator={<Logout />} onClick={() => {
                        const payload = jwt(Cookies.get("jwt-authorization"));
                        Cookies.remove("jwt-authorization", {
                            path: '/',
                            // domain: 'localhost',
                            expires: new Date(payload.exp * 1000)
                        })
                    }}>
                        log out
                    </Button>
                </Link>
            </Box>
        </Sheet>
    )
}