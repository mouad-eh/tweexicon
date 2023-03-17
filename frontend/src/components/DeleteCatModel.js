import React, { useState } from 'react';
import { Box, Button, Modal, ModalDialog, Typography } from '@mui/joy';
import CustomAutoComplete from './CustomAutoComplete';
import { queryClient } from '../utils/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteCategory, fetchCategories } from '../utils/apiCalls';

export default function DeleteCatModel({ open, setOpen }) {
    const [category, setCategory] = useState({});
    const { isLoading, data: categories } = useQuery(['categories'], fetchCategories);
    const mutation = useMutation(deleteCategory, {
        onSuccess: () => {
            queryClient.refetchQueries(["categories"])
            queryClient.refetchQueries(["postscount", "all"], { active: true });
            queryClient.refetchQueries(["postscount", category], { active: true });
            queryClient.refetchQueries(["posts", "all"], { active: true })
            queryClient.refetchQueries(["posts", category], { active: true });
            // console.log("categories updated");
        }
    })
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <form onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate(category)
            }}>
                <ModalDialog sx={{
                    maxWidth: 500,
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem"
                }} >
                    <Typography level='h6' fontWeight="bold" textAlign="center">Delete Category</Typography>
                    <Box>
                        <Typography sx={{ mb: "0.25rem" }}>Category</Typography>
                        <CustomAutoComplete placeholder='search...' options={isLoading ? [] : categories}
                            sx={{ width: "100%" }}
                            required
                            onChange={(e, value) => setCategory(value)}
                            loading={isLoading}
                        // value = {name: "", color: "", ?_id: ""}
                        ></CustomAutoComplete>
                    </Box>
                    <Button color='danger' variant='soft' type='submit'>Delete</Button>
                </ModalDialog>
            </form>
        </Modal >
    )
}