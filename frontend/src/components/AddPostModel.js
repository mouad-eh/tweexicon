import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalDialog, Typography } from '@mui/joy';
import Add from '@mui/icons-material/Add';
import AddCatModel from './AddCatModel';
import CustomAutoComplete from './CustomAutoComplete';
import { addPost, fetchCategories } from '../utils/apiCalls';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../utils/constants';

export default function AddPostModel({ open, setOpen }) {
    const [url, setUrl] = useState("");
    const [category, setCategory] = useState(null);
    // 
    const [newCatOpen, setNewCatOpen] = useState(false);
    const { isLoading, data: categories } = useQuery(['categories'], fetchCategories);
    // 
    const mutation = useMutation(addPost, {
        onSuccess: () => {
            var globalCount;
            var categoryCount;
            // update counts of all posts
            queryClient.setQueryData(["postscount", category.name], (count) => {
                categoryCount = count + 1
                return count + 1
            })
            // update counts of pots within the same category
            queryClient.setQueriesData(["postscount", "all"], (count) => {
                globalCount = count + 1
                return count + 1
            })
            // refetch last page of posts
            queryClient.refetchQueries(["posts", "all", Math.ceil(globalCount / 5)], { exact: true })
            // refetch last page of posts of the category
            queryClient.refetchQueries(["posts", category.name, Math.ceil(categoryCount / 5)], { exact: true })
            queryClient.refetchQueries(["posts_html", category.name, Math.ceil(categoryCount / 5)], { exact: true })
            console.log("post added successfully");
        }
    })

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    mutation.mutate({ url, categoryName: category.name })
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
                    <Typography level='h6' fontWeight="bold" textAlign="center">Add Post</Typography>
                    <FormControl>
                        <FormLabel>URL</FormLabel>
                        <Input
                            name="url"
                            type="text"
                            placeholder="url"
                            onChange={(e) => setUrl(e.target.value)}
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
