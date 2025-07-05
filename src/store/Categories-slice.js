import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch categories from local JSON
export const fetchCategories = createAsyncThunk("Categories/fetchCategories", async () => {
  const response = await axios.get("/data/categories.json");
  return response.data;
});

const categoriesSlice = createSlice({
  name: "Categories",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCategories(state) {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { clearCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
