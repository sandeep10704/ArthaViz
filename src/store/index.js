import { configureStore } from "@reduxjs/toolkit";
import LastPostReducer from "./LastPost-slice";
import customerReviewReducer from "./CustomerReview-slice";
import bestSellingReducer from "./BestSellinga-slice";
import categoriesReducer from "./Categories-slice";
import itemsReducer from "./Items-slice";
import productReducer from "./productSlice"; 
import productAddReducer from "./ProductAddSlice"; 
import postsReducer from "./postsSlice";
import singleProductReducer from "./singleProductSlice";
import singlePostReducer from "./singlePostSlice";
import cartReducer from "./cartSlice";
import uiReducer from "./uiSlice";
import authReducer from "./authSlice";
import blogReducer from "./addBlogSlice";
import checkoutReducer from "./checkoutSlice"


const store = configureStore({
  reducer: {
    Items: itemsReducer,
    LastPost: LastPostReducer,
    CustomerReviews: customerReviewReducer,
    BestSelling: bestSellingReducer,
    Categories: categoriesReducer,
    products: productReducer,
    product: productAddReducer,
    posts: postsReducer,
    singleProduct: singleProductReducer,
    singlePost: singlePostReducer,
    cart: cartReducer,
    ui: uiReducer,
    auth: authReducer,
     blog: blogReducer,
     checkout: checkoutReducer,
  },
});

export default store;
