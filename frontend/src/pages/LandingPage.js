import React from 'react'
import Navbar from '../components/LandingHeader'
import Banner from '../components/LandingBanner'
import GetStarted from '../components/GetStarted'
import Footer from '../components/Footer'
import LandingFooter from '../components/LandingFooter'

export default function LandingPage() {
    return (
        <>
            <Navbar></Navbar>
            <Banner></Banner>
            <GetStarted></GetStarted>
            <LandingFooter></LandingFooter>
            {/* <Footer></Footer> */}
        </>
    )
}
