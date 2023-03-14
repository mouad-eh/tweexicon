import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import React, { useEffect } from 'react';
import Masonry from 'react-masonry-css';


function createMarkup(html) {
    return { __html: html };
}

export default function PostsGrid({ postsHtml }) {

    useEffect(() => {
        window.twttr.widgets.load(
            document.getElementsByClassName("my-masonry-grid")[0]
        );
    })

    return (
        <Sheet sx={{
            my: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}
            className='masonry'
        >
            <Masonry
                breakpointCols={{
                    default: 3,
                    1200: 3,
                    1100: 2,
                    600: 1
                }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {
                    postsHtml.map((htmlstr, ind) => (
                        <Box key={ind} dangerouslySetInnerHTML={createMarkup(htmlstr)}></Box>
                    ))
                }
            </Masonry>
        </Sheet>
    )
}