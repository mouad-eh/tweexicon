import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SignUpCard from '../components/SignUpCard';
import Box from '@mui/joy/Box';

export default function SignUpPage() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100vh" }}>
            <Header></Header>
            <SignUpCard></SignUpCard>
            <Footer></Footer>
        </Box>
    )
}
