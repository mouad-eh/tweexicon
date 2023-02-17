import React from 'react';
import Chip from '@mui/joy/Chip';
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
            mb: "1rem"
        }}>
            <Button size="sm" variant='outlined' startDecorator={<KeyboardArrowLeft />}>previous</Button>
            <Button size="sm" variant='outlined' endDecorator={<KeyboardArrowRight />}>next</Button>
        </Sheet >
    )
}
