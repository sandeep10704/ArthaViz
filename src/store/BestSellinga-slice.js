import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchBestSelling = createAsyncThunk("BestSelling/fetchBestSelling", async () => {
  const response = await axios.get("https://arthaserve-1.onrender.com/products/top-selling");
  return response.data; 
});

const bestSellingSlice = createSlice({
  name: "BestSelling",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearBestSelling(state) {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBestSelling.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestSelling.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchBestSelling.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { clearBestSelling } = bestSellingSlice.actions;
export default bestSellingSlice.reducer;
