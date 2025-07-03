import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ImagesAssets from '../../../../../Assets/ImagesAssets';
import ColorPalette from '../../../../../Assets/ColorPalette';
import CustomButton from '../../../../CommonComponents/CustomButton';
import { useNavigate } from 'react-router';

const ProductShowCard = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
 const navigate = useNavigate();
const handleClickOfOrderButton = () => {
    navigate("/cart"); 
  };
  const handleClickOfAddToCartButton = () => {
    navigate("/cart"); 
  };

  const product = {
    name: 'iPhone 15 Pro Max',
    price: 2000,
    rating: 5,
    description:
      'Justo, cum feugiat imperdiet njesadfvaghj ausjfv qwuyhvrj snbfui aqwvej ioedvjh whjvedjh',
    colors: ['Orange', 'Green', 'Blue', 'Black'],
    sizes: ['XL', 'L', 'M', 'S'],
    stock: 2,
    images: [
      ImagesAssets.Categorie01,
      ImagesAssets.Categorie02,
      ImagesAssets.Categorie03,
    ],
  };
  const [image, setimage] = useState(product.images[0]);


  const handleQuantityChange = (type) => {
    if (type === 'increment' && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // BASE SIZES
  const baseMainImg = 500;
  const baseThumb = 110;
  const baseQtyBtn = 35;
  const baseQtyDisplay = 70;

  // Responsive sizes for each breakpoint (scaling ratios)
  const scale = {
    xs: 0.6,
    sm: 0.7,
    md: 0.8,
    lg: 0.9,
    xl: 1,
  };

  // Helper to generate responsive sizes
  const responsiveSize = (base) => ({
    xs: `${base * scale.xs}px`,
    sm: `${base * scale.sm}px`,
    md: `${base * scale.md}px`,
    lg: `${base * scale.lg}px`,
    xl: `${base * scale.xl}px`,
  });

  return (
    <Box sx={{ padding: { sm: "0", md: "0 0 0 40px" } }}>
      <Grid container spacing={4}>
        {/* Left Side: Thumbnails + Main Image */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            {/* Thumbnails */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {product.images.map((img, index) => (
                <Box
                  key={index}
                  onClick={() => setimage(img)}
                  sx={{
                    border: image === img ? '1px solid rgba(255, 101, 67, 0.7)' : `1 px solid ${ColorPalette.line}`,
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    width: responsiveSize(baseThumb),
                    height: responsiveSize(baseThumb),
                    boxSizing: 'border-box',
                  }}
                >

                  <img
                    src={img}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              ))}
            </Box>

            {/* Main Image */}
            <Box
              sx={{
                border: `1px solid ${ColorPalette.line}`,
                borderRadius: '8px',
                overflow: 'hidden',
                width: responsiveSize(baseMainImg),
                height: responsiveSize(baseMainImg),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Box>
        </Grid>

        {/* Right Side: Product Details */}
        <Grid item xs={12} md={6}>
          <Box sx={{ width: "auto", padding: { sm: "0 10px", md: "0 30px" } }}>
            <Typography variant="h3" sx={{ textTransform: "uppercase", fontWeight: 300, fontFamily: "Outfit" }}>{product.name}</Typography>
            <Typography variant="h6" color={ColorPalette.orange}>
              ${product.price.toFixed(2)}
            </Typography>

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {Array.from({ length: product.rating }).map((_, i) => (
                <Typography key={i} color="orange">
                  ★
                </Typography>
              ))}
            </Box>

            <Box sx={{ width: 300 }}>
              <Typography sx={{ mt: 1, mb: 2, fontWeight: 200, fontFamily: "Outfit" }}>{product.description}</Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box
                flexGrow={1}
                sx={{
                  height: '12px',
                  width: '100%',
                  backgroundImage: 'repeating-linear-gradient(-45deg, #ccc, #ccc 1px, transparent 2px, transparent 8px)',
                }}
              />
            </Box>

            {/* Colors */}
            <Box sx={{ mb: 1, mt: 2 }}>
              <Typography variant='h5' sx={{ fontWeight: 200, fontFamily: "Outfit", textDecoration: "underline" }}>COLOR</Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                {product.colors.map((color) => (
                  <Typography
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    sx={{
                      fontWeight: 200,
                      fontFamily: "Outfit",
                      cursor: "pointer",
                      color: selectedColor === color ? ColorPalette.orange : "inherit",
                      borderBottom: selectedColor === color ? `1px solid ${ColorPalette.orange}` : "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {color}
                  </Typography>
                ))}
              </Box>
            </Box>


            {/* Sizes */}
            <Box sx={{ mb: 1 }}>
              <Typography variant='h5' sx={{ fontWeight: 200, fontFamily: "Outfit", textDecoration: "underline" }}>SIZE</Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                {product.sizes.map((size) => (
                  <Typography key={size} sx={{ fontWeight: 200, fontFamily: "Outfit" }}>{size} </Typography>
                ))}
              </Box>
            </Box>

            {/* Quantity */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box
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
                onClick={() => handleQuantityChange('decrement')}
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
                  cursor: "pointer",
                  transition: "box-shadow 0.2s ease",
                  "&:hover": {
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <Typography>{quantity}</Typography>
              </Box>
              <Box
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
                onClick={() => handleQuantityChange('increment')}
              >
                +
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mt: 1, mb: 2 }}>
              <CustomButton text={" ORDER NOW"} onClick={handleClickOfOrderButton} />
              <CustomButton text={"  ADD TO CART"} onClick={handleClickOfAddToCartButton}/>
              <IconButton>
                <FavoriteBorderIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box
                flexGrow={1}
                sx={{
                  height: '12px',
                  width: '100%',
                  backgroundImage: 'repeating-linear-gradient(-45deg, #ccc, #ccc 1px, transparent 2px, transparent 8px)',
                }}
              />
            </Box>

            {/* SKU, Category, Tags */}
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontWeight: 100, fontFamily: "Outfit" }}>
                <b>SKU:</b> 1223
              </Typography>
              <Typography sx={{ fontWeight: 100, fontFamily: "Outfit" }}>
                <b>Category:</b> Phone, Screen Touch
              </Typography>
              <Typography sx={{ fontWeight: 100, fontFamily: "Outfit" }}>
                <b>Tags:</b> Classic, Modern
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductShowCard;
