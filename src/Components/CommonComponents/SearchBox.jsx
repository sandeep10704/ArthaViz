import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ColorPalette from '../../Assets/ColorPalette';

const SearchBox = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '230px',
                gap: '4px',
                borderRadius: '50px',
            }}
        >
            <TextField
                placeholder="Search..."
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon
                                sx={{
                                    color: ColorPalette.orange, 
                                    fontSize: '40px' 
                                }}
                            />
                        </InputAdornment>

                    ),
                }}
                sx={{
                    width: '220px',
                    height: '50px',
                    '& .MuiInputBase-root': {
                        height: '72px',
                        borderRadius: '5px',
                    },
                    '& input': {
                        padding: '0 12px',
                        fontSize: '18px',
                    },
                }}
            />
        </Box>
    );
};

export default SearchBox;
