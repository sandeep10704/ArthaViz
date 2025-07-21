import React from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Grid,
  Pagination,
  Zoom
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import ProductCard from '../../../../CommonComponents/ProductCard';
import ColorPalette from '../../../../../Assets/ColorPalette';
import { setPage } from '../../../../../store/productSlice';

const ProductShow = () => {
  const dispatch = useDispatch();

  const {
    currentProducts,
    filteredProducts,
    pagination: { currentPage, pageCount },
  } = useSelector((state) => state.products);

  const handleChangePage = (event, value) => {
    dispatch(setPage(value));
  };

  const totalFiltered = filteredProducts.length;
  const startIndex = totalFiltered === 0 ? 0 : (currentPage - 1) * 12 + 1;
  const endIndex = Math.min(startIndex + 11, totalFiltered);

  return (
    <Box
      sx={{
        minHeight: '100vh', // occupy full viewport
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          flex: '1 0 auto', // this pushes pagination down
          padding: '0 0 20px 20px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {/* Header section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <Typography variant="h6" sx={{ fontFamily: 'Outfit', fontWeight: 200 }}>
            Showing {totalFiltered === 0 ? 0 : startIndex}-{endIndex} of {totalFiltered} results
          </Typography>
          <Select defaultValue="default" size="small" sx={{ fontFamily: 'Outfit', fontWeight: 200 }}>
            <MenuItem value="default">Default sorting</MenuItem>
            <MenuItem value="price-low-high">Price: Low to High</MenuItem>
            <MenuItem value="price-high-low">Price: High to Low</MenuItem>
          </Select>
        </Box>

        {/* Products Grid */}
        <Box sx={{ padding: { sm: '0 100px 0 0', md: '0 40px' } }}>
          <Grid container spacing={2}>
            {currentProducts.length === 0 ? (
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: 'Outfit', fontWeight: 200, margin: '20px auto', textAlign: 'center' }}
                >
                  No products found.
                </Typography>
              </Grid>
            ) : (
              currentProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <Zoom
                    in={true}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <Box
                      sx={{
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <ProductCard data={product} />
                    </Box>
                  </Zoom>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>

      {/* Pagination always at bottom */}
      <Box
        sx={{
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'center',
          padding: '10px',
          fontFamily: 'Outfit',
          fontWeight: 200,
          backgroundColor: '#fff', // optional for clarity
        }}
      >
        <Pagination
          count={pageCount > 0 ? pageCount : 1}
          page={pageCount > 0 ? currentPage : 1}
          onChange={handleChangePage}
          disabled={pageCount <= 1}
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
