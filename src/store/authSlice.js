// authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  googleProvider,
  facebookProvider,
  onAuthStateChanged,
  db
} from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (uid, thunkAPI) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return thunkAPI.rejectWithValue("No user profile found");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Google Login
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (_, thunkAPI) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          fullName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          provider: "google",
          createdAt: new Date()
        });
      }

      return user;
    } catch (error) {
      console.error("Google login error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// Facebook Login
export const facebookLogin = createAsyncThunk(
  'auth/facebookLogin',
  async (_, thunkAPI) => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          fullName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          provider: "facebook",
          createdAt: new Date()
        });
      }

      return user;
    } catch (error) {
      console.error("Facebook login error:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const checkUserSession = createAsyncThunk(
  'auth/checkUserSession',
  async (_, thunkAPI) => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  }
);
// signupUser updated
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ email, password, fullName }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        photoURL: "https://via.placeholder.com/120", // default avatar
        createdAt: new Date()
      });

      return { ...user, fullName };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ uid, data }, thunkAPI) => {
    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, data);
      return data; // return updated data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    isLoggedIn: false, 
    user: null, 
    userProfile: null, 
    status: 'loading', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    adminEmail: 'admin@shoplite.com' 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add specific fulfilled cases first to handle data payloads
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.userProfile = null; // Also clear profile on logout
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(facebookLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(checkUserSession.fulfilled, (state, action) => {
        if (action.payload) {
          state.isLoggedIn = true;
          state.user = action.payload;
        } else {
          state.isLoggedIn = false;
          state.user = null;
          state.userProfile = null; // Clear profile if no session
        }
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userProfile = {
          ...state.userProfile,
          ...action.payload
        };
      })

      // ✅ Use matchers to handle generic loading states for ALL thunks
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.status = 'loading';
          state.error = null; // Clear previous errors
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.status = 'succeeded';
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.payload; // payload from rejectWithValue
        }
      );
  },
});


export default authSlice.reducer;
