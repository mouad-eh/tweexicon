import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HOME_PATH, SIGNUP_ENDPOINT } from '../utils/constants';
import { setAuthToken } from '../utils/auth';

export default function SignUpCard() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [duplicateEmail, setDuplicateEmail] = useState(false);
  useEffect(() => {
    setDuplicateEmail(false);
  }, [email]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordNoMatch, setPasswordNoMatch] = useState(false);
  useEffect(() => {
    setPasswordNoMatch(false);
  }, [confirmPassword]);
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setPasswordNoMatch(true);
      } else {
        axios.post(
          SIGNUP_ENDPOINT,
          {
            firstName, lastName, email, password,
          },
          { headers: { 'Content-Type': 'application/json' } },
        ).then((response) => {
          setAuthToken(response.data.jwt);
          // redirection to the home page
          navigate(HOME_PATH);
        }).catch(() => {
          setDuplicateEmail(true);
        });
      }
    }}
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
          <Typography level="body2">Sign up to continue.</Typography>
        </Box>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input
            name="firstname"
            type="text"
            placeholder="first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input
            name="lastname"
            type="text"
            placeholder="last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="email"
            value={email}
            color={duplicateEmail ? 'danger' : 'neutral'}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {duplicateEmail ? <Typography level="body2" color="danger">email already in use.</Typography> : null}
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            name="confirmpassword"
            type="password"
            placeholder="confirm password"
            color={passwordNoMatch ? 'danger' : 'neutral'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {passwordNoMatch ? <Typography level="body2" color="danger">passwords are not matching, try again.</Typography> : null}
        </FormControl>
        <Button color="primary" variant="solid" sx={{ mt: '0.5rem' }} type="submit">Sign up</Button>
      </Sheet>
    </form>
  );
}
