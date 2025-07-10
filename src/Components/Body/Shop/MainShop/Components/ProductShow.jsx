

import React from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Grid,
  Pagination
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
    <Box sx={{ padding: '0 0 0 20px', maxWidth: '1000px', margin: '0 auto' }}>
      
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

     
      <Box sx={{ padding: { sm: '0 100px 0 0', md: '0 40px' } }}>
        <Grid container spacing={2}>
          {currentProducts.length === 0 ? (
            <Typography variant="h6" sx={{ fontFamily: 'Outfit', fontWeight: 200, margin: '20px auto' }}>
              No products found.
            </Typography>
          ) : (
            currentProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard data={product} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>

     
      {pageCount > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
            padding: '10px',
            fontFamily: 'Outfit',
            fontWeight: 200,
          }}
        >
          <Pagination
            count={pageCount}
            page={currentPage}
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
      )}
    </Box>
  );
};

export default ProductShow;
