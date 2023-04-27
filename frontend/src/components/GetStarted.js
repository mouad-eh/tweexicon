import React from 'react'
import {
    Box,
    Grid,
    styled,
    Typography,
} from '@mui/material'
import Title from './Title'
import mainPage from '../assets/main.png';
import addCat from '../assets/add-cate.png';
import addPost from '../assets/add-poste.png';
import filterPosts from '../assets/filter.png';

const GetStarted = () => {

    const CustomGridItem = styled(Grid)({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    })

    const CustomTypography = styled(Typography)({
        fontSize: '1.1rem',
        textAlign: 'start',
        lineHeight: '1.5',
        color: 'white',
        marginTop: '1.5rem',
    })

    return (

        <Grid container spacing={{ xs: 4, sm: 4, md: 0 }}
            sx={{
                py: 10,
                px: 2,
                backgroundColor: '#1976d2'
            }}
        >
            <CustomGridItem item xs={12} sm={12} md={6}
                component='section'

            >
                <Box component='article'
                    sx={{
                        px: 4,
                        color: "white"
                    }}
                >
                    <Title
                        text={
                            'Streamline Your Saved Tweets'
                        }
                        textAlign={'start'}
                    />
                    <CustomTypography>
                        Easily view all your saved tweets in a single location,
                        just like you would on Twitter. Simply log in and access all your
                        saved tweets with just a few clicks.
                    </CustomTypography>
                </Box>

            </CustomGridItem>

            <Grid item xs={12} sm={12} md={6}>
                <img src={mainPage} alt=""
                    style={{
                        width: '100%',
                        borderRadius: "10px"
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={12} md={6}
                sx={{
                    order: { xs: 4, sm: 4, md: 3 }
                }}
            >
                <img src={addCat} alt=""
                    style={{
                        width: "100%",
                        borderRadius: "10px"
                    }}
                />
            </Grid>

            <CustomGridItem item xs={12} sm={12} md={6}
                sx={{
                    order: { xs: 3, sm: 3, md: 4 }
                }}
            >
                <Box component='article'
                    sx={{
                        px: 4,
                        color: "white"
                    }}
                >
                    <Title
                        text={
                            'Customize Your Categories'
                        }
                        textAlign={'start'}
                    />
                    <CustomTypography>
                        Create custom categories for your saved tweets.
                        Simply specify a category name and choose a color
                        to differentiate it from others.
                    </CustomTypography>
                </Box>
            </CustomGridItem>
            <CustomGridItem item xs={12} sm={12} md={6}
                component='section'
                sx={{
                    order: { xs: 5, sm: 5, md: 5 }
                }}
            >
                <Box component='article'
                    sx={{
                        px: 4,
                        color: "white"
                    }}
                >
                    <Title
                        text={
                            'Save Tweets to A Specific Category '
                        }
                        textAlign={'start'}
                    />
                    <CustomTypography>
                        Save tweets by specifying their URL and assigning them to one
                        of the previously created categories. This makes it easier than ever
                        to save and categorize tweets that you want to come back to later.
                    </CustomTypography>
                </Box>

            </CustomGridItem>

            <Grid item xs={12} sm={12} md={6}
                sx={{
                    order: { xs: 6, sm: 6, md: 6 }
                }}
            >
                <img src={addPost} alt=""
                    style={{
                        width: '100%',
                        borderRadius: "10px"
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}
                sx={{
                    order: { xs: 8, sm: 8, md: 7 }
                }}
            >
                <img src={filterPosts} alt=""
                    style={{
                        width: "100%",
                        borderRadius: "10px"
                    }}
                />
            </Grid>

            <CustomGridItem item xs={12} sm={12} md={6}
                sx={{
                    order: { xs: 7, sm: 7, md: 8 }
                }}
            >
                <Box component='article'
                    sx={{
                        px: 4,
                        color: "white"
                    }}
                >
                    <Title
                        text={
                            'Find Your Saved Tweets by Category'
                        }
                        textAlign={'start'}
                    />
                    <CustomTypography>
                        Filter and view tweets based on the category you assign them,
                        making it easier than ever to find the content you need.
                    </CustomTypography>
                </Box>
            </CustomGridItem>
        </Grid>
    )
}

export default GetStarted;