import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchLastPosts = createAsyncThunk("LastPost/fetchLastPosts", async () => {
  const response = await axios.get("/data/lastestpost.json");
  return response.data;
});

const LastPostSlice = createSlice({
  name: "LastPost",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPosts(state) {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLastPosts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchLastPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { clearPosts } = LastPostSlice.actions;
export default LastPostSlice.reducer;
