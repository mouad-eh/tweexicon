import React from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { Link } from 'react-router-dom';
import { SIGNIN_PATH, SIGNUP_PATH } from '../utils/constants';

export default function Header() {
  return (
    <Sheet sx={{
      px: '1rem',
      py: '0.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: 'sm',
    }}
    >
      <Typography level="h5" fontWeight="bold" sx={{ color: 'primary.500' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          tweexicon
        </Link>
      </Typography>
      <div>
        <Link to={SIGNUP_PATH} style={{ textDecoration: 'none' }}>
          <Button sx={{ mr: '0.5rem' }} color="primary" variant="solid">Sign up</Button>
        </Link>
        <Link to={SIGNIN_PATH} style={{ textDecoration: 'none' }}>
          <Button color="primary" variant="outlined">Sign in</Button>
        </Link>
      </div>
    </Sheet>
  );
}
