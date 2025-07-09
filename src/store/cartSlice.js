// cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cartItems: [],
  status: 'idle',
  error: null
};

// Async Thunk to fetch product by ID and add to cart
export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async ({ Id, quantity }, thunkAPI) => {
    const response = await axios.get('/data/products.json');
    const products = response.data.products;

    const product = products.find(p => p.id === Number(Id));

    console.log("Id:", Id);
    console.log("Products:", products);
    console.log("Found Product:", product);

    if (!product) {
      throw new Error('Product not found');
    }

    return {
      id: product.id,
      name: product.text,
      price: parseFloat(product.amount.replace("$", "")),
      image: product.image,
      quantity: quantity || 1 
    };
  }
);


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(i => i.id === id);
      if (item) item.quantity = quantity;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const existingItem = state.cartItems.find(item => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          state.cartItems.push(action.payload);
        }
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
