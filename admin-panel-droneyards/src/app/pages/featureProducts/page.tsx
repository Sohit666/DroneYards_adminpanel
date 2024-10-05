"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, List, ListItem, ListItemText, IconButton, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Product {
    _id: string;
    name: string;
    desc: string;
    type: string;
    price: number;
}

interface NewProduct {
    name: string;
    desc: string;
    type: string;
    price: string; // Keep as string for controlled input
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState<NewProduct>({ name: '', desc: '', type: '', price: '' });
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get<Product[]>('http://localhost:3000/api/products');
            setProducts(response.data);
        } catch (error) {
            setError('Failed to load products');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            type: event.target.value,
        }));
    };

    const addProduct = async () => {
        try {
            const response = await axios.post<{ product: Product }>('http://localhost:3000/api/products', newProduct);
            setProducts((prevProducts) => [...prevProducts, response.data.product]);
            setNewProduct({ name: '', desc: '', type: '', price: '' });
            setError(''); // Clear any existing error on successful addition
        } catch (error) {
            setError('Failed to add product');
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/api/products/${id}`);
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
            setError(''); // Clear any existing error on successful deletion
        } catch (error) {
            setError('Failed to delete product');
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" sx={{ color: "black", marginTop: "10px" }} gutterBottom>
                Feature Products Management
            </Typography>

            {/* Error message */}
            {error && <Typography color="error" align="center">{error}</Typography>}

            {/* Form to add a new product */}
            <Box mb={4}>
                <Typography variant="h6" sx={{ color: "black" }}>Add a New Product</Typography>
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
                <FormControl fullWidth margin="normal">
                    <InputLabel>Product Type</InputLabel>
                    <Select
                        name="type"
                        value={newProduct.type}
                        onChange={handleSelectChange}
                        label="Product Type"
                    >
                        <MenuItem value="Drones">Drones</MenuItem>
                        <MenuItem value="Frames">Frames</MenuItem>
                        <MenuItem value="Propellers">Propellers</MenuItem>
                        <MenuItem value="Batteries">Batteries</MenuItem>
                        <MenuItem value="Motors">Motors</MenuItem>
                        <MenuItem value="Electronics">Electronics</MenuItem>
                        <MenuItem value="Controllers">Controllers</MenuItem>
                        <MenuItem value="Fc-chip">Fc-chip</MenuItem>
                        <MenuItem value="Featured_products">Featured Products</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Product Price"
                    variant="outlined"
                    fullWidth
                    name="price"
                    type="number"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addProduct}
                    disabled={!newProduct.name || !newProduct.desc || !newProduct.type || !newProduct.price}
                >
                    Add Product
                </Button>
            </Box>

            {/* List of products */}
            <Box>
                <Typography variant="h6" sx={{ color: "black" }}>All Products</Typography>
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
                            <ListItemText
                                sx={{ color: "black" }}
                                primary={product.name}
                                secondary={
                                    <>
                                        <div>{product.desc}</div>
                                        <div>Type: {product.type}</div>
                                        <div>Price: ${product.price?.toFixed(2) || 'N/A'}</div>
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default Products;
