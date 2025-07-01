import React, { lazy, Suspense } from 'react';
import { Box, Typography, Button, useMediaQuery, useTheme, styled } from '@mui/material';
import ImagesAssets from '../../../../Assets/ImagesAssets';
// import SplitText from '../../../CommonComponents/SplitText';
// import AnimatedContent from '../../../CommonComponents/AnimatedContent';

const SplitText = lazy(() => import('../../../CommonComponents/SplitText'));
// const AnimatedContent = lazy(() => import('../../../CommonComponents/AnimatedContent'));
const Poster = ({ direction = 'right' }) => {




    const RotatingImage = styled('img')({
        width: '220%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(21deg)',
        filter: 'contrast(95%) brightness(220%)',
        animation: 'rotateScale 5s infinite ease-in-out',
        animationPlayState: 'running',
        '&:hover': {
            animationPlayState: 'paused',
        },
    });

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMidScreen = useMediaQuery(theme.breakpoints.between('sm', 'lg')); // mid screen detection

    const isLeft = direction === 'left';

    const handleAnimationComplete = () => {
        console.log('Animation completed!');
    };

    // Calculate sizes based on screen
    const imageWidth = isSmallScreen
        ? '100%'
        : isMidScreen
            ? `${(750 * 3) / 7}px` // 5/7 of 750px
            : '750px';

    const imageHeight = isSmallScreen
        ? '250px'
        : isMidScreen
            ? `${(750 * 3) / 7}px` // 5/7 of 750px
            : '750px';

    const imgInnerWidth = isSmallScreen
        ? '300px'
        : isMidScreen
            ? `${(800 * 4) / 7}px`
            : '800px';

    const imgInnerHeight = isSmallScreen
        ? '300px'
        : isMidScreen
            ? `${(800 * 4) / 7}px`
            : '800px';

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: isSmallScreen
                    ? 'auto'
                    : isMidScreen
                        ? `${(678 * 3) / 7}px`
                        : '678px',

                display: 'flex',
                flexDirection: isSmallScreen
                    ? 'column'
                    : isLeft
                        ? 'row-reverse'
                        : 'row',
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
                    [isLeft ? 'left' : 'right']: isSmallScreen
                        ? 'auto'
                        : isMidScreen
                            ? `${(190 * 2) / 7}px`
                            : '190px',

                    width: imageWidth,
                    height: imageHeight,
                    borderRadius: isSmallScreen ? 0 : '50%',
                    backgroundColor: '#f3f3f3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    padding: isSmallScreen
                        ? '0'
                        : isLeft
                            ? '0 20px 70px 0'
                            : '0 70px 20px 0',
                    mt: isSmallScreen ? 2 : 0,
                    mb: isSmallScreen ? 2 : 0,
                }}
            >
                <Box
                    sx={{
                        width: imgInnerWidth,
                        height: imgInnerHeight,
                        position: 'relative',
                    }}
                >
                    <img
                        src={ImagesAssets.poster1}
                        alt="Product"
                        className="rotating-image"
                        style={{
                            width: '220%',
                            height: isSmallScreen ? '100%' : 'auto',
                            objectFit: isSmallScreen ? 'contain' : 'initial',
                            filter: 'contrast(95%) brightness(220%)',
                        }}
                    />




                </Box>
            </Box>

            {/* Text Content */}
            <Box
                zIndex={1}
                sx={{
                    flex: 1,
                    textAlign: isSmallScreen
                        ? 'center'
                        : isLeft
                            ? 'right'
                            : 'left',
                }}
            >
                <Typography
                    variant={isSmallScreen ? 'h5' : 'h2'}
                    sx={{
                        fontWeight: 200,
                        textTransform: 'uppercase',
                        fontSize: isSmallScreen
                            ? undefined
                            : isMidScreen
                                ? `${((parseFloat(theme.typography.h3.fontSize) * theme.typography.htmlFontSize * 4) / 7).toFixed(2)}px`
                                : undefined,
                        ml: isMidScreen ? 0 : undefined,
                    }}
                ><Suspense fallback={<div>Loading animation...</div>}>
                    <SplitText
                        text="GoPro hero9 Black"
                        delay={200}
                        duration={1.5}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        onLetterAnimationComplete={handleAnimationComplete}
                    />
                       </Suspense>
                </Typography>


                <Typography
                    variant="body1"
                    sx={{
                        fontSize: isSmallScreen
                            ? '16px'
                            : isMidScreen
                                ? `${(20 * 4) / 7}px`
                                : '20px',
                        mb: 3,
                        fontWeight: 200,
                    }}
                ><Suspense fallback={<div>Loading animation...</div>}>
                    <SplitText
                        text="Limited stocks available. Grab it now!"
                        delay={100}
                        duration={1.3}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        onLetterAnimationComplete={handleAnimationComplete}
                    />
                    </Suspense>
                </Typography>
                <Suspense fallback={<div>Loading animation...</div>}>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#ff6a4f',
                                borderRadius: '30px',
                                px: 4,
                                py: 1.5,
                                fontSize: isSmallScreen
                                    ? '16px'
                                    : isMidScreen
                                        ? `${(16 * 5) / 7}px`
                                        : '16px',
                                textTransform: 'uppercase',
                                fontWeight: 200,
                                '&:hover': {
                                    backgroundColor: '#ff5a3f',
                                },
                            }}
                        >
                            Shop collection
                        </Button>

                </Suspense>
            </Box>

        </Box>
    );
};

export default Poster;
