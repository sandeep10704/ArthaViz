import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { uiActions } from './store/uiSlice';

const AdminProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const adminEmail = useSelector((state) => state.auth.adminEmail);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (!user || user.email !== adminEmail) {
      dispatch(uiActions.showNotification({
        message: "Admin access required to view this page.",
        type: "warning",
        open: true,
      }));
      navigate(from, { replace: true });
    }
  }, [user, adminEmail, dispatch, navigate, from]);

  if (!user || user.email !== adminEmail) {
    return null; // Prevents rendering children during redirect
  }

  return children;
};

export default AdminProtectedRoute;
