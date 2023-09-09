import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SIGNUP_PATH,
} from '../utils/constants';
import { signIn } from '../utils/apiCalls';

export default function SignInCard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  useEffect(() => {
    setIncorrectEmail(false);
  }, [email]);
  const [password, setPassword] = useState('');
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  useEffect(() => {
    setIncorrectPassword(false);
  }, [password]);

  return (
    <form onSubmit={
      async (e) => {
        e.preventDefault();
        await signIn(email, password, navigate, setIncorrectEmail, setIncorrectPassword);
      }
    }
    >
      <Sheet sx={{
        width: {
          xs: 280, // 0
          sm: 400, // 600
          md: 400, // 900
          lg: 450, // 1200
          xl: 500, // 1536
        },
        mx: 'auto',
        my: '3rem',
        px: '1.5rem',
        py: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        borderRadius: 'sm',
        boxShadow: 'md',
      }}
      >
        <Box>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body2">Sign in to continue.</Typography>
        </Box>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="email"
            value={email}
            color={incorrectEmail ? 'danger' : 'neutral'}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {incorrectEmail ? <Typography level="body2" color="danger">incorrect email, try again.</Typography> : null}
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
            value={password}
            color={incorrectPassword ? 'danger' : 'neutral'}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {incorrectPassword ? <Typography level="body2" color="danger">incorrect password, try again.</Typography> : null}
        </FormControl>
        <Box sx={{ mt: '0.5rem' }}>
          <Button color="primary" variant="solid" sx={{ width: '100%' }} type="submit">
            Sign in
          </Button>
          <Typography level="body2" sx={{ mt: '0.5rem', textAlign: 'center' }}>
            if you didn't sign up yet, please
            {' '}
            <Link underline="hover" href={SIGNUP_PATH} sx={{ color: '#096bde' }}>sign up</Link>
          </Typography>
        </Box>
      </Sheet>
    </form>
  );
}
