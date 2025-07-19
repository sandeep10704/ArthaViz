import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { uiActions } from './uiSlice';
import { clearCartInFirestore } from './cartSlice';
import axios from 'axios';

const initialState = {
  billingData: {},
  paymentMethod: 'direct-bank-transfer',
  status: 'idle',
  error: null,
};

// ✅ Place order with product sales update
export const placeOrder = createAsyncThunk(
  'checkout/placeOrder',
  async ({ formData, paymentMethod }, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.auth.user;
    const cartItems = state.cart.cartItems;

    if (!user) {
      thunkAPI.dispatch(uiActions.showNotification({
        open: true,
        message: 'Please login to place order.',
        type: 'error',
      }));
      throw new Error('User not logged in');
    }

    try {
      const orderId = Date.now().toString();
      const orderRef = doc(db, 'orders', orderId);
      const orderData = {
        userId: user.uid,
        formData,
        paymentMethod,
        products: cartItems,
        createdAt: new Date().toISOString(),
      };

      await setDoc(orderRef, orderData);

      // ✅ Update product sales counts in Firestore and send to backend API
      for (const item of cartItems) {
        const productId = String(item.id);
        const sellingNoToAdd = item.quantity || 1;

        const productSalesRef = doc(db, 'productSales', productId);
        const productSalesSnap = await getDoc(productSalesRef);

        let updatedSellingNo = sellingNoToAdd;

        if (productSalesSnap.exists()) {
          const currentSellingNo = productSalesSnap.data().sellingNo || 0;
          updatedSellingNo = currentSellingNo + sellingNoToAdd;

          await setDoc(productSalesRef, {
            productId,
            sellingNo: updatedSellingNo
          });
        } else {
          await setDoc(productSalesRef, {
            productId,
            sellingNo: sellingNoToAdd
          });
        }

        // ✅ POST updated selling number to backend API
        try {
          await axios.post('https://arthaserve-1.onrender.com/products/selling', {
            productid: Number(productId),
            sellingno: updatedSellingNo
          });
          console.log(`✅ Sent updated sellingNo for product ${productId} to backend.`);
        } catch (apiError) {
          console.error(`❌ Failed sending sellingNo to backend for product ${productId}:`, apiError);
        }
      }

      // ✅ Clear cart in Firestore and Redux
      await thunkAPI.dispatch(clearCartInFirestore());

      thunkAPI.dispatch(uiActions.showNotification({
        open: true,
        message: 'Order placed and product sales updated!',
        type: 'success',
      }));

      return orderData;

    } catch (error) {
      console.error("Failed placing order or updating sales:", error);
      thunkAPI.dispatch(uiActions.showNotification({
        open: true,
        message: 'Failed to add order. Please try again later.',
        type: 'error',
      }));
      return thunkAPI.rejectWithValue('Failed to add order: ' + error.message);
    }
  }
);


// ✅ Save billing data to user profile
export const saveBillingDataToUser = createAsyncThunk(
  'checkout/saveBillingDataToUser',
  async (billingData, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.auth.user;
    if (!user) throw new Error('User not logged in');

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { billingData }, { merge: true });

      thunkAPI.dispatch(
        uiActions.showNotification({
          open: true,
          message: 'Billing data saved to profile.',
          type: 'success',
        })
      );

    } catch (error) {
      thunkAPI.dispatch(
        uiActions.showNotification({
          open: true,
          message: 'Failed to save billing data.',
          type: 'error',
        })
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// ✅ Fetch saved billing data
export const fetchUserBillingData = createAsyncThunk(
  'checkout/fetchUserBillingData',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const user = state.auth.user;
    if (!user) throw new Error('User not logged in');

    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists() && userSnap.data().billingData) {
        return userSnap.data().billingData;
      } else {
        return {};
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    updateBillingData: (state, action) => {
      state.billingData = { ...state.billingData, ...action.payload };
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    clearCheckout: (state) => {
      state.billingData = {};
      state.paymentMethod = 'direct-bank-transfer';
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBillingData.fulfilled, (state, action) => {
        state.billingData = action.payload;
      })
      .addCase(saveBillingDataToUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { updateBillingData, setPaymentMethod, clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
