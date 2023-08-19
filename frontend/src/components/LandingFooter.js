import { Sheet, Typography, Link } from '@mui/joy';
import React from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';

export default function LandingFooter() {
  return (
    <Sheet sx={{
      display: 'flex',
      justifyContent: 'space-between',
      p: '1rem',
      backgroundColor: '#ededed',
      '@media (max-width: 700px)': {
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      },
    }}
    >
      <Sheet sx={{
        backgroundColor: 'inherit',
        '@media (max-width: 700px)': {
          mb: '0.25rem',
        },
      }}
      >
        <Typography level="h5" fontWeight="bold" sx={{ color: 'black', mb: '0.25rem' }}>tweexicon</Typography>
        <Typography>
          Copyright ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          tweexicon. All rights reserved.
        </Typography>
      </Sheet>
      <Sheet sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        justifyContent: 'center',
        backgroundColor: 'inherit',
      }}
      >
        <Typography level="body1">made with</Typography>
        <FavoriteIcon fontSize="small" sx={{ color: 'red' }} />
        <Typography level="body1">
          by
          {' '}
          <Link underline="hover" href="https://github.com/mouad-eh" sx={{ color: 'primary.500' }}>@mouad-eh</Link>
        </Typography>
      </Sheet>
    </Sheet>
  );
}
