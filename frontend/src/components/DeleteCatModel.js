import React, { useState } from 'react';
import { Box, Button, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import CustomAutoComplete from './CustomAutoComplete';
import { queryClient } from '../utils/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteCategory, fetchCategories } from '../utils/apiCalls';
import { useSnackbar } from 'notistack';

export default function DeleteCatModel({ open, setOpen, setSearchCategory, setPageData }) {
    const [category, setCategory] = useState({});
    const { isLoading, data: categories } = useQuery(['categories'], fetchCategories);
    const { enqueueSnackbar } = useSnackbar();
    const mutation = useMutation(deleteCategory, {
        onSuccess: () => {
            queryClient.refetchQueries(["categories"], { active: true });
            setSearchCategory("all");
            setPageData({
                num: 1,
                params: null
            });
            setOpen(false);
            enqueueSnackbar("Category deleted successfully !", { variant: "success" });
            //the search bar can't be cleared after deleting a category
            //cuz there is no direct way to that
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
                    <Typography level='h6' fontWeight="bold" textAlign="center">Delete Category</Typography>
                    <Box>
                        <Typography sx={{ mb: "0.25rem" }}>Category</Typography>
                        <CustomAutoComplete placeholder='search...' options={isLoading ? [] : categories.filter((v, i) => v.name !== "default")}
                            sx={{ width: "100%" }}
                            required
                            onChange={(e, value) => setCategory(value)}
                            loading={isLoading}
                        // value = {name: "", color: "", ?_id: ""}
                        ></CustomAutoComplete>
                        <Typography level='body3' sx={{ mt: "0.25rem" }}>Note: All the posts of a deleted category will be moved to the default category.</Typography>
                    </Box>
                    <Button color='danger' variant='soft' type='submit'>Delete</Button>
                </ModalDialog>
            </form>
        </Modal>
    )
}