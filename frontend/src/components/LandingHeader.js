import React from 'react'
import { Button, Typography, Box } from '@mui/joy';
import { SIGNIN_PATH, SIGNUP_PATH } from '../utils/constants';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'primary.500',
            px: "1rem",
            py: "0.5rem",
            boxShadow: "sm"
        }}>
            <Typography level="h5" fontWeight="bold" sx={{ color: 'white' }}>
                tweexicon
            </Typography>
            <Box >
                <Link to={SIGNUP_PATH} style={{ textDecoration: "none" }}>
                    <Button sx={{ mr: "0.5rem" }}>
                        Sign up
                    </Button>
                </Link>
                <Link to={SIGNIN_PATH} style={{ textDecoration: "none" }}>
                    <Button  >
                        Sign in
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default Navbar;
