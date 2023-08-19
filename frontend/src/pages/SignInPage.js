import React from 'react';
import Box from '@mui/joy/Box';
import Header from '../components/Header';
import SignInCard from '../components/SignInCard';
import Footer from '../components/Footer';

export default function SignInPage() {
  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh',
    }}
    >
      <Header />
      <SignInCard />
      <Footer />
    </Box>
  );
}
