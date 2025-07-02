import { useTheme } from '@emotion/react';
import { Button, useMediaQuery } from '@mui/material';
import React from 'react'

const CustomButton = ({text}) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMidScreen = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  return (
    
    <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#ff6a4f',
                                borderRadius: '30px',
                                px: 4,
                                py: 1.5,
                                fontSize: isSmallScreen
                                    ? '8px'
                                    : isMidScreen
                                        ? `${(16 * 5) / 7}px`
                                        : '16px',
                                textTransform: 'uppercase',
                                fontWeight: 300,
                                '&:hover': {
                                    backgroundColor: '#ff5a3f',
                                },
                            }}
                        >
                            {text}
                        </Button>
  )
}

export default CustomButton;
