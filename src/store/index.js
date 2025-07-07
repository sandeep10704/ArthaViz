import { configureStore } from "@reduxjs/toolkit";
import LastPostReducer from "./LastPost-slice";
import customerReviewReducer from "./CustomerReview-slice"
import bestSellingReducer from "./BestSellinga-slice"
import categoriesReducer from "./Categories-slice"
import itemsReducer from "./Items-slice"
import productReducer from "./productSlice"
import postsReducer from "./postsSlice"

const store = configureStore({
  reducer: {
    Items: itemsReducer,
    LastPost: LastPostReducer,
    CustomerReviews: customerReviewReducer,
    BestSelling: bestSellingReducer,
    Categories: categoriesReducer,
    products: productReducer,
    posts: postsReducer,
  },
});

export default store;
