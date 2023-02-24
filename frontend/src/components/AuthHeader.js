import React from 'react';
import { Box, Button, Sheet, Typography } from '@mui/joy';
import Logout from '@mui/icons-material/Logout';

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
                <Button color='primary' variant='solid' startDecorator={<Logout />}>
                    log out
                </Button>
            </Box>
        </Sheet>
    )
}