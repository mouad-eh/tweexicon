import { Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import React, { useEffect } from 'react';
import { getIdFromUrl } from '../utils/helperFuncs';

export default function PostsGrid({ posts }) {
    useEffect(() => {
        const parentContainer = document.getElementById('container');
        if (parentContainer) parentContainer.innerHTML = '';
        const tweetPromises = [];
        for (let post of posts) {
            const id = getIdFromUrl(post.url);
            window.twttr.widgets.createTweet(
                id,
                parentContainer,
                {
                    width: 350,
                    dnt: true
                }
            ).then((tweet) => {
                if (tweet) {
                    tweet.style.marginTop = "";
                    tweet.style.marginBottom = "";
                }
            });
        }
    }, [posts])


    return (
        <Sheet sx={{ mx: "auto", position: "relative" }}>
            {posts.length === 0 ?
                <Box sx={{ textAlign: "center" }}>
                    <Typography level='body2' sx={{ fontSize: "1.5rem" }}>No posts yet !</Typography>
                    <Typography level='body2'>looks like you have not added any posts.</Typography>
                </Box>
                :
                <>
                    <Sheet id="container" sx={{
                        columnCount: {
                            xs: 1,
                            sm: 1,
                            md: 2,
                            lg: 3
                        },
                        columnWidth: "350px",
                        columnGap: "1rem",
                    }}>
                    </Sheet>
                </>
            }
        </Sheet>
    )
}