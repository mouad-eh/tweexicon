import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import Add from '@mui/icons-material/Add';
import AddCatModel from './AddCatModel';
import CustomAutoComplete from './CustomAutoComplete';
import { addPost, fetchCategories } from '../utils/apiCalls';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../utils/constants';
import { useSnackbar } from 'notistack';
import { isValidTweetUrl } from '../utils/helperFuncs';

export default function AddPostModel({ open, setOpen }) {
    const [url, setUrl] = useState("");
    useEffect(() => {
        setInvalidTweetUrl(false);
    }, [url]);
    const [invalidTweetUrl, setInvalidTweetUrl] = useState(false);
    const [category, setCategory] = useState(null);
    // 
    const [newCatOpen, setNewCatOpen] = useState(false);
    const { isLoading, data: categories } = useQuery(['categories'], fetchCategories);
    // 
    const { enqueueSnackbar } = useSnackbar();

    const mutation = useMutation(addPost, {
        onSuccess: (data) => {
            queryClient.refetchQueries(["postscount", "all"], { active: true });
            queryClient.refetchQueries(["postscount", data.categoryName], { active: true });
            queryClient.refetchQueries(["posts", "all"], { active: true })
            queryClient.refetchQueries(["posts", data.categoryName], { active: true });
            // close the model
            setOpen(false);
            // display success messag 
            enqueueSnackbar('Post added successfully!', { variant: "success" });
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!isValidTweetUrl(url)) setInvalidTweetUrl(true);
                    else mutation.mutate({ url, categoryName: category.name ? category.name : null })
                }}
            >
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
                    <Typography level='h6' fontWeight="bold" textAlign="center">Add Post</Typography>
                    <FormControl>
                        <FormLabel>URL</FormLabel>
                        <Input
                            name="url"
                            type="text"
                            placeholder="url"
                            color={invalidTweetUrl ? 'danger' : 'neutral'}
                            required
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        {invalidTweetUrl ? <Typography level='body2' color='danger'>invalid tweet URL, try again.</Typography> : null}
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
                                required
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "auto"
                                    }
                                }}
                                onChange={(e, value) => setCategory(value)}
                            />
                            <Button color='success' variant='solid' sx={{
                                width: {
                                    xs: "100%",
                                    sm: "auto"
                                }
                            }} startDecorator={<Add />} onClick={() => setNewCatOpen(true)}>New Category</Button>
                            <AddCatModel open={newCatOpen} setOpen={setNewCatOpen}></AddCatModel>
                        </Box>
                    </FormControl>
                    <Button color='success' variant='soft' type='submit'>Save</Button>
                </ModalDialog>
            </form>
        </Modal >
    )
}
