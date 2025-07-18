import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --- Async Thunk to Upload Images ---
export const uploadImages = createAsyncThunk(
  'product/uploadImages',
  async (imageFiles) => {
    const uploadImageToCloudinary = async (file) => {
      const uploadFormData = new FormData();
      const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
      uploadFormData.append('file', file);
      uploadFormData.append('upload_preset', 'shop_upload_preset');
      uploadFormData.append('public_id', fileNameWithoutExtension);

      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dq7lkkucz/image/upload',
        uploadFormData
      );
      return res.data.secure_url;
    };

    const uploadedUrls = await Promise.all(imageFiles.map(image => uploadImageToCloudinary(image.file)));
    return uploadedUrls;
  }
);
export const postProduct = createAsyncThunk(
  'product/postProduct',
  async (productData) => {
    const res = await axios.post('https://arthaserve-1.onrender.com/products', productData);
    console.log(productData);
    
    return res.data;
    // return
  }
);


// --- Initial State ---
const initialState = {
  formData: {
    product: {
      name: '', price: '', rating: '', description: '', colors: [],
      sizes: [], stock: '', sku: '', category: [], tags: [], brand: '', images: [],
    },
    productDescription: {
      title: '', topText: '', points: [], bottomText: ''
    },
    reviews: [],
  },
  imageFiles: [],
  reviewInput: { image: '', name: '', date: '', text: '' },
  tempPoint: '',
  currentTab: 0,
  loading: false,
};

// --- Slice ---
const productAddSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductField: (state, action) => {
      const { name, value } = action.payload;
      state.formData.product[name] = value;
    },
    setDescriptionField: (state, action) => {
      const { name, value } = action.payload;
      state.formData.productDescription[name] = value;
    },
    addToArray: (state, action) => {
      const { key, value } = action.payload;
      if (!state.formData.product[key].includes(value)) {
        state.formData.product[key].push(value);
      }
    },
    removeFromArray: (state, action) => {
      const { key, value } = action.payload;
      state.formData.product[key] = state.formData.product[key].filter(item => item !== value);
    },
    addPoint: (state) => {
      const trimmed = state.tempPoint.trim();
      if (trimmed) {
        state.formData.productDescription.points.push(trimmed);
        state.tempPoint = '';
      }
    },
    removePoint: (state, action) => {
      const point = action.payload;
      state.formData.productDescription.points = state.formData.productDescription.points.filter(p => p !== point);
    },
    setTempPoint: (state, action) => {
      state.tempPoint = action.payload;
    },
    setReviewInput: (state, action) => {
      state.reviewInput = { ...state.reviewInput, ...action.payload };
    },
    addReview: (state) => {
      const { name, text } = state.reviewInput;
      if (name && text) {
        state.formData.reviews.push(state.reviewInput);
        state.reviewInput = { image: '', name: '', date: '', text: '' };
      }
    },
    addImageFile: (state, action) => {
      if (state.imageFiles.length < 5) {
        state.imageFiles.push(action.payload);
      }
    },
    removeImageFile: (state, action) => {
      const previewUrl = action.payload;
      state.imageFiles = state.imageFiles.filter(img => img.previewUrl !== previewUrl);
    },
    setTab: (state, action) => {
      state.currentTab = action.payload;
    },
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.loading = false;
        state.formData.product.images = action.payload;
      })
      .addCase(uploadImages.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setProductField,
  setDescriptionField,
  addToArray,
  removeFromArray,
  addPoint,
  removePoint,
  setTempPoint,
  setReviewInput,
  addReview,
  addImageFile,
  removeImageFile,
  setTab,
  resetForm
} = productAddSlice.actions;

export default productAddSlice.reducer;
