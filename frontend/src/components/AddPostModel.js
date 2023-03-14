import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalDialog, Typography } from '@mui/joy';
import Add from '@mui/icons-material/Add';
import AddCatModel from './AddCatModel';
import CustomAutoComplete from './CustomAutoComplete';
import { fetchCategories } from '../utils/apiCalls';
import { useQuery } from '@tanstack/react-query';

export default function AddPostModel({ open, setOpen }) {
    const [newCatOpen, setNewCatOpen] = useState(false);
    const { isLoading, data: categories } = useQuery(['categories'], fetchCategories);

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
                <FormControl>
                    <FormLabel sx={{ mb: "0.25rem" }}>Category</FormLabel>
                    <Box sx={{
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
                        <CustomAutoComplete placeholder='search...' options={isLoading ? [] : categories}
                            loading={isLoading}
                            sx={{
                                width: {
                                    xs: "100%",
                                    sm: "auto"
                                }
                            }} />
                        <Button color='success' variant='solid' sx={{
                            width: {
                                xs: "100%",
                                sm: "auto"
                            }
                        }} startDecorator={<Add />} onClick={() => setNewCatOpen(true)}>New Category</Button>
                        <AddCatModel open={newCatOpen} setOpen={setNewCatOpen}></AddCatModel>
                    </Box>
                </FormControl>
                <Button color='success' variant='soft'>Save</Button>
            </ModalDialog>
        </Modal >
    )
}
