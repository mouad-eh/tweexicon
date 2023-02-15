import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react';
import { Link } from '@mui/material';

export default function Footer() {
    return (
        <Sheet sx={{
            py: "0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            mx: "auto"
        }}>
            <Typography>made with</Typography>
            <FavoriteIcon sx={{ color: "red" }}></FavoriteIcon>
            <Typography>by{' '}
                <Link underline="hover" href='https://github.com/mouad-eh' sx={{ color: "#096bde" }}>@mouad-eh</Link>
            </Typography>
        </Sheet>
    )
}
