import React from "react";
import {
  Box,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from "../../../../store/cartSlice";
import { imageHoverBoxStyle } from "../../../../Assets/CommonCss";
import ColorPalette from "../../../../Assets/ColorPalette";

const CartItem = ({ product }) => {
  const { id, name, price, quantity, image } = product;
  const dispatch = useDispatch();

  const baseQtyBtn = 30;
  const baseQtyDisplay = 40;

  const responsiveSize = (size) => `${size}px`;

  const handleQuantityChange = (type) => {
    if (type === 'decrement' && quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    } else if (type === 'increment') {
      dispatch(updateQuantity({ id, quantity: quantity + 1 }));
    }
  };

  const handleDelete = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ px: 2, mb: 2 }}>
        {/* Product Info */}
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ ...imageHoverBoxStyle }}>
              <Box
                component="img"
                src={image}
                alt={name}
                sx={{ width: 100, height: 100, borderRadius: 2, objectFit: "cover" }}
              />
            </Box>
            <Box width="150px">
              <Typography variant="subtitle2" sx={{ fontFamily: "Outfit", fontWeight: 200 }}>
                {name}
              </Typography>
              <Typography variant="subtitle2" color={ColorPalette.orange}>
                ${Number(price).toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Quantity */}
        <Grid item xs={4} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Box
              onClick={() => handleQuantityChange('decrement')}
              sx={{
                width: responsiveSize(baseQtyBtn),
                height: responsiveSize(baseQtyBtn),
                border: `1px solid ${ColorPalette.line}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                transition: "box-shadow 0.2s ease",
                "&:hover": {
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              -
            </Box>
            <Box
              sx={{
                width: responsiveSize(baseQtyDisplay),
                height: responsiveSize(baseQtyBtn),
                border: `1px solid ${ColorPalette.line}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                cursor: "default",
              }}
            >
              <Typography>{quantity}</Typography>
            </Box>
            <Box
              onClick={() => handleQuantityChange('increment')}
              sx={{
                width: responsiveSize(baseQtyBtn),
                height: responsiveSize(baseQtyBtn),
                border: `1px solid ${ColorPalette.line}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                transition: "box-shadow 0.2s ease",
                "&:hover": {
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              +
            </Box>
          </Box>
        </Grid>

        {/* Subtotal */}
        <Grid item xs={4} sm={2} textAlign="center">
          <Typography variant="h6" color={ColorPalette.orange}>
            ${(price * quantity).toFixed(2)}
          </Typography>
        </Grid>

        {/* Remove Button */}
        <Grid item xs={4} sm={2} textAlign="center">
          <Box onClick={handleDelete} sx={{ cursor: "pointer", color: ColorPalette.orange }}>
            <RemoveShoppingCartOutlinedIcon />
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ borderColor: ColorPalette.line, mb: 2 }} />
    </>
  );
};

export default CartItem;
