import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/uiSlice';
import { Box } from '@mui/material';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);

  const handleClose = () => {
    dispatch(
      uiActions.showNotification({
        open: false,
        message: '',
        type: ''
      })
    );
  };

  // Auto close after 3 seconds
  useEffect(() => {
    if (notification && notification.open) {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (!notification || !notification.open) return null;

  return (
   <Box
  sx={{
    position: 'fixed',
    top: 10,
    right: 50,
    zIndex: 9999,

  }}
>
  <Alert onClose={handleClose} severity={notification.type}>
    {notification.message}
  </Alert>
</Box>

  );
};

export default Notification;
