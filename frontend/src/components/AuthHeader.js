import React from 'react';
import { Box, Button, Sheet, Typography } from '@mui/joy';
import Logout from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import jwt from 'jwt-decode';

export default function AuthHeader() {
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
                    Mouad Elhaouari
                </Typography>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <Button color='primary' variant='solid' startDecorator={<Logout />} onClick={(e) => {
                        const cookies = Cookies();
                        const payload = jwt(cookies.get("jwt-authorization"));
                        cookies.remove("jwt-authorization", {
                            path: '/',
                            expires: new Date(payload.exp * 1000)
                        })
                        // the cookies is not deleted after logout
                    }}>
                        log out
                    </Button>
                </Link>
            </Box>
        </Sheet>
    )
}