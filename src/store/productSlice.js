// src/store/productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProductData = createAsyncThunk(
  'products/fetchProductData',
  async () => {
    const response = await axios.get('https://arthaserve-1.onrender.com/products');
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
    filteredProducts: [],
    currentProducts: [],
    filters: [],
    selectedFilters: {},
    sortBy: 'default', // ✅ sorting state
    pagination: {
      itemsPerPage: 12,
      currentPage: 1,
      pageCount: 1,
      totalProducts: 0,
    },
    status: 'loading',
    error: null,
  },
  reducers: {
    updateSelectedFilters: (state, action) => {
      state.selectedFilters = action.payload;
    },

    applyFilterAndPaginate: (state) => {
      const selected = state.selectedFilters;

      let filtered = state.allProducts.filter((product) => {
        const category = selected["Categories"] || [];
        const tags = selected["Tags"] || [];
        const brands = selected["Brands"] || [];
        const price = selected["Filter by Price"] || [];

        const matchCategory = category.length === 0 || category.includes(product.category);
        const matchTags = tags.length === 0 || product.tags.some((tag) => tags.includes(tag));
        const matchBrand = brands.length === 0 || brands.includes(product.brand);
        const matchPrice = price.length === 0 || price.includes(product.priceFilter);

        return matchCategory && matchTags && matchBrand && matchPrice;
      });

      // ✅ apply sorting
      if (state.sortBy === 'price-low-high') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (state.sortBy === 'price-high-low') {
        filtered.sort((a, b) => b.price - a.price);
      }

      state.filteredProducts = filtered;
      state.pagination.pageCount = Math.ceil(filtered.length / state.pagination.itemsPerPage);
      state.pagination.currentPage = 1;
      state.currentProducts = filtered.slice(0, state.pagination.itemsPerPage);
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;

      // Reapply sorting and pagination
      let sorted = [...state.filteredProducts];
      if (state.sortBy === 'price-low-high') {
        sorted.sort((a, b) => a.price - b.price);
      } else if (state.sortBy === 'price-high-low') {
        sorted.sort((a, b) => b.price - a.price);
      }

      state.filteredProducts = sorted;
      state.pagination.pageCount = Math.ceil(sorted.length / state.pagination.itemsPerPage);
      state.pagination.currentPage = 1;
      state.currentProducts = sorted.slice(0, state.pagination.itemsPerPage);
    },

    setPage: (state, action) => {
      const newPage = action.payload;
      state.pagination.currentPage = newPage;

      const start = (newPage - 1) * state.pagination.itemsPerPage;
      const end = start + state.pagination.itemsPerPage;
      state.currentProducts = state.filteredProducts.slice(start, end);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        const { filters, products, pagination } = action.payload;

        state.filters = filters;
        state.allProducts = products;
        state.filteredProducts = products;

        const itemsPerPage = pagination?.itemsPerPage || 12;
        state.pagination.itemsPerPage = itemsPerPage;
        state.pagination.totalProducts = products.length;
        state.pagination.pageCount = Math.ceil(products.length / itemsPerPage);
        state.pagination.currentPage = 1;
        state.currentProducts = products.slice(0, itemsPerPage);
        state.status = 'succeeded';
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  applyFilterAndPaginate,
  updateSelectedFilters,
  setPage,
  setSortBy, 
} = productSlice.actions;

export default productSlice.reducer;
