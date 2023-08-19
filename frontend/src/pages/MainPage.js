import React, { useState } from 'react';
import Sheet from '@mui/joy/Sheet';
import { Box, CircularProgress } from '@mui/joy';
import { SnackbarProvider } from 'notistack';
import { useQuery } from '@tanstack/react-query';
import AuthHeader from '../components/AuthHeader';
import OptionsBar from '../components/OptionsBar';
import PageNavigation from '../components/PageNavigation';
import PostsGrid from '../components/PostsGrid';
import './MainPage.css';
import { fetchPosts, fetchPostsCount } from '../utils/apiCalls';

export default function MainPage() {
  const [category, setCategory] = useState('all');
  const [pageData, setPageData] = useState({
    num: 1,
    params: null,
  });
  const { isLoading: isPostsCountLoading, data: postsCount } = useQuery(['postscount', category], () => fetchPostsCount(category));
  const { isLoading: isPostsLoading, data: posts } = useQuery(['posts', category, pageData.num], () => fetchPosts(category, pageData.params));

  return (
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Sheet sx={{ // stick footer to the bottom
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1rem',
        position: 'relative',
      }}
      >
        <Box>
          <AuthHeader />
          <OptionsBar setCategory={setCategory} setPageData={setPageData} />
        </Box>
        {isPostsLoading
          ? (
            <CircularProgress sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              marginLeft: '-20px',
              marginTop: '-20px',
            }}
            />
          )
          : <PostsGrid posts={posts} />}
        <PageNavigation
          pageData={pageData}
          setPageData={setPageData}
          posts={posts}
          postsCount={isPostsCountLoading ? 0 : postsCount}
        />
      </Sheet>
    </SnackbarProvider>
  );
}
