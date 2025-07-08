import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Async thunk to fetch single post data by ID
export const fetchSinglePostById = createAsyncThunk(
  'singlePost/fetchSinglePostById',
  async (Id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/data/posts/${Id}.json`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const singlePostSlice = createSlice({
  name: 'singlePost',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Later: add reducers for next/previous article navigation here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSinglePostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSinglePostById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSinglePostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch post';
      });
  },
});

export default singlePostSlice.reducer;
