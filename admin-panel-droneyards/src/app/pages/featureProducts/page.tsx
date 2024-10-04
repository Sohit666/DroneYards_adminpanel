"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Products() {
    const [products, setProducts] = useState<{ _id: string, name: string, desc: string }[]>([]);  
    const [newProduct, setNewProduct] = useState({ name: '', desc: '' });  
    const [error, setError] = useState('');  

    
    useEffect(() => {
        fetchProducts();
    }, []);

    // Fetch all products from the API
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        } catch (error) {
            setError('Failed to load products');
        }
    };

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    // Add a new product
    const addProduct = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/products', newProduct);
            setProducts((prevProducts) => [...prevProducts, response.data.product]);  // Add new product to the list
            setNewProduct({ name: '', desc: '' });  // Clear form
        } catch (error) {
            setError('Failed to add product');
        }
    };

    // Delete a product by ID
    const deleteProduct = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));  // Remove from list
        } catch (error) {
            setError('Failed to delete product');
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" sx={{color:"black"}} gutterBottom>
                Feature Products Management
            </Typography>

            {/* Error message */}
            {error && <Typography color="error">{error}</Typography>}

            {/* Form to add a new product */}
            <Box mb={4}>
                <Typography variant="h6" sx={{color:"black"}}>Add a New Product</Typography>
                <TextField
                    label="Product Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    margin="normal"
                />
                <TextField
                    label="Product Description"
                    variant="outlined"
                    fullWidth
                    name="desc"
                    value={newProduct.desc}
                    onChange={handleInputChange}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addProduct}
                    disabled={!newProduct.name || !newProduct.desc}
                >
                    Add Product
                </Button>
            </Box>

            {/* List of products */}
            <Box>
                <Typography variant="h6" sx={{color:"black"}}>All Products</Typography>
                <List>
                    {products.map((product) => (
                        <ListItem
                            key={product._id}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => deleteProduct(product._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText sx={{color:"black"}}
                                primary={product.name}
                                secondary={product.desc}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
}
