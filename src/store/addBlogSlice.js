import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { get, set } from 'lodash'; // A utility library for safely working with nested objects.

// --- Helper function to upload a single file to Cloudinary ---
// NOTE: Replace 'dq7lkkucz' and 'shop_upload_preset' with your Cloudinary details.
const uploadImageToCloudinary = async (file) => {
    if (!file) return null;
    const uploadFormData = new FormData();
    const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
    uploadFormData.append('file', file);
    uploadFormData.append('upload_preset', 'shop_upload_preset'); // Your Cloudinary upload preset
    uploadFormData.append('public_id', fileNameWithoutExtension);

    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dq7lkkucz/image/upload', // Your Cloudinary API URL
      uploadFormData
    );
    return res.data.secure_url;
};


// --- Async Thunk to Upload Blog Images ---
export const uploadBlogImages = createAsyncThunk(
  'blog/uploadBlogImages',
  async (imageFiles, { rejectWithValue }) => {
    try {
        const { headerImageFile, responsiveSectionImageFile } = imageFiles;
        
        const [headerImageUrl, responsiveSectionImageUrl] = await Promise.all([
          uploadImageToCloudinary(headerImageFile?.file),
          uploadImageToCloudinary(responsiveSectionImageFile?.file)
        ]);
        
        return { headerImageUrl, responsiveSectionImageUrl };
    } catch (error) {
        console.error("Image upload failed:", error);
        return rejectWithValue(error.response.data);
    }
  }
);


// --- Async Thunk to Post Final Blog Data ---
export const postBlog = createAsyncThunk(
  'blog/postBlog',
  async (blogData, { rejectWithValue }) => {
    try {
        const res = await axios.post('https://arthaserve-1.onrender.com/blogs', blogData); // Your backend endpoint
        console.log("Posted Blog Data:", blogData);
        return res.data;
        // return blogData;
    } catch (error) {
        console.error("Blog post failed:", error);
        return rejectWithValue(error.response.data);
    }
  }
);

// --- Initial State Definition ---
const initialState = {
  formData: {
    categories: [],
    previousArticle: '',
    nextArticle: '',
    socialLinks: [],
    tags: [],
    comments: [],
    articleData: {
      title: '',
      category: '',
      headerImage: '',
      content: '',
      quote: { text: '', author: '' },
      gadgetsList: [],
      bottomParagraphs: [],
      responsiveSection: {
        image: '',
        title: '',
        paragraphs: [],
      },
      updatedAt: '',
      readTime: '',
    },
  },
  imageFiles: {
    headerImageFile: null,
    responsiveSectionImageFile: null,
  },
  commentInput: { name: '', date: '', text: '', avatar: '' },
  currentTab: 0,
  loading: false,
  error: null,
};

// --- Redux Slice Definition ---
const blogAddSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setField: (state, action) => {
        state.formData[action.payload.name] = action.payload.value;
    },
    setArticleDataField: (state, action) => {
        state.formData.articleData[action.payload.name] = action.payload.value;
    },
    setResponsiveSectionField: (state, action) => {
        state.formData.articleData.responsiveSection[action.payload.name] = action.payload.value;
    },
    addArrayItem: (state, action) => {
        const { key, value } = action.payload;
        if (!state.formData[key].includes(value)) {
            state.formData[key].push(value);
        }
    },
    removeArrayItem: (state, action) => {
        const { key, value } = action.payload;
        state.formData[key] = state.formData[key].filter(item => item !== value);
    },
    updateNestedArray: (state, action) => {
        const { path, value, type } = action.payload; // type is 'add' or 'remove'
        const currentArray = get(state.formData, path, []);
        
        if (type === 'add' && value) {
            const newArray = [...currentArray, value];
            set(state.formData, path, newArray);
        } else if (type === 'remove') {
            const newArray = currentArray.filter(item => item !== value);
            set(state.formData, path, newArray);
        }
    },
    setCommentInput: (state, action) => {
        state.commentInput = { ...state.commentInput, ...action.payload };
    },
    addComment: (state) => {
        const { name, text, date } = state.commentInput;
        if (name && text && date) {
            state.formData.comments.push(state.commentInput);
            state.commentInput = { name: '', date: '', text: '', avatar: '' };
        } else {
            alert("Please fill in the comment name, date, and text.");
        }
    },
    setBlogImageFile: (state, action) => {
        const { key, file, previewUrl } = action.payload;
        if(state.imageFiles[key]?.previewUrl) {
            URL.revokeObjectURL(state.imageFiles[key].previewUrl);
        }
        state.imageFiles[key] = { file, previewUrl };
    },
    removeBlogImageFile: (state, action) => {
        const key = action.payload;
        if (state.imageFiles[key]?.previewUrl) {
            URL.revokeObjectURL(state.imageFiles[key].previewUrl);
        }
        state.imageFiles[key] = null;
    },
    setTab: (state, action) => {
        state.currentTab = action.payload;
    },
    resetForm: (state) => {
        // Clean up any existing image preview URLs to prevent memory leaks
        Object.values(state.imageFiles).forEach(fileObj => {
            if (fileObj?.previewUrl) {
                URL.revokeObjectURL(fileObj.previewUrl);
            }
        });
        // Return to the initial state
        return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state for all async thunks
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      // Handle fulfilled state for all async thunks
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      )
      // Handle rejected state for all async thunks
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  setField,
  setArticleDataField,
  setResponsiveSectionField,
  addArrayItem,
  removeArrayItem,
  updateNestedArray,
  setCommentInput,
  addComment,
  setBlogImageFile,
  removeBlogImageFile,
  setTab,
  resetForm
} = blogAddSlice.actions;

export default blogAddSlice.reducer;