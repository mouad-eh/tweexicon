import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import React from 'react';

export default function SignUpCard() {
    return (
        <Sheet sx={{
            width: {
                xs: 280, //0
                sm: 400, //600
                md: 400, //900
                lg: 450, //1200
                xl: 500  //1536
            },
            mx: 'auto',
            my: "3rem",
            px: "1.5rem",
            py: "2rem",
            display: 'flex',
            flexDirection: 'column',
            gap: "1rem",
            borderRadius: 'sm',
            boxShadow: 'md'
        }}>
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
                />
            </FormControl>
            <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                    name="lastname"
                    type="text"
                    placeholder="last name"
                />
            </FormControl>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                    name="email"
                    type="email"
                    placeholder="email"
                />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                    name="password"
                    type="password"
                    placeholder="password"
                />
            </FormControl>
            <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                    name="confirmpassword"
                    type="password"
                    placeholder="confirm password"
                />
            </FormControl>
            <Button color='primary' variant='solid' sx={{ mt: "0.5rem" }}>Sign up</Button>
        </Sheet>
    )
}