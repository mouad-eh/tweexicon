import React from 'react';
import { Button, Typography, Box } from '@mui/joy';
import { Link } from 'react-router-dom';
// img
import bannerImg from '../assets/Twitter.png';

function Banner() {
  return (
    <Box sx={{
      minHeight: '91vh',
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
      '@media (max-width: 960px)': {
        paddingTop: 10,
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      },
    }}
    >
      <Box sx={{
        flex: 1,
        paddingLeft: 10,
        '@media (max-width: 960px)': {
          flex: 1,
          textAlign: 'center',
          paddingLeft: 2,
          paddingRight: 2,
        },
      }}
      >
        <Typography
          level="h1"
          sx={{
            fontWeight: 700,
            color: '#1976d2',
          }}
        >
          Upgrade Your
          {' '}
          <br />
          Twitter Game
        </Typography>
        <Typography
          level="body1"
          sx={{
            py: 3,
            lineHeight: 1.6,
            color: '#1976d2',
          }}
        >
          Tweexicon organizes your tweets into categories, freeing you from relying on likes to save important tweets.
          Find tweets easily, whether for work, personal projects, or fun. Ditch endless scrolling and say hello to the ultimate Twitter organization tool.
        </Typography>
        <Box>
          <Button
            component={Link}
            to="/signup"
            variant="solid"
            sx={{
              mr: 2,
              px: 3,
              py: 1,
              fontSize: '0.9rem',
              textTransform: 'capitalize',
              borderRadius: 0,
              borderColor: '#14192d',
              color: 'white',
              backgroundColor: '#1976d2',
            }}
          >
            Sign Up
          </Button>
          <Button
            component={Link}
            to="/signin"
            variant="outlined"
            sx={{
              px: 3,
              py: 1,
              fontSize: '0.9rem',
              textTransform: 'capitalize',
              borderRadius: 0,
              color: '#1976d2',
              backgroundColor: 'transparent',
              borderColor: '#1976d2',
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Box sx={(theme) => ({
        [theme.breakpoints.down('md')]: {
          flex: 1,
          paddingTop: '0.5rem',
          paddingBottom: '2rem',
        },
        [theme.breakpoints.up('md')]: {
          flex: 1,
        },
      })}
      >
        <img
          src={bannerImg}
          alt="headerImg"
          style={{
            width: '100%',
          }}
        />
      </Box>
    </Box>
  );
}

export default Banner;
