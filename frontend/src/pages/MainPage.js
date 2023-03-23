import React, { useState } from 'react';
import AuthHeader from '../components/AuthHeader';
import OptionsBar from '../components/OptionsBar';
import PageNavigation from '../components/PageNavigation';
import PostsGrid from '../components/PostsGrid';
import Sheet from '@mui/joy/Sheet';
import './MainPage.css';
import { useQuery } from '@tanstack/react-query';
import { Box, CircularProgress } from '@mui/joy';
import { fetchPosts, fetchPostsCount, fetchPostsHtml } from '../utils/apiCalls';
import { SnackbarProvider } from 'notistack';

export default function MainPage() {
    const [category, setCategory] = useState("all");
    const [pageData, setPageData] = useState({
        num: 1,
        params: null
    });

    const { isLoading: isPostsCountLoading, data: postsCount } = useQuery(["postscount", category], () => fetchPostsCount(category))
    const { isLoading: isPostsLoading, data: posts } = useQuery(["posts", category, pageData.num], () => fetchPosts(category, pageData.params));
    const { isLoading: isPostsHtmlLoading, data: postsHtml } = useQuery(
        ["posts_html", category, pageData.num, posts],
        () => fetchPostsHtml(posts),
        {
            enabled: !!posts
        })

    return (
        <SnackbarProvider autoHideDuration={3000}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
        >
            <Sheet sx={{ //stick footer to the bottom
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1rem"
            }}>
                <Box>
                    <AuthHeader></AuthHeader>
                    <OptionsBar setCategory={setCategory} setPageData={setPageData}></OptionsBar>
                </Box>
                {isPostsHtmlLoading ?
                    <CircularProgress sx={{ mx: "auto" }} /> :
                    <PostsGrid postsHtml={postsHtml}></PostsGrid>}
                <PageNavigation
                    pageData={pageData}
                    setPageData={setPageData}
                    posts={posts}
                    postsCount={isPostsCountLoading ? 10000 : postsCount}
                    applyMarginTop={!isPostsHtmlLoading}
                ></PageNavigation>
            </Sheet>
        </SnackbarProvider>
    )
}