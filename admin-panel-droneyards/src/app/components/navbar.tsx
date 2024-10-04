// components/Navbar.tsx
"use client";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    My Application
                </Typography>
                <Link href="/products" passHref>
                    <Button color="inherit">Products</Button>
                </Link>
                <Link href="/pages/featureProducts" passHref>
                    <Button color="inherit">Featured Products</Button>
                </Link>
                <Link href="/pages/contactinfo" passHref>
                    <Button color="inherit">Contact Us</Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;