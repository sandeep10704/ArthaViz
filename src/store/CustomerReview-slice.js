import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch reviews from local JSON
export const fetchCustomerReviews = createAsyncThunk("CustomerReviews/fetchCustomerReviews", async () => {
  const response = await axios.get("/data/customerreviews.json");
  return response.data; // returns the array directly
});

const customerReviewSlice = createSlice({
  name: "CustomerReviews",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearReviews(state) {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerReviews.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchCustomerReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { clearReviews } = customerReviewSlice.actions;
export default customerReviewSlice.reducer;
