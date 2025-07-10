import React, { useState } from 'react';
import { useSelector } from 'react-redux'; 
import { Popover, Box, Typography } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const styles = {
  icon: {
    cursor: 'pointer',
  },
  popover: {
    padding: 2,
    minWidth: 180,
  },
  menuItem: {
    cursor: 'pointer',
    padding: '8px 0',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
  logoutItem: {
    cursor: 'pointer',
    padding: '8px 0',
    color: 'error.main',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  },
};

const ProfileMenu = ({ onOpenProfile, onProfileSettings, onLogin, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn); // ✅ get login state

  const handleIconClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'profile-popover' : undefined;

  return (
    <>
      <PermIdentityIcon
        onClick={handleIconClick}
        sx={styles.icon}
        aria-describedby={id}
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: styles.popover }}
      >
        <Box>
          <Typography onClick={() => { onOpenProfile(); handleClose(); }} sx={styles.menuItem}>
            Open Profile
          </Typography>
          <Typography onClick={() => { onProfileSettings(); handleClose(); }} sx={styles.menuItem}>
            Profile Settings
          </Typography>

         
          {!isLoggedIn && (
            <Typography onClick={() => { onLogin(); handleClose(); }} sx={styles.menuItem}>
              Login
            </Typography>
          )}

          
          {isLoggedIn && (
            <Typography onClick={() => { onLogout(); handleClose(); }} sx={styles.logoutItem}>
              Logout
            </Typography>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default ProfileMenu;
