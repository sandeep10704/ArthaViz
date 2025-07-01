import React, { Suspense, useState } from 'react';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import LoadingScreen from './LoadingScreen';

// Allow itemsToShow prop to work on all screen sizes
const Carousel = ({ items, itemsToShow = 1 }) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    // Use itemsToShow regardless of screen size
    const visibleCount = itemsToShow;

    // Build slide groups
    const slides = [];
    for (let i = 0; i < items.length; i += visibleCount) {
        slides.push(items.slice(i, i + visibleCount));
    }

    const totalSlides = slides.length;
    const [currentSlide, setCurrentSlide] = useState(0);

    const handlePrev = () => {
        setCurrentSlide(prev => (prev === 0 ? totalSlides - 1 : prev - 1));
    };
    const handleNext = () => {
        setCurrentSlide(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    return (
        <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            <Box
                sx={{
                    display: 'flex',
                    width: `${totalSlides * 100}%`,
                    transform: `translateX(-${(currentSlide * 100) / totalSlides}%)`,
                    transition: 'transform 0.5s ease-in-out',
                }}
            >
                {slides.map((group, slideIdx) => (
                    <Box
                        key={slideIdx}
                        sx={{
                            width: `${100 / totalSlides}%`,
                            display: 'flex',
                            boxSizing: 'border-box',
                        }}
                    >
                        {group.map(({ Component, props }, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    flex: `0 0 ${100 / visibleCount}%`,
                                    boxSizing: 'border-box',
                                    p: isSmallScreen ? 2 : 1,
                                }}
                            >
                                <Suspense fallback={<LoadingScreen/>}>
                                    <Component {...props} />
                                </Suspense>
                            </Box>
                        ))}
                    </Box>
                ))}
            </Box>

            <IconButton
                onClick={handlePrev}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 8,
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    bgcolor: 'rgba(255,255,255,0.7)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                }}
            >
                <ArrowBackIos />
            </IconButton>

            <IconButton
                onClick={handleNext}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 8,
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                    bgcolor: 'rgba(255,255,255,0.7)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
                }}
            >
                <ArrowForwardIos />
            </IconButton>
        </Box>
    );
};

export default Carousel;
