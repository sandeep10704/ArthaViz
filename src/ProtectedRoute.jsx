import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { uiActions } from './store/uiSlice';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(uiActions.showNotification({
        message: "Please login to view this page.",
        type: "warning",
        open: true,
      }));
     navigate(from, { replace: true });
    }
  }, [isLoggedIn, dispatch, navigate]);

  if (!isLoggedIn) {
    return null; 
  }

  return children;
};

export default ProtectedRoute;
