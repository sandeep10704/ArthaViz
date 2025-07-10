import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { uiActions } from './uiSlice'; 
const initialState = {
  cartItems: [],
  status: 'idle',
  error: null
};


export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async ({ Id, quantity }, thunkAPI) => {
    const state = thunkAPI.getState(); 

   
    if (!state.auth.isLoggedIn) {
      thunkAPI.dispatch(uiActions.showNotification({
        open: true,
        message: 'Please login to add products to cart',
        type: 'error',
      }));
      throw new Error('User not logged in');
    }

    try {
      const response = await axios.get('/data/products.json');
      const products = response.data.products;

      const product = products.find(p => p.id === Number(Id));

      console.log("Id:", Id);
      console.log("Products:", products);
      console.log("Found Product:", product);

      if (!product) {
   
        thunkAPI.dispatch(uiActions.showNotification({
          open: true,
          message: 'Product not found',
          type: 'error',
        }));
        throw new Error('Product not found');
      }

 
      thunkAPI.dispatch(uiActions.showNotification({
        open: true,
        message: `${product.text} added to cart!`,
        type: 'success',
      }));

      return {
        id: product.id,
        name: product.text,
        price: parseFloat(product.amount.replace("$", "")),
        image: product.image,
        quantity: quantity || 1 
      };

    } catch (error) {
      
      thunkAPI.dispatch(uiActions.showNotification({
        open: true,
        message: 'Failed to add product to cart',
        type: 'error',
      }));
      throw error;
    }
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
