import React, { useState } from 'react';
import { Autocomplete, Box, Button, FormControl, FormLabel, Input, Modal, ModalClose, ModalDialog, Option, Select, Typography } from '@mui/joy';
import Add from '@mui/icons-material/Add';
import AddCatModel from './AddCatModel';

export default function AddPostModel({ open, setOpen }) {
    // const options = ["dev", "life", "podcast"];
    const [newCatOpen, setNewCatOpen] = useState(false);
    const [color, setColor] = React.useState('#ffffff')

    const handleChange = (color) => {
        setColor(color)
    }
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog sx={{
                width: {
                    xs: 300,
                    sm: 600
                },
                maxWidth: 500,
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
            }}>
                <Typography level='h6' fontWeight="bold" textAlign="center">Add Post</Typography>
                <FormControl>
                    <FormLabel>URL</FormLabel>
                    <Input
                        name="url"
                        type="text"
                        placeholder="url"
                    />
                </FormControl>
                <Box>
                    <FormLabel sx={{ mb: "0.25rem" }}>Category</FormLabel>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Select placeholder="Choose category" sx={{
                            minWidth: "200px"
                        }}>
                            <Option value="dev">dev</Option>
                            <Option value="life">life</Option>
                            <Option value="podcast">this is a long option</Option>
                        </Select>
                        {/* <Autocomplete placeholder='search...' options={options}></Autocomplete> */}
                        <Button color='success' variant='solid' startDecorator={<Add />} onClick={() => setNewCatOpen(true)}>New Category</Button>
                        <AddCatModel open={newCatOpen} setOpen={setNewCatOpen}></AddCatModel>
                    </Box>
                </Box>
                <Button color='success' variant='soft'>Save</Button>
            </ModalDialog>
        </Modal >
    )
}
