import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const Carousel = ({ items, itemsToShow = 1 }) => {
    const totalSlides = Math.ceil(items.length / itemsToShow);
    const [currentSlide, setCurrentSlide] = useState(0);

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
                height: '100vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: `${(items.length * 100) / itemsToShow}%`,
                    transform: `translateX(-${translateXPercent}%)`,
                    transition: 'transform 0.6s ease-in-out',
                    height: '100%',
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
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                    height: '50px',
                    width: '50px',
                }}
            >
                <ArrowBackIos />
            </IconButton>

            <IconButton
                onClick={handleNext}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                    height: '50px',
                    width: '50px',
                }}
            >
                <ArrowForwardIos />
            </IconButton>
        </Box>
    );
};

export default Carousel;
