import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react';
import { Link } from '@mui/material';

export default function Footer() {
  return (
    <Sheet sx={{
      py: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      mx: 'auto',
    }}
    >
      <Typography level="body2">made with</Typography>
      <FavoriteIcon fontSize="small" sx={{ color: 'red' }} />
      <Typography level="body2">
        by
        {' '}
        <Link underline="hover" href="https://github.com/mouad-eh" sx={{ color: 'primary.500' }}>@mouad-eh</Link>
      </Typography>
    </Sheet>
  );
}
