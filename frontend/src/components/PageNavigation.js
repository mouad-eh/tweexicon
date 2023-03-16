import React from 'react';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export default function PageNavigation({ page, setPage, postsCount }) {
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
                onClick={() => {
                    setPage(page - 1)
                }}
                disabled={page === 1}
            >previous</Button>
            <Button variant='outlined' endDecorator={<KeyboardArrowRight />}
                onClick={() => {
                    setPage(page + 1)
                }}
                disabled={page === Math.max(Math.ceil(postsCount / 5), 1)}
            // max(,1) for postscounts == 0 cuz page will never be equal to 0
            >next</Button>
        </Sheet >
    )
}