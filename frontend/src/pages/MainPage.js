import React, { useState } from 'react';
import AuthHeader from '../components/AuthHeader';
import OptionsBar from '../components/OptionsBar';
import PageNavigation from '../components/PageNavigation';
import PostsGrid from '../components/PostsGrid';
import Sheet from '@mui/joy/Sheet';
import './MainPage.css';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/joy';
import { fetchPosts, fetchPostsHtml } from '../utils/apiCalls';

export default function MainPage() {
    const [category, setCategory] = useState(null);
    const { data: posts } = useQuery(["posts", category], () => fetchPosts(null, category));
    const { isLoading: isPostsHtmlLoading, data: postsHtml } = useQuery(
        ["posts_html", posts],
        () => fetchPostsHtml(posts),
        {
            enabled: !!posts
        })

    return (
        <Sheet sx={{ //stick footer to the bottom
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        }}>
            <AuthHeader></AuthHeader>
            <OptionsBar setCategory={setCategory}></OptionsBar>
            {isPostsHtmlLoading ? <CircularProgress /> : <PostsGrid postsHtml={postsHtml}></PostsGrid>}
            <PageNavigation></PageNavigation>
        </Sheet>
    )
}