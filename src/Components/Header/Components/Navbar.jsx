import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Drawer,
  List, ListItemButton, ListItemText, useMediaQuery, useTheme, Divider
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import '@fontsource/outfit'; 

import '@fontsource/outfit/100.css';
import '@fontsource/outfit/500.css';


import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ColorPalette from '../../../Assets/ColorPalette'

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
  { icon: <AccountCircle />, path: '/account' },
  { icon: <FavoriteBorderIcon />, path: '/wishlist' },
  { icon: <ShoppingCartOutlinedIcon />, path: '/cart' },
];

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const drawerContent = (
    <Box sx={{ width: 250, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <List sx={{ flexGrow: 1 }}>
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
      <Divider />
      <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 2 }}>
        {iconLinks.map(({ icon, path }, i) => (
          <IconButton
            key={i}
            onClick={() => handleNavigate(path)}
            sx={{ color: isActive(path) ? ColorPalette.orange : 'inherit' }}
          >
            {icon}
          </IconButton>
        ))}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
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
              padding:"0 0 0 180px",
            }}
            onClick={() => navigate('/')}
          >
            SHOP<span style={{ fontWeight: 100 }}>LITE</span>
          </Typography>


          {/* Desktop Menu */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 4 }}>
              {menuItems.map(({ label, path }) => (
                <Box
                  key={label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: isActive(path) ? ColorPalette.orange : '#333',
                    fontWeight: isActive(path) ? 'bold' : 400,
                  }}
                  onClick={() => handleNavigate(path)}
                >
                  <Typography variant="body1" sx={{fontFamily: 'Outfit',}}>{label}</Typography>
                  {label === 'PAGES' && <ArrowDropDownIcon fontSize="small" />}
                </Box>
              ))}
            </Box>
          )}

          {/* Right Icons / Mobile Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!isMobile ? (
              iconLinks.map(({ icon, path }, i) => (
                <IconButton
                  key={i}
                  onClick={() => handleNavigate(path)}
                  sx={{ color: isActive(path) ? ColorPalette.orange : 'inherit',fontFamily: 'Outfit', }}
                >
                  {icon}
                </IconButton>
              ))
            ) : (
              <IconButton edge="end" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
