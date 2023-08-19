import React from 'react';
import Box from '@mui/joy/Box';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SignUpCard from '../components/SignUpCard';

export default function SignUpPage() {
  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh',
    }}
    >
      <Header />
      <SignUpCard />
      <Footer />
    </Box>
  );
}
