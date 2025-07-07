// store/singleProductSlice.js (or redux/slices/singleProductSlice.js)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductById = createAsyncThunk(
  'singleProduct/fetchProductById',
  async (id) => {
    const response = await axios.get(`/data/products/${id}.json`);
    return response.data;
  }
);

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState: {
    product: null,
    productDescription: null,
    reviews: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        console.log('✅ Product JSON fetched:', action.payload);
        state.status = 'succeeded';
        state.product = action.payload.product;
        state.productDescription = action.payload.productDescription;
        state.reviews = action.payload.reviews;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default singleProductSlice.reducer;
