import React, { useState } from 'react';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const Carousel = ({ items, itemsToShow = 1 }) => {
    const totalSlides = Math.ceil(items.length / itemsToShow);
    const [currentSlide, setCurrentSlide] = useState(0);
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const handlePrev = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? totalSlides - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentSlide((prev) =>
            prev === totalSlides - 1 ? 0 : prev + 1
        );
    };

    const itemWidthPercent = 100 / items.length;
    const translateXPercent = currentSlide * itemWidthPercent * itemsToShow;

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
                height: 'auto',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: `${(items.length * 100) / itemsToShow}%`,
                    transform: `translateX(-${translateXPercent}%)`,
                    transition: 'transform 0.6s ease-in-out',
                    height: '100%',
                    padding: isSmallScreen ? "0 0 0 25px" : "0px",
                }}
            >
                {items.map(({ Component, props }, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: `${100 / items.length}%`,
                            flexShrink: 0,
                            height: '100%',
                        }}
                    >
                        <Component {...props} />
                    </Box>
                ))}
            </Box>

            {/* Navigation Arrows */}
            <IconButton
                onClick={handlePrev}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '10px',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    backgroundColor: 'transparent', // fully transparent background
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }, // optional hover
                    height: '50px',
                    width: '50px',
                }}
            >
                <ArrowBackIos sx={{ color: 'rgba(0,0,0,0.4)' }} /> {/* Adjust transparency */}
            </IconButton>

            <IconButton
                onClick={handleNext}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    backgroundColor: 'transparent', // fully transparent background
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
                    height: '50px',
                    width: '50px',
                }}
            >
                <ArrowForwardIos sx={{ color: 'rgba(0,0,0,0.4)' }} /> {/* Adjust transparency */}
            </IconButton>

        </Box>
    );
};

export default Carousel;