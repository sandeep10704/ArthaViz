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
  {
    label: 'PAGES',
    children: [
      { label: 'Login', path: '/login' },
      { label: 'Signup', path: '/signup' },
      { label: 'Add Product', path: '/addproduct' },
      { label: 'Add Blog', path: '/addblog' },
      { label: 'Profile', path: '/profile' },
    ]
  },
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
  const [pagesOpen, setPagesOpen] = useState(false); // For mobile drawer
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
      .catch(() => {
        dispatch(uiActions.showNotification({
          open: true,
          message: 'User not logout',
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
  const handleClickwithoutlogin = (path) => {
    if (path === '/login' || path === '/signup') {
      navigate(path);
    } else if (!isLoggedIn) {
      dispatch(uiActions.showNotification({
        open: true,
        message: 'Please login to view those pages',
        type: 'error',
      }));
    } else {
      navigate(path);
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
          {menuItems.map((item) => (
            <React.Fragment key={item.label}>
              {item.label === 'PAGES' ? (
                <>
                  <ListItemButton onClick={() => setPagesOpen(!pagesOpen)}>
                    <ListItemText primary={item.label} />
                    <ArrowDropDownIcon />
                  </ListItemButton>
                  {pagesOpen && (
                    <List disablePadding sx={{ pl: 2 }}>
                      {item.children
                        .filter(child => {
                          if (isLoggedIn && (child.label === 'Login' || child.label === 'Signup')) {
                            return false;
                          }
                          return true;
                        })
                        .map((child) => (
                          <ListItemButton
                            key={child.label}
                            onClick={() => {
                              handleNavigate(child.path);
                              setDrawerOpen(false);
                            }}
                            selected={isActive(child.path)}
                          >
                            <ListItemText primary={child.label} />
                          </ListItemButton>
                        ))}

                    </List>
                  )}
                </>
              ) : (
                <ListItemButton
                  onClick={() => {
                    handleNavigate(item.path);
                    setDrawerOpen(false);
                  }}
                  selected={isActive(item.path)}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              )}
            </React.Fragment>
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
              {menuItems.map((item) => (
                <Box
                  key={item.label}
                  sx={{
                    position: 'relative',
                    '&:hover .dropdown': { display: 'flex', opacity: 1, transform: 'translateY(0px)' },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                      fontFamily: 'Outfit',
                      color: isActive(item.path) ? ColorPalette.orange : '#333',
                      fontWeight: isActive(item.path) ? 600 : 300,
                      transition: 'color 0.3s',
                    }}
                    onClick={() => {
                      if (item.path) handleNavigate(item.path);
                    }}
                  >
                    <Typography variant="body1" sx={{ fontFamily: 'Outfit', fontWeight: isActive(item.path) ? 600 : 400 }}>
                      {item.label}
                    </Typography>
                    {item.children && <ArrowDropDownIcon fontSize="small" />}
                  </Box>

                  {item.children && (
                    <Box
                      className="dropdown"
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        bgcolor: 'white',
                        boxShadow: 3,
                        display: 'none',
                        flexDirection: 'column',
                        zIndex: 10,
                        minWidth: 160,
                        borderRadius: 1,
                        overflow: 'hidden',
                        opacity: 0,
                        transform: 'translateY(10px)',
                        transition: 'all 0.5s ease',
                      }}
                    >
                      {item.children
                        .filter(child => {
                          if (isLoggedIn && (child.label === 'Login' || child.label === 'Signup')) {
                            return false;
                          }
                          return true;
                        })
                        .map((child) => (
                          <Box
                            key={child.label}
                            sx={{
                              px: 2,
                              py: 1,
                              cursor: 'pointer',
                              '&:hover': { bgcolor: '#e8e8e8' },
                              fontFamily: 'Outfit',
                              fontSize: 18,
                              transition: 'background 0.5s',
                            }}
                            onClick={() => handleClickwithoutlogin(child.path)}
                          >
                            {child.label}
                          </Box>
                        ))}
                    </Box>
                  )}
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
