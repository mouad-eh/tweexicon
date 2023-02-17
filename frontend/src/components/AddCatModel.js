import { FormControl, FormLabel, Input, Modal, ModalDialog, Typography, Button } from '@mui/joy';
import React from 'react';
import { ChromePicker } from 'react-color';

export default function AddCatModel({ open, setOpen }) {
    const [color, setColor] = React.useState('#ffffff')

    const handleChange = (color) => {
        setColor(color.hex)
    }
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog sx={{
                maxWidth: 500,
                display: "flex",
                flexDirection: "column",

                gap: "1rem"
            }} >
                <Typography level='h6' fontWeight="bold" textAlign="center">Add Category</Typography>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                        name="name"
                        type="text"
                        placeholder="category name"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Color</FormLabel>
                    <ChromePicker color={color} onChangeComplete={handleChange}></ChromePicker>
                </FormControl>
                <Button color='success' variant='soft'>Add</Button>
            </ModalDialog>
        </Modal>
    )
}
