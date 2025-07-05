import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch items from local JSON
export const fetchItems = createAsyncThunk("Items/fetchItems", async () => {
  const response = await axios.get("/data/items.json");
  return response.data;
});

const itemsSlice = createSlice({
  name: "Items",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearItems(state) {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { clearItems } = itemsSlice.actions;
export default itemsSlice.reducer;
