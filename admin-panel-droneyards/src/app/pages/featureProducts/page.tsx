// src/app/pages/featureProducts/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Ensure you import from next/navigation

const FeatureProductsPage = () => {
    interface Product {
        id: string;
        name: string;
        desc: string;
        price: number;
        type: string;
        imageUrls: string[];
    }

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter(); // Correctly using useRouter

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Start loading
            try {
                const response = await axios.get('http://localhost:3000/api/products'); // Use relative URL
                setProducts(response.data);
            } catch (error) {
                setError('Failed to fetch products');
                console.error('Failed to fetch products', error);
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        const confirmed = confirm('Are you sure you want to delete this product?');
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:3000/api/products/${id}`);
                setProducts(products.filter((product) => product.id !== id));
                setSuccessMessage('Product deleted successfully!');
            } catch (error) {
                setError('Failed to delete product');
                console.error('Failed to delete product', error);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setError(null);
        setSuccessMessage(null);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Featured Products
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.imageUrls[0]} // Display the first image
                                    alt={product.name}
                                />
                                <CardContent>
                                    <Typography variant="h5">{product.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.desc}
                                    </Typography>
                                    <Typography variant="body1">Price: ${product.price}</Typography>
                                    <Typography variant="body2">Type: {product.type}</Typography>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Delete
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default FeatureProductsPage;
