import React from 'react';
import { Box, Button, Modal, ModalClose, ModalDialog, Option, Select, Typography } from '@mui/joy';

export default function DeleteCatModel({ open, setOpen }) {
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
                    <Select placeholder="Choose category">
                        <Option value="dev">dev</Option>
                        <Option value="life">life</Option>
                        <Option value="podcast">podcast</Option>
                    </Select>
                </Box>
                <Button color='danger' variant='soft'>Delete</Button>
            </ModalDialog>
        </Modal>
    )
}