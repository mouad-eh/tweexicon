import React from 'react';
import Navbar from '../components/LandingHeader';
import Banner from '../components/LandingBanner';
import GetStarted from '../components/GetStarted';
import LandingFooter from '../components/LandingFooter';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Banner />
      <GetStarted />
      <LandingFooter />
    </>
  );
}
