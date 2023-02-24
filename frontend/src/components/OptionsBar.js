import React from 'react';
import { Autocomplete, Box, Button, Sheet, Typography } from '@mui/joy';
import { Add, Delete } from '@mui/icons-material';

export default function OptionsBar({ setNewPostOpen, setDeleteCatOpen }) {
    const options = ["dev", "life", "this is my long category"]
    return (
        <Sheet sx={{
            px: "1rem",
            py: "0.5rem",
            display: "flex",
            flexDirection: {
                xs: "column",
                sm: "row"
            },
            justifyContent: "space-between",
            gap: {
                xs: "1rem",
                sm: 0
            },
            alignItems: "center"
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: {
                    xs: "column",
                    sm: "row"
                },
                alignItems: "center",
                gap: '0.5rem'
            }}>
                <Typography sx={{
                    display: {
                        xs: "none",
                        sm: "inherit"
                    }
                }}>filter by category:</Typography>
                <Autocomplete placeholder='filter by category' options={options}></Autocomplete>
                {/* will add custom option appearance */}
            </Box>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
            }}>
                <Button color='success' variant='soft' startDecorator={<Add />} onClick={() => setNewPostOpen(true)}>New Post</Button>
                <Button color='danger' variant='soft' startDecorator={<Delete />} onClick={() => setDeleteCatOpen(true)}>Delete Category</Button>
            </Box>
        </Sheet>
    )
}
