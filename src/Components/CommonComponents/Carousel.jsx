import React, { Suspense, useState } from 'react';
import { Box, IconButton, useMediaQuery } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import LoadingScreen from './LoadingScreen';
import ColorPalette from '../../Assets/ColorPalette';

const Carousel = ({ items, itemsToShow = 1, gap = 0 }) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const visibleCount = itemsToShow;


  const slides = [];
  for (let i = 0; i < items.length; i += visibleCount) {
    slides.push(items.slice(i, i + visibleCount));
  }
  const totalSlides = slides.length;
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () =>
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  const handleNext = () =>
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  const totalGap = gap * (visibleCount - 1);

  return (

    <Box sx={{ position: 'relative', width: '100%' }}>


      <Box
        sx={{
          overflow: 'hidden',
          px: isSmallScreen ? `${gap * 2}px` : 0,   
        }}
      >
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
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: `${gap}px`,
                boxSizing: 'border-box',
              }}
            >
              {group.map(({ Component, props }, idx) => (
                <Box
                  key={idx}
                  sx={{
                    flex: '0 0 auto',
                    width: `calc((92% - ${totalGap}px) / ${visibleCount})`,
                    p: isSmallScreen ? 0 : 0,
                    boxSizing: 'border-box',
                  }}
                >
                  <Suspense fallback={<LoadingScreen />}>
                    <Component {...props} />
                  </Suspense>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>


      <IconButton
        onClick={handlePrev}
        sx={{
          position: 'absolute',
          top: '50%',
          left: isSmallScreen ? `-${gap * 1.5}px` : 0,
          transform: 'translateY(-50%)',
          zIndex: 2,
          bgcolor: 'transparent', 
          '&:hover': { bgcolor: ColorPalette.orange },
          opacity: "0.8",
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          top: '50%',
          right: isSmallScreen ? `-${gap * 1.5}px` : 8,
          transform: 'translateY(-50%)',
          zIndex: 2,
          bgcolor: 'transparent', 
          '&:hover': { bgcolor: ColorPalette.orange },
          opacity: "0.5",
        }}
      >
        <ArrowForwardIos />
      </IconButton>


    </Box>
  );
};

export default Carousel;
