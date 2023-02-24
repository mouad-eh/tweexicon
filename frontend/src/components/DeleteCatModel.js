import React from 'react';
import { Autocomplete, Box, Button, Modal, ModalDialog, Typography } from '@mui/joy';

export default function DeleteCatModel({ open, setOpen }) {
    const options = ["dev", "life", "this is my very long category"];
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog sx={{
                maxWidth: 500,
                display: "flex",
                flexDirection: "column",
                gap: "2rem"
            }} >
                <Typography level='h6' fontWeight="bold" textAlign="center">Delete Category</Typography>
                <Box>
                    <Typography sx={{ mb: "0.25rem" }}>Category</Typography>
                    <Autocomplete placeholder='search...' options={options} sx={{
                        width: "100%"
                    }}></Autocomplete>
                </Box>
                <Button color='danger' variant='soft'>Delete</Button>
            </ModalDialog>
        </Modal>
    )
}