import React from 'react'
import CartItem from './Components/CartItem'
import { Box, Divider, Typography, Grid } from '@mui/material'
import CustomButton from '../../CommonComponents/CustomButton';
import ColorPalette from '../../../Assets/ColorPalette';

const CartLayout = () => {
  const products = [
    {
      name: 'Iphone 15 Pro Max',
      price: 2000,
      quantity: 1,
      image: 'https://dummyimage.com/100x100',
    },
    {
      name: 'Apple Watch (2nd Gen)',
      price: 400,
      quantity: 1,
      image: 'https://dummyimage.com/100x100',
    },
  ];

  const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <Box sx={{ mx: 'auto', p: 2, maxWidth: 1000 }}>
      {/* Header */}
      <Grid container spacing={0} sx={{ mb: 1, px: 2,width:"100%" }} alignItems="center" justifyContent="space-between">
  <Grid item xs={12} sm={6} sx={{width:{sm:"100%", md:"30%"}}}>
    <Typography variant="h6" sx={{fontFamily:"Outfit",fontWeight:200}}>Product/</Typography>
  </Grid>
  <Grid item xs={4} sm={2} md={2} >
    <Typography variant="h6"sx={{fontFamily:"Outfit",fontWeight:200}}>Quantity/</Typography>
  </Grid>
  <Grid item xs={4} sm={2} md={2}>
    <Typography variant="h6"sx={{fontFamily:"Outfit",fontWeight:200}}>Subtotal/</Typography>
  </Grid>
  <Grid item xs={4} sm={2} md={2}>
    <Typography variant="h6"sx={{fontFamily:"Outfit",fontWeight:200}}>Remove/</Typography>
  </Grid>
</Grid>


     <Box sx={{ display: "flex", flexDirection: "row" }}>
                     <Box
                         flexGrow={1}
                         sx={{
                             height: '12px',
                             width: '100%',
                             backgroundImage: 'repeating-linear-gradient(-45deg, #ccc, #ccc 1px, transparent 2px, transparent 8px)',
                             mb:2
                         }}
                     />
                 </Box>

      {/* Cart Items */}
      {products.map((product, index) => (
        <CartItem key={index} product={product} />
      ))}

      {/* Cart Totals */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" mb={2}sx={{fontFamily:"Outfit",fontWeight:200}}>Cart Totals</Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography sx={{fontFamily:"Outfit",fontWeight:200}}>Subtotal</Typography>
          <Typography color={ColorPalette.orange}>${subtotal.toFixed(2)}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography sx={{fontFamily:"Outfit",fontWeight:200}}>Total</Typography>
          <Typography color={ColorPalette.orange}>${subtotal.toFixed(2)}</Typography>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <CustomButton text="Update Cart" />
          <CustomButton text="Continue Shopping" />
          <CustomButton text="Proceed to Checkout" />
        </Box>
      </Box>
    </Box>
  );
};

export default CartLayout;
