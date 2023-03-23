import { Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import React, { useEffect } from 'react';
import Masonry from 'react-masonry-css';


function createMarkup(html) {
    return { __html: html };
}


const breakpointCols1 = {
    default: 3,
    1200: 3,
    1100: 2,
    750: 1
}

const breakpointCols2 = {
    default: 2,
    1200: 2,
    1100: 2,
    750: 1
}

export default function PostsGrid({ postsHtml }) {

    useEffect(() => {
        window.twttr.widgets.load(
            document.getElementsByClassName("my-masonry-grid")[0]
        );
    })


    return (
        <Sheet sx={{
            // my: "1rem",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            alignItems: "center"
        }}
            className='masonry'
        >
            {
                postsHtml.length === 0 ?
                    <Box sx={{ textAlign: "center" }}>
                        <Typography level='body2' sx={{ fontSize: "1.5rem" }}>No posts yet !</Typography>
                        <Typography level='body2'>looks like you have not added any posts.</Typography>
                    </Box>
                    :
                    <Masonry
                        breakpointCols={postsHtml.length > 2 ? breakpointCols1 : breakpointCols2}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">
                        {
                            postsHtml.map((htmlstr, ind) => (
                                <Box key={ind} dangerouslySetInnerHTML={createMarkup(htmlstr)}></Box>
                            ))
                        }
                    </Masonry>
            }
        </Sheet>
    )
}