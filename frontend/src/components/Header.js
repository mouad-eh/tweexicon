import React from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

export default function Header() {
    return (
        <Sheet sx={{
            px: "1rem",
            py: "0.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "sm"
        }} >
            <Typography level='h5' fontWeight="bold" sx={{ color: "#096bde" }}>tweexicon</Typography>
            <div>
                <Button size='sm' sx={{ mr: "0.5rem" }} color='primary' variant='solid'>Sign up</Button>
                <Button size='sm' color='primary' variant='outlined'>Sign in</Button>
            </div>
        </Sheet>
    )
}
