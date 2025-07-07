import React, { useState } from 'react';
import {
  Box,
  Typography,
  Dialog,
  IconButton,
  Button,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ColorPalette from '../../Assets/ColorPalette';

const FilterSection = ({ header, topics, selectedFilters, onChange }) => {
  const selected = selectedFilters[header] || [];

  const handleSelect = (topic) => {
    const isSelected = selected.includes(topic);
    const updated = isSelected
      ? selected.filter((t) => t !== topic)
      : [...selected, topic];

    const updatedFilters = {
      ...selectedFilters,
      [header]: updated
    };

    onChange(updatedFilters);
  };

  return (
    <Box sx={{ marginBottom: { sm: '5px', md: '20px' } }}>
      <Typography sx={{ fontSize: '22px', fontWeight: '200', marginBottom: '8px' }}>
        {header.toUpperCase()}
      </Typography>

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
        <Typography sx={{ fontSize: '16px', color: '#aaa', fontFamily: "Outfit", fontWeight: 100 }}>None</Typography>
      ) : (
        topics.map((topic) => (
          <Typography
            key={topic}
            onClick={() => handleSelect(topic)}
            sx={{
              cursor: 'pointer',
              fontSize: '16px',
              marginBottom: '6px',
              fontFamily: "Outfit",
              color: selected.includes(topic) ? ColorPalette.orange : 'black',
              fontWeight: selected.includes(topic) ? '300' : '100',
            }}
          >
            {topic}
          </Typography>
        ))
      )}
    </Box>
  );
};

const Filters = ({ data, selectedFilters, onFilterChange }) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleReset = () => {
    onFilterChange({}); // Clear all filters
  };

  const filtersContent = (
    <Box sx={{ width: '220px', padding: '16px' }}>
      {data.map((section) => (
        <FilterSection
          key={section.header}
          header={section.header}
          topics={section.topics}
          selectedFilters={selectedFilters}
          onChange={onFilterChange}
        />
      ))}
      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={handleReset}
          sx={{ fontFamily: 'Outfit', textTransform: 'none' }}
        >
          Reset Filters
        </Button>
      </Box>
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
            <Box sx={{ px: 2, pb: 2 }}>
              <Button fullWidth variant="contained" onClick={handleClose}>
                Apply
              </Button>
            </Box>
          </Dialog>
        </>
      ) : (
        filtersContent
      )}
    </>
  );
};

export default Filters;
