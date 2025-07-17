import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { uiActions } from './uiSlice';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const initialState = {
  cartItems: [],
  status: 'idle',
  error: null
};

// Fetch user cart
export const fetchUserCart = createAsyncThunk(
  'cart/fetchUserCart',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.auth.user;

    if (!user) return [];

    try {
      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        return cartSnap.data().items || [];
      } else {
        await setDoc(cartRef, { items: [] });
        return [];
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Add product to cart
export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async ({ Id, quantity }, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.auth.user;

    if (!user) {
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

      if (!product) {
        thunkAPI.dispatch(uiActions.showNotification({
          open: true,
          message: 'Product not found',
          type: 'error',
        }));
        throw new Error('Product not found');
      }

      const newItem = {
        id: product.id,
        name: product.text,
        price: parseFloat(product.amount.replace("$", "")),
        image: product.image,
        quantity: quantity || 1
      };

      const cartRef = doc(db, "carts", user.uid);
      const cartSnap = await getDoc(cartRef);
      let updatedItems = [];

      if (cartSnap.exists()) {
        const items = cartSnap.data().items;
        const existing = items.find(i => i.id === newItem.id);
        if (existing) {
          existing.quantity += newItem.quantity;
        } else {
          items.push(newItem);
        }
        updatedItems = items;
      } else {
        updatedItems = [newItem];
      }

      await setDoc(cartRef, { items: updatedItems });

      thunkAPI.dispatch(uiActions.showNotification({
        open: true,
        message: `${product.text} added to cart!`,
        type: 'success',
      }));

      return newItem;

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

// Remove product from cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.auth.user;

    if (!user) throw new Error('User not logged in');

    const cartRef = doc(db, "carts", user.uid);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      let items = cartSnap.data().items;
      items = items.filter(i => i.id !== id);
      await setDoc(cartRef, { items });
      return id;
    }
    return id;
  }
);

// Update product quantity
export const updateQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ id, quantity }, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.auth.user;

    if (!user) throw new Error('User not logged in');

    const cartRef = doc(db, "carts", user.uid);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      let items = cartSnap.data().items;
      const item = items.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
        await setDoc(cartRef, { items });
      }
      return { id, quantity };
    }
    return { id, quantity };
  }
);

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        const existingItem = state.cartItems.find(item => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          state.cartItems.push(action.payload);
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const { id, quantity } = action.payload;
        const item = state.cartItems.find(i => i.id === id);
        if (item) item.quantity = quantity;
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
        }
      );
  }
});

export const { clearCart } = cartSlice.actions;




export default cartSlice.reducer;
