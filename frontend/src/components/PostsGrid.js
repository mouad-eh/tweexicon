import { CircularProgress, Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import React, { useEffect, useRef, useState } from 'react';
import { getIdFromUrl } from '../utils/helperFuncs';

export default function PostsGrid({ posts }) {
    const [loading, setLoading] = useState(true);
    const loadingRef = useRef(true);

    useEffect(() => {
        const parentContainer = document.getElementById('container');
        if (parentContainer) parentContainer.innerHTML = '';
        const tweetPromises = [];
        for (let post of posts) {
            const id = getIdFromUrl(post.url);
            const tweetPromise = window.twttr.widgets.createTweet(
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
            tweetPromises.push(tweetPromise);
        }
        Promise.all(tweetPromises)
            .then(() => {
                setLoading(false);
                loadingRef.current = false;
            })
    }, [posts])


    return (
        <Sheet sx={{ mx: "auto", position: "relative" }}>

            {loading && (
                <CircularProgress sx={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    marginLeft: "-20px",
                    marginTop: "-20px"
                }} />
            )}
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
                        opacity: loadingRef.current ? 0 : 1,
                        pointerEvents: loadingRef.current ? 'none' : 'auto',
                        transition: 'opacity 0.5s ease-in-out'
                    }}>
                    </Sheet>
                </>
            }
        </Sheet>
    )
}