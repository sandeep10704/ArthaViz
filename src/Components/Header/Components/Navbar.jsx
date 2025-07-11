import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Drawer,
  List, ListItemButton, ListItemText, useMediaQuery, useTheme
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../../store/uiSlice'; // adjust path if needed

import '@fontsource/outfit';
import '@fontsource/outfit/100.css';
import '@fontsource/outfit/500.css';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ColorPalette from '../../../Assets/ColorPalette';
import ProfileMenu from './ProfileMenu';
import { logoutUser } from '../../../store/authSlice';

const menuItems = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT', path: '/about' },
  { label: 'SHOP', path: '/shop' },
  { label: 'BLOGS', path: '/blogs' },
  { label: 'PAGES', path: '/pages' },
  { label: 'CONTACT', path: '/contact' },
];

const iconLinks = [
  { icon: <SearchIcon />, path: '/search' },
  { icon: <FavoriteBorderIcon />, path: '/wishlist' },
];

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const isActive = (path) => (location.pathname === path);
  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
         dispatch(uiActions.showNotification({
        open: true,
        message: 'User logout',
        type: 'error',
      }));
        
        navigate('/login');
      })
      .catch((error) => {
        dispatch(uiActions.showNotification({
        open: true,
        message: 'user not logout',
        type: 'error',
      }));
      });
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      dispatch(uiActions.showNotification({
        open: true,
        message: 'Please login to view your cart',
        type: 'error',
      }));
    } else {
      navigate('/cart');
    }
  };

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        height: '96vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <Box sx={{ overflowY: 'auto', pb: 16, flex: 1 }}>
        <List disablePadding>
          {menuItems.map(({ label, path }) => (
            <ListItemButton
              key={label}
              onClick={() => handleNavigate(path)}
              selected={isActive(path)}
            >
              <ListItemText primary={label} />
              {label === 'PAGES' && <ArrowDropDownIcon />}
            </ListItemButton>
          ))}
        </List>

        <List disablePadding>
          {isLoggedIn ? (
            <>
              <ListItemButton onClick={() => { navigate('/profile'); setDrawerOpen(false); }}>
                <ListItemText primary="My Profile" />
              </ListItemButton>
              <ListItemButton onClick={() => {
                handleLogout();
                navigate('/');
                setDrawerOpen(false);
              }}>
                <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
              </ListItemButton>
            </>
          ) : (
            <ListItemButton onClick={() => { navigate('/login'); setDrawerOpen(false); }}>
              <ListItemText primary="Login" />
            </ListItemButton>
          )}
        </List>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          bgcolor: '#fff',
          borderTop: '1px solid #ddd',
          pt: 1,
        }}
      >
        <Box sx={{ px: 2 }}>
          <Typography variant="body2" sx={{ fontFamily: 'Outfit', fontWeight: 100, fontSize: '13px', mb: 0.5 }}>
            Need help? Call us 112233344455
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Outfit', fontWeight: 100, fontSize: '13px', mb: 0.5 }}>
            Summer sale discount 60% off! Shop Now
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: 'Outfit', fontWeight: 100, fontSize: '13px' }}>
            2-3 business days delivery & free returns
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 0 }}>
          {iconLinks.map(({ icon, path }, i) => (
            <IconButton
              key={i}
              onClick={() => handleNavigate(path)}
              sx={{ color: isActive(path) ? ColorPalette.orange : 'inherit' }}
            >
              {icon}
            </IconButton>
          ))}
          <IconButton
            onClick={handleCartClick}
            sx={{ color: isActive('/cart') ? ColorPalette.orange : 'inherit' }}
          >
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ ml: { xs: 0, sm: 0, md: 10, lg: 15 } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                letterSpacing: '2px',
                cursor: 'pointer',
                fontFamily: 'Outfit',
                fontSize: '31px',
                lineHeight: '100%',
                textTransform: 'uppercase',
              }}
              onClick={() => navigate('/')}
            >
              SHOP<span style={{ fontWeight: 100 }}>LITE</span>
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 4 }}>
              {menuItems.map(({ label, path }) => (
                <Box
                  key={label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontFamily: "outfit",
                    color: isActive(path) ? ColorPalette.orange : '#333',
                    fontWeight: isActive(path) ? 'bold' : 400,
                  }}
                  onClick={() => handleNavigate(path)}
                >
                  <Typography variant="body1" sx={{ fontFamily: 'Outfit', fontWeight: isActive(path) ? 400 : 200 }}>{label}</Typography>
                  {label === 'PAGES' && <ArrowDropDownIcon fontSize="small" />}
                </Box>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!isMobile ? (
              <Box sx={{ mr: { md: 10, lg: 15 }, display: 'flex', alignItems: 'center', gap: 2 }}>
                {iconLinks.map(({ icon, path }, i) => (
                  <IconButton
                    key={i}
                    onClick={() => handleNavigate(path)}
                    sx={{ color: isActive(path) ? ColorPalette.orange : 'inherit' }}
                  >
                    {icon}
                  </IconButton>
                ))}
                <IconButton
                  onClick={handleCartClick}
                  sx={{ color: isActive('/cart') ? ColorPalette.orange : 'inherit' }}
                >
                  <ShoppingCartOutlinedIcon />
                </IconButton>
                  <ProfileMenu
      onMyProfile={() => navigate('/profile')}
      onLogin={() => navigate('/login')}
      onLogout={handleLogout}
    />
              </Box>
            ) : (
              <IconButton edge="end" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
