import React, { useState } from 'react';
import AuthHeader from '../components/AuthHeader';
import OptionsBar from '../components/OptionsBar';
import PageNavigation from '../components/PageNavigation';
import PostsGrid from '../components/PostsGrid';
import DeleteCatModel from '../components/DeleteCatModel';
import AddPostModel from '../components/AddPostModel';
import Sheet from '@mui/joy/Sheet';
import './MainPage.css';

export default function MainPage() {
    const [newPostOpen, setNewPostOpen] = useState(false);
    const [deleteCatOpen, setDeleteCatOpen] = useState(false);
    return (
        <Sheet sx={{ //stick footer to the bottom
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>
            <AuthHeader></AuthHeader>
            <OptionsBar setNewPostOpen={setNewPostOpen} setDeleteCatOpen={setDeleteCatOpen}></OptionsBar>
            <AddPostModel open={newPostOpen} setOpen={setNewPostOpen}></AddPostModel>
            <DeleteCatModel open={deleteCatOpen} setOpen={setDeleteCatOpen}></DeleteCatModel>
            <PostsGrid></PostsGrid>
            <PageNavigation></PageNavigation>
        </Sheet>
    )
}
