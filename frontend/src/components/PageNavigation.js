import React from 'react';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export default function PageNavigation() {
    return (
        <Sheet sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.25rem",
            mt: "auto",//stick footer to the bottom
            mb: "1rem"
        }}>
            <Button variant='outlined' startDecorator={<KeyboardArrowLeft />}
            >previous</Button>
            <Button variant='outlined' endDecorator={<KeyboardArrowRight />}
            >next</Button>
        </Sheet >
    )
}