import React, { useEffect, useState } from 'react';
import AuthHeader from '../components/AuthHeader';
import OptionsBar from '../components/OptionsBar';
import PageNavigation from '../components/PageNavigation';
import PostsGrid from '../components/PostsGrid';
import DeleteCatModel from '../components/DeleteCatModel';
import AddPostModel from '../components/AddPostModel';
import Sheet from '@mui/joy/Sheet';
import './MainPage.css';
import { CategoriesContext } from '../utils/context';
import axios from 'axios';
import Cookies from 'js-cookie';
import { JWT_COOKIE } from '../utils/constants'

export default function MainPage() {
    const [newPostOpen, setNewPostOpen] = useState(false);
    const [deleteCatOpen, setDeleteCatOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        //fetch categories
        axios.get(process.env.REACT_APP_CATEGORIES_ENDPOINT,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get(JWT_COOKIE)}`
                },
            }
        ).then((response) => {
            setCategories(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <Sheet sx={{ //stick footer to the bottom
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>
            <AuthHeader></AuthHeader>
            <CategoriesContext.Provider value={{ categories, setCategories }}>
                <OptionsBar setNewPostOpen={setNewPostOpen} setDeleteCatOpen={setDeleteCatOpen}></OptionsBar>
                <AddPostModel open={newPostOpen} setOpen={setNewPostOpen}></AddPostModel>
                <DeleteCatModel open={deleteCatOpen} setOpen={setDeleteCatOpen}></DeleteCatModel>
            </CategoriesContext.Provider>
            <PostsGrid></PostsGrid>
            <PageNavigation></PageNavigation>
        </Sheet>
    )
}
