import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, Grid, Pagination } from '@mui/material';
import ProductCard from '../../../../CommonComponents/ProductCard';
import ImagesAssets from '../../../../../Assets/ImagesAssets';
import ColorPalette from '../../../../../Assets/ColorPalette';
import { useNavigate } from 'react-router';

const ProductShow = () => {
    // Placeholder data
    
    const products = [
        { id: 1, image: ImagesAssets.Selling01, text: 'Phones', amount: '$870' },
        { id: 2, image: ImagesAssets.Selling02, text: 'Drone', amount: '$600' },
        { id: 3, image: ImagesAssets.Selling03, text: 'Watch', amount: '$450' },
        { id: 4, image: ImagesAssets.Selling04, text: 'Speaker', amount: '$250' },
        { id: 5, image: ImagesAssets.Selling05, text: 'Tablet', amount: '$300' },
        { id: 6, image: ImagesAssets.Selling01, text: 'Phones', amount: '$870' },
        { id: 7, image: ImagesAssets.Selling02, text: 'Drone', amount: '$600' },
        { id: 8, image: ImagesAssets.Selling03, text: 'Watch', amount: '$450' },
        { id: 9, image: ImagesAssets.Selling04, text: 'Speaker', amount: '$250' },
        { id: 10, image: ImagesAssets.Selling05, text: 'Tablet', amount: '$300' },
        { id: 11, image: ImagesAssets.Selling01, text: 'Phones', amount: '$870' },
        { id: 12, image: ImagesAssets.Selling02, text: 'Drone', amount: '$600' },
        { id: 13, image: ImagesAssets.Selling03, text: 'Watch', amount: '$450' },
        { id: 14, image: ImagesAssets.Selling04, text: 'Speaker', amount: '$250' },
        { id: 15, image: ImagesAssets.Selling05, text: 'Tablet', amount: '$300' },
        { id: 16, image: ImagesAssets.Selling01, text: 'Phones', amount: '$870' },
        { id: 17, image: ImagesAssets.Selling02, text: 'Drone', amount: '$600' },
        { id: 18, image: ImagesAssets.Selling03, text: 'Watch', amount: '$450' },
        { id: 19, image: ImagesAssets.Selling04, text: 'Speaker', amount: '$250' },
        { id: 20, image: ImagesAssets.Selling05, text: 'Tablet', amount: '$300' },
        { id: 21, image: ImagesAssets.Selling01, text: 'Phones', amount: '$870' },
        { id: 22, image: ImagesAssets.Selling02, text: 'Drone', amount: '$600' },
        { id: 23, image: ImagesAssets.Selling03, text: 'Watch', amount: '$450' },
        { id: 24, image: ImagesAssets.Selling04, text: 'Speaker', amount: '$250' },
        { id: 25, image: ImagesAssets.Selling05, text: 'Tablet', amount: '$300' },
        { id: 26, image: ImagesAssets.Selling01, text: 'Phones', amount: '$870' },
        { id: 27, image: ImagesAssets.Selling02, text: 'Drone', amount: '$600' },
        { id: 28, image: ImagesAssets.Selling03, text: 'Watch', amount: '$450' },
        { id: 29, image: ImagesAssets.Selling04, text: 'Speaker', amount: '$250' },
        { id: 30, image: ImagesAssets.Selling05, text: 'Tablet', amount: '$300' },
        { id: 31, image: ImagesAssets.Selling05, text: 'Tablet', amount: '$300' },
        { id: 32, image: ImagesAssets.Selling05, text: 'Tablet', amount: '$300' },
        { id: 33, image: ImagesAssets.Selling05, text: 'Tablet', amount: '$300' },
        { id: 34, image: ImagesAssets.Selling05, text: 'Tablet', amount: '$300' },
        { id: 35, image: ImagesAssets.Selling05, text: 'Tablet', amount: '$300' },
        { id: 36, image: ImagesAssets.Selling05, text: 'Tablet', amount: '$300' },
        { id: 37, image: ImagesAssets.Selling05, text: 'Tablet', amount: '$300' },
        { id: 38, image: ImagesAssets.Selling05, text: 'Tablet', amount: '$300' },
        { id: 39, image: ImagesAssets.Selling05, text: 'Tablet', amount: '$300' },
        { id: 40, image: ImagesAssets.Selling05, text: 'Tablet', amount: '$300' },
    ];

    const itemsPerPage = 12;
    const [page, setPage] = useState(1);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, products.length);
    const currentProducts = products.slice(startIndex, endIndex);

    return (
        <Box sx={{ padding: '0 0 0 20px', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Top section with text and dropdown */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >
                <Typography variant="h6" sx={{ fontFamily: "Outfit", fontWeight: 200 }}>
                    Showing {startIndex + 1}-{endIndex} of {products.length} results
                </Typography>
                <Select defaultValue="default" size="small" sx={{ fontFamily: "Outfit", fontWeight: 200 }}>
                    <MenuItem value="default" sx={{ fontFamily: "Outfit", fontWeight: 200 }}>Default sorting</MenuItem>
                    <MenuItem value="price-low-high" sx={{ fontFamily: "Outfit", fontWeight: 200 }}>Price: Low to High</MenuItem>
                    <MenuItem value="price-high-low" sx={{ fontFamily: "Outfit", fontWeight: 200 }}>Price: High to Low</MenuItem>
                </Select>
            </Box>
            <Box sx={{ padding: { sm: "0 100px 0 0", md: "0 40px" } }}>
                {/* Grid of cards */}
                <Grid
                    container
                    spacing={2}
                >
                    {currentProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={3} key={product.id}>
                            <ProductCard data={product} />
                        </Grid>
                    ))}
                </Grid>

            </Box>
            {/* Pagination below */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                    padding: '10px',
                    fontFamily: "Outfit",
                    fontWeight: 200
                }}
            >
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handleChangePage}
                    sx={{
                        '& .Mui-selected': {
                            backgroundColor: ColorPalette.orange,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: ColorPalette.orange,
                                opacity: 0.8,
                            },
                        },
                    }}
                />

            </Box>
        </Box>
    );
};

export default ProductShow;
