import React from 'react';
import Header from '../components/Header';
import SignInCard from '../components/SignInCard';
import Footer from '../components/Footer';
import Box from '@mui/joy/Box';

export default function SignInPage() {
    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100vh" }}>
                <Header></Header>
                <SignInCard></SignInCard>
                <Footer></Footer>
            </Box>
        </>
    )
}
