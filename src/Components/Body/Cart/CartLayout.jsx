// CartLayout.js
import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './Components/CartItem';
import { Box, Typography, Grid } from '@mui/material';
import CustomButton from '../../CommonComponents/CustomButton';
import { useNavigate } from 'react-router';

const CartLayout = () => {
  const navigate = useNavigate();
  const { cartItems, status, error } = useSelector(state => state.cart);

  const subtotal = cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };
  const handleContinueShopping = () => {
    navigate("/shop");
  };

  return (
    <Box sx={{ mx: 'auto', p: 2, maxWidth: 1000 }}>
  
      <Grid container spacing={0} sx={{ mb: 1, px: 2, width: "100%" }} alignItems="center" justifyContent="space-between">
        <Grid item xs={12} sm={6} >
          <Typography variant="h6">Product/</Typography>
        </Grid>
        <Grid item xs={4} sm={2} md={2} sx={{ml:{sm:0,md:26}}}>
          <Typography variant="h6">Quantity/</Typography>
        </Grid>
        <Grid item xs={4} sm={2} md={2}>
          <Typography variant="h6">Subtotal/</Typography>
        </Grid>
        <Grid item xs={4} sm={2} md={2}>
          <Typography variant="h6">Remove/</Typography>
        </Grid>
      </Grid>

  
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          flexGrow={1}
          sx={{
            height: '12px',
            width: '100%',
            backgroundImage: 'repeating-linear-gradient(-45deg, #ccc, #ccc 1px, transparent 2px, transparent 8px)',
            mb: 2
          }}
        />
      </Box>

  
      {status === 'loading' && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {cartItems.map((product) => (
        <CartItem key={product.id} product={product} />
      ))}


      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" mb={2}>Cart Totals</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography>Subtotal</Typography>
          <Typography color="orange">${subtotal.toFixed(2)}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography>Total</Typography>
          <Typography color="orange">${subtotal.toFixed(2)}</Typography>
        </Box>


        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <CustomButton text="Update Cart" />
          <CustomButton text="Continue Shopping" onClick={handleContinueShopping}/>
          <CustomButton text="Proceed to Checkout" onClick={handleProceedToCheckout} />
        </Box>
      </Box>
    </Box>
  );
};

export default CartLayout;
