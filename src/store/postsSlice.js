// redux/slices/postsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPostData = createAsyncThunk(
  'posts/fetchPostData',
  async () => {
    const response = await axios.get('https://arthaserve-1.onrender.com/blogs');
    return response.data;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    allPosts: [],
    filteredPosts: [],
    currentPosts: [],
    filters: [],
    selectedFilters: {},
    pagination: {
      itemsPerPage: 9,
      currentPage: 1,
      pageCount: 1,
      totalPosts: 0,
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    updateSelectedFilters: (state, action) => {
      state.selectedFilters = action.payload;
    },
    applyFilterAndPaginate: (state, action) => {
      const selected = action.payload;
      const filtered = state.allPosts.filter((post) => {
        const categories = selected['Categories'] || [];
        const tags = selected['Tags'] || [];
        const socials = selected['Social links'] || [];

        const matchCategory = categories.length === 0 || categories.includes(post.category);
        const matchTags = tags.length === 0 || post.tags.some((tag) => tags.includes(tag));
        const matchSocial = socials.length === 0 || post.socialLinks.some((link) => socials.includes(link));

        return matchCategory && matchTags && matchSocial;
      });

      state.filteredPosts = filtered;
      const pageCount = Math.ceil(filtered.length / state.pagination.itemsPerPage);
      state.pagination.pageCount = pageCount;
      state.pagination.currentPage = 1;
      state.currentPosts = filtered.slice(0, state.pagination.itemsPerPage);
    },
    setPage: (state, action) => {
      const page = action.payload;
      const start = (page - 1) * state.pagination.itemsPerPage;
      const end = start + state.pagination.itemsPerPage;

      state.pagination.currentPage = page;
      state.currentPosts = state.filteredPosts.slice(start, end);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostData.fulfilled, (state, action) => {
        const { posts, filters, pagination } = action.payload;

        state.filters = filters;
        state.allPosts = posts;
        state.filteredPosts = posts;
        state.pagination.itemsPerPage = pagination?.itemsPerPage || 9;
        state.pagination.totalPosts = posts.length;
        state.pagination.pageCount = Math.ceil(posts.length / state.pagination.itemsPerPage);
        state.pagination.currentPage = 1;
        state.currentPosts = posts.slice(0, state.pagination.itemsPerPage);
        state.status = 'succeeded';
      })
      .addCase(fetchPostData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { updateSelectedFilters, applyFilterAndPaginate, setPage } = postsSlice.actions;
export default postsSlice.reducer;
