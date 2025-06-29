import React from 'react';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import ImagesAssets from '../../../../Assets/ImagesAssets';
import SplitText from '../../../CommonComponents/SplitText';
import AnimatedContent from '../../../CommonComponents/AnimatedContent';

const Poster = ({ direction = 'right' }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const isLeft = direction === 'left';

    const handleAnimationComplete = () => {
        console.log('Animation completed!');
    };

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: isSmallScreen ? 'auto' : '678px',
                display: 'flex',
                flexDirection: isSmallScreen
                    ? 'column'
                    : (isLeft ? 'row-reverse' : 'row'),

                alignItems: 'center',
                justifyContent: 'space-around',
                backgroundColor: '#fafafa',
                px: isSmallScreen ? 2 : '200px',
                pt: isSmallScreen ? 4 : 0,
                pb: isSmallScreen ? 4 : 0,
                boxSizing: 'border-box',
                overflow: 'hidden',
                position: 'relative',
                gap: isSmallScreen ? 4 : 0,
            }}
        >
            {/* Image Block */}
            <Box
                sx={{
                    position: isSmallScreen ? 'relative' : 'absolute',
                    [isLeft ? 'left' : 'right']: isSmallScreen ? 'auto' : '190px',
                    width: isSmallScreen ? '100%' : '720px',
                    height: isSmallScreen ? '250px' : '760px',
                    borderRadius: isSmallScreen ? 0 : '50%',
                    backgroundColor: '#f3f3f3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    padding: isSmallScreen ? '0' : isLeft ? '0 20px 70px 0' : '0 70px 20px 0',
                    mt: isSmallScreen ? 2 : 0,
                    mb: isSmallScreen ? 2 : 0,
                }}
            >
                <Box
                    sx={{
                        width: isSmallScreen ? '300px' : '750px',
                        height: isSmallScreen ? '300px' : '750px',
                        position: 'relative',
                    }}
                >
                    <Box
                        component="img"
                        src={ImagesAssets.poster1}
                        alt="Product"
                        sx={{
                            width: '220%',
                            height: isSmallScreen ? '100%' : 'auto',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: isSmallScreen
                                ? 'translate(-50%, -50%)'
                                : 'translate(-50%, -50%) rotate(21deg)',
                            objectFit: isSmallScreen ? 'contain' : 'initial',
                            filter: 'contrast(95%) brightness(220%)',
                            animation: 'rotateScale 5s infinite ease-in-out',
                            '@keyframes rotateScale': {
                                '0%': {
                                    transform: 'translate(-50%, -50%) rotate(0deg) scale(0.8)',
                                },
                                '50%': {
                                    transform: 'translate(-50%, -50%) rotate(180deg) scale(1.1)',
                                },
                                '100%': {
                                    transform: 'translate(-50%, -50%) rotate(360deg) scale(0.8)',
                                },
                            },
                        }}
                    />
                </Box>
            </Box>

            {/* Text Content */}
            <Box
                zIndex={1}
                sx={{ flex: 1, textAlign: isSmallScreen ? 'center' : isLeft ? 'right' : 'left' }}
            >
                <Typography
                    variant={isSmallScreen ? 'h5' : 'h2'}
                    sx={{ fontWeight: 200, textTransform: 'uppercase' }}
                >
                    <SplitText
                        text="GoPro hero9 Black"
                        delay={100}
                        duration={0.6}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        onLetterAnimationComplete={handleAnimationComplete}
                    />
                </Typography>

                <Typography
                    variant="body1"
                    sx={{ fontSize: isSmallScreen ? '16px' : '20px', mb: 3, fontWeight: 200 }}
                >
                    <SplitText
                        text="Limited stocks available. Grab it now!"
                        delay={40}
                        duration={0.4}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        onLetterAnimationComplete={handleAnimationComplete}
                    />
                </Typography>

                <AnimatedContent
                    distance={100}
                    direction="vertical"
                    reverse={true}
                    duration={1.5}
                    ease="elastic.out(1, 0.3)"
                    initialOpacity={0.0}
                    animateOpacity
                    scale={1.0}
                    threshold={0.1}
                    delay={0.0}
                >
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#ff6a4f',
                            borderRadius: '30px',
                            px: 4,
                            py: 1.5,
                            fontSize: '16px',
                            textTransform: 'uppercase',
                            fontWeight: 200,
                            '&:hover': {
                                backgroundColor: '#ff5a3f',
                            },
                        }}
                    >
                        Shop collection
                    </Button>
                </AnimatedContent>
            </Box>
        </Box>
    );
};

export default Poster;
