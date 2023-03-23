import { FormControl, FormLabel, Input, Modal, ModalDialog, Typography, Button, ModalClose } from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import { queryClient } from '../utils/constants';
import { addCategory } from '../utils/apiCalls';

export default function AddCatModel({ open, setOpen }) {
    const [name, setName] = useState("");
    const [color, setColor] = React.useState('#ffffff');
    const mutation = useMutation(addCategory, {
        onSuccess: () => {
            queryClient.refetchQueries(['categories'], { active: true })
            setOpen(false);
        },
    });

    const handleChange = (color) => {
        setColor(color.hex);
    }

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <form onSubmit={(e) => {
                e.preventDefault();
                //to stop submit event trigerring in AddPostModel
                e.stopPropagation();
                mutation.mutate({ name, color });
            }}>
                <ModalDialog sx={{
                    maxWidth: 500,
                    display: "flex",
                    flexDirection: "column",

                    gap: "1rem"
                }} >
                    <ModalClose
                        variant="outlined"
                        size='sm'
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Typography level='h6' fontWeight="bold" textAlign="center">Add Category</Typography>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                            name="name"
                            type="text"
                            placeholder="category name"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Color</FormLabel>
                        <ChromePicker color={color} onChangeComplete={handleChange}></ChromePicker>
                    </FormControl>
                    <Button color='success' variant='soft' type='submit'>Add</Button>
                </ModalDialog>
            </form>
        </Modal>
    )
}
