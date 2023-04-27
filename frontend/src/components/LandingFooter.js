import { Sheet, Typography } from '@mui/joy'
import React from 'react'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function LandingFooter() {
    return (
        <Sheet sx={{
            display: "flex",
            justifyContent: "space-between",
            p: "1rem",
            backgroundColor: '#ededed',
            '@media (max-width: 700px)': {
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }
        }}>
            <Sheet sx={{
                backgroundColor: "inherit",
                '@media (max-width: 700px)': {
                    mb: "0.25rem"
                }
            }}>
                <Typography level='h5' fontWeight="bold" sx={{ color: "black", mb: "0.25rem" }}>tweexicon</Typography>
                <Typography>
                    Copyright © {new Date().getFullYear()} tweexicon. All rights reserved.
                </Typography>
            </Sheet>
            <Sheet sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                justifyContent: "center",
                backgroundColor: "inherit"
            }}>
                <Typography level='body1'>made with</Typography>
                <FavoriteIcon fontSize='small' sx={{ color: "red" }}></FavoriteIcon>
                <Typography level='body1'>by{' '}
                    <Link to='https://github.com/mouad-eh'>@mouad-eh</Link>
                </Typography>
            </Sheet>
        </Sheet>
    )
}
