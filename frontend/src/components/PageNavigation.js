import React from 'react';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export default function PageNavigation({ pageData, setPageData, posts, postsCount }) {
    return (
        <Sheet sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.25rem",
            mb: "1rem"
        }}>
            <Button variant='outlined' startDecorator={<KeyboardArrowLeft />}
                onClick={() => {
                    setPageData({
                        num: pageData.num - 1,
                        params: {
                            cursor: posts[0]._id,
                            limit: 5,
                            dir: "previous"
                        }
                    })
                }}
                disabled={pageData.num === 1}
            >previous</Button>
            <Button variant='outlined' endDecorator={<KeyboardArrowRight />}
                onClick={() => {
                    setPageData({
                        num: pageData.num + 1,
                        params: {
                            cursor: posts[posts.length - 1]._id,
                            limit: 5,
                            dir: "next"
                        }
                    })
                }}
                disabled={pageData.num === Math.max(Math.ceil(postsCount / 5), 1)}
            // max(,1) for postscounts == 0 cuz page will never be equal to 0
            >next</Button>
        </Sheet >
    )
}