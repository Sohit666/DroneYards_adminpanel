// src/app/pages/products/add.tsx
"use client";
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import axios from 'axios';

const AddProductPage = () => {
    const [formData, setFormData] = useState<{
        name: string;
        desc: string;
        type: string;
        price: number;
        colors: string[];
        weight: number;
        dimensions_width: number;
        dimensions_height: number;
        dimensions_depth: number;
        images: File[];
    }>({
        name: '',
        desc: '',
        type: '',
        price: 0,
        colors: [],
        weight: 0,
        dimensions_width: 0,
        dimensions_height: 0,
        dimensions_depth: 0,
        images: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        if (name === 'images' && e.target instanceof HTMLInputElement) {
            const files = e.target.files ? Array.from(e.target.files) : [];
            setFormData({ ...formData, [name]: files });
        } else if (name === 'colors' && typeof value === 'string') {
            const colorsArray = value.split(',').map(color => color.trim());
            setFormData({ ...formData, colors: colorsArray });
        } else {
            setFormData({ ...formData, [name as string]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData();

        for (const key in formData) {
            if (Array.isArray(formData[key as keyof typeof formData])) {
                (formData[key as keyof typeof formData] as File[]).forEach((file) => {
                    form.append(key, file);
                });
            } else {
                form.append(key, formData[key as keyof typeof formData] as string | Blob);
            }
        }

        try {
            const response = await axios.post('http://localhost:3000/api/products', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Failed to add product', error);
            alert('Failed to add product');
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Add Product
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Product Name"
                            name="name"
                            fullWidth
                            required
                            onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            name="desc"
                            fullWidth
                            required
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            label="Type"
                            name="type"
                            fullWidth
                            required
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <MenuItem value="Drones">Drones</MenuItem>
                            <MenuItem value="Frames">Frames</MenuItem>
                            <MenuItem value="Propellers">Propellers</MenuItem>
                            <MenuItem value="Batteries">Batteries</MenuItem>
                            <MenuItem value="Motors">Motors</MenuItem>
                            <MenuItem value="Electronics">Electronics</MenuItem>
                            <MenuItem value="Controllers">Controllers</MenuItem>
                            <MenuItem value="Fc-chip">Fc-chip</MenuItem>
                            <MenuItem value="Accessories">Accessories</MenuItem>
                            <MenuItem value="Radio_Store">Radio-Store</MenuItem>
                            <MenuItem value="Featured_products">Featured Products</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Price"
                            name="price"
                            type="number"
                            fullWidth
                            required
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Colors (comma separated)"
                            name="colors"
                            fullWidth
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Weight"
                            name="weight"
                            type="number"
                            fullWidth
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Dimensions Width"
                            name="dimensions_width"
                            type="number"
                            fullWidth
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Dimensions Height"
                            name="dimensions_height"
                            type="number"
                            fullWidth
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Dimensions Depth"
                            name="dimensions_depth"
                            type="number"
                            fullWidth
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            accept="image/*"
                            type="file"
                            name="images"
                            multiple
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Add Product
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddProductPage;
