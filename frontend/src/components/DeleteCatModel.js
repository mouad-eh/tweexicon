import React from 'react';
import { Box, Button, Modal, ModalDialog, Typography } from '@mui/joy';
import CustomAutoComplete from './CustomAutoComplete';

export default function DeleteCatModel({ open, setOpen }) {
    const options = [
        { name: "dev", color: "#0F61E9" },
        { name: "life", color: "#0FE914" },
        { name: "sport", color: "#E90F8E" }
    ]
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
                    <CustomAutoComplete placeholder='search...' options={options} sx={{
                        width: "100%"
                    }}></CustomAutoComplete>
                </Box>
                <Button color='danger' variant='soft'>Delete</Button>
            </ModalDialog>
        </Modal>
    )
}