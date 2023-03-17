import React, { useState } from 'react';
import { Box, Button, Sheet, Typography } from '@mui/joy';
import { Add, Delete } from '@mui/icons-material';
import CustomAutoComplete from './CustomAutoComplete';
import AddPostModel from './AddPostModel';
import DeleteCatModel from './DeleteCatModel';
import { fetchCategories } from '../utils/apiCalls';
import { useQuery } from '@tanstack/react-query';

export default function OptionsBar({ setCategory, setPageData }) {
    const [newPostOpen, setNewPostOpen] = useState(false);
    const [deleteCatOpen, setDeleteCatOpen] = useState(false);
    const { isFetched, isLoading, data: categories } = useQuery(['categories'], fetchCategories);

    return (
        <Sheet sx={{
            px: "1rem",
            py: "0.5rem",
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
            <Box sx={{
                display: "flex",
                flexDirection: {
                    xs: "column",
                    sm: "row"
                },
                alignItems: "center",
                gap: '0.5rem'
            }}>
                <Typography sx={{
                    display: {
                        xs: "none",
                        sm: "inherit"
                    }
                }}>filter by category:</Typography>
                <CustomAutoComplete placeholder='filter by category'
                    options={isFetched ? categories : []}
                    onChange={(e, value) => {
                        setCategory(value ? value.name : "all")
                        // setCurrentPage(1);
                        setPageData({
                            num: 1,
                            params: null
                        })
                    }}
                    loading={isLoading}
                />
            </Box>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
            }}>
                <Button color='success' variant='soft' startDecorator={<Add />} onClick={() => setNewPostOpen(true)}>New Post</Button>
                <Button color='danger' variant='soft' startDecorator={<Delete />} onClick={() => setDeleteCatOpen(true)}>Delete Category</Button>
            </Box>
            <AddPostModel open={newPostOpen} setOpen={setNewPostOpen}></AddPostModel>
            <DeleteCatModel open={deleteCatOpen} setOpen={setDeleteCatOpen}></DeleteCatModel>
        </Sheet>
    )
}