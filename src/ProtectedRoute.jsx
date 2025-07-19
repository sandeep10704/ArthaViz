import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { uiActions } from './store/uiSlice';
import LoadingScreen from './Components/CommonComponents/LoadingScreen'

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const status = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (status === 'succeeded' && !isLoggedIn) {
      dispatch(uiActions.showNotification({
        message: "Please login to view this page.",
        type: "warning",
        open: true,
      }));
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, status, dispatch, navigate, from]);

  if (status === 'loading') {
    return <LoadingScreen/>; // or your loader/spinner
  }

  return isLoggedIn ? children : null;
};

export default ProtectedRoute;
