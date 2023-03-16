import React, { useEffect, useRef, useState } from 'react';
import AuthHeader from '../components/AuthHeader';
import OptionsBar from '../components/OptionsBar';
import PageNavigation from '../components/PageNavigation';
import PostsGrid from '../components/PostsGrid';
import Sheet from '@mui/joy/Sheet';
import './MainPage.css';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/joy';
import { fetchPosts, fetchPostsCount, fetchPostsHtml } from '../utils/apiCalls';
import { queryClient } from '../utils/constants';
import { usePrevious } from '../utils/customHooks';

export default function MainPage() {
    const [category, setCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const previousPage = usePrevious(currentPage);

    // getting params of the upcomming posts query
    let params = null;
    if (currentPage !== 1) {
        const previousPosts = queryClient.getQueryData(["posts"], { active: true, exact: false });
        const dir = previousPage < currentPage ? "next" : "previous";
        let cursor = dir === "next" ? previousPosts[previousPosts.length - 1]._id : previousPosts[0]._id;
        params = {
            cursor,
            limit: 5,
            dir
        }
    }

    const { isLoading: isPostsCountLoading, data: postsCount } = useQuery(["postscount", category], () => fetchPostsCount(category))
    const { isLoading: isPostsLoading, data: posts } = useQuery(["posts", category, currentPage], () => fetchPosts(category, params));
    const { isLoading: isPostsHtmlLoading, data: postsHtml } = useQuery(
        ["posts_html", category, currentPage],
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
            <OptionsBar setCategory={setCategory} setCurrentPage={setCurrentPage}></OptionsBar>
            {isPostsHtmlLoading ? <CircularProgress /> : <PostsGrid postsHtml={postsHtml}></PostsGrid>}
            <PageNavigation
                page={currentPage}
                setPage={setCurrentPage}
                postsCount={isPostsCountLoading ? 10000 : postsCount}
            ></PageNavigation>
        </Sheet>
    )
}