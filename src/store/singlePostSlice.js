import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


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
