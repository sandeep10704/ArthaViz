import React, { useState } from 'react';
import { Box, Typography, Dialog, IconButton, Button, useMediaQuery } from '@mui/material';
import ColorPalette from '../../Assets/ColorPalette';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const FilterSection = ({ header, topics }) => {
  const [selected, setSelected] = useState('');

  return (
    <Box sx={{ marginBottom: {sm:'5px' ,md: '20px'} }}>
      <Typography sx={{ fontSize: '22px', fontWeight: '200', marginBottom: '8px' }}>
        {header.toUpperCase()}
      </Typography>

      {/* Simple pattern under header */}
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          flexGrow={1}
          sx={{
            height: '12px',
            width: '100%',
            backgroundImage: 'repeating-linear-gradient(-45deg, #ccc, #ccc 1px, transparent 2px, transparent 8px)',
          }}
        />
      </Box>

      {topics.length === 0 ? (
        <Typography sx={{ fontSize: '16px', color: '#aaa', fontFamily: "Outfit", fontWeight: 100 }}>Now</Typography>
      ) : (
        topics.map((topic) => (
          <Typography
            key={topic}
            onClick={() => setSelected(topic)}
            sx={{
              cursor: 'pointer',
              fontSize: '16px',
              marginBottom: '6px',
              fontFamily: "Outfit",
              color: selected === topic ? ColorPalette.orange : 'black',
              fontWeight: selected === topic ? '300' : '100',
            }}
          >
            {topic}
          </Typography>
        ))
      )}
    </Box>
  );
};

const Filters = ({ data }) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filtersContent = (
    <Box sx={{ width: '220px', padding: '16px' }}>
      {data.map((section) => (
        <FilterSection key={section.header} header={section.header} topics={section.topics} />
      ))}
    </Box>
  );

  return (
    <>
     {isSmallScreen ? (
  <>
    <IconButton onClick={handleOpen}>
      <MenuIcon />
    </IconButton>
    <Dialog open={open} onClose={handleClose} fullWidth>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      {filtersContent}
      <Button>Apply</Button>
    </Dialog>
  </>
) : (
  filtersContent
)}

    </>
  );
};

export default Filters;
