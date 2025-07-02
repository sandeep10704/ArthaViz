import React, { lazy, Suspense } from 'react';
import { Box, Typography, Button, useMediaQuery, useTheme, styled } from '@mui/material';
import ImagesAssets from '../../../../Assets/ImagesAssets';
import CustomButton from '../../../CommonComponents/CustomButton';
import '@fontsource/outfit/200.css';
import '@fontsource/outfit/100.css';
// import SplitText from '../../../CommonComponents/SplitText';
// import AnimatedContent from '../../../CommonComponents/AnimatedContent';

const SplitText = lazy(() => import('../../../CommonComponents/SplitText'));
// const AnimatedContent = lazy(() => import('../../../CommonComponents/AnimatedContent'));
const Poster = ({ direction = 'right' }) => {
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
            ? `${(550 * 3) / 7}px` 
            : '550px';

    const imageHeight = isSmallScreen
        ? '250px'
        : isMidScreen
            ? `${(550 * 3) / 7}px` 
            : '550px';

    const imgInnerWidth = isSmallScreen
        ? '300px'
        : isMidScreen
            ? `${(550 * 4) / 7}px`
            : '550px';

    const imgInnerHeight = isSmallScreen
        ? '300px'
        : isMidScreen
            ? `${(550 * 4) / 7}px`
            : '550px';

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: isSmallScreen
                    ? 'auto'
                    : isMidScreen
                        ? `${(678 * 3) / 7}px`
                        : '500px',

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
                            ? `${(50 * 2) / 7}px`
                            : '50px',

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
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isSmallScreen
                        ? 'center'
                        : isLeft
                            ? 'flex-end'
                            : 'flex-start',
                    textAlign: isSmallScreen
                        ? 'center'
                        : isLeft
                            ? 'right'
                            : 'left',
                    flex: 1,
                }}
            >
                <Typography
                    variant={isSmallScreen ? 'h5' : 'h4'}
                    sx={{
                        fontWeight: 200,
                        textTransform: 'uppercase',
                        fontSize: isSmallScreen
                            ? undefined
                            : isMidScreen
                                ? `${((parseFloat(theme.typography.h3.fontSize) * theme.typography.htmlFontSize * 4) / 7).toFixed(2)}px`
                                : undefined,
                        ml: isMidScreen ? 0 : undefined,
                        width: isSmallScreen ? '100%' : 'auto',
                        p:0,
                    }}
                >
                    <Suspense fallback={<div>Loading animation...</div>}>
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
                    variant="body3"
                    sx={{
                        fontSize: isSmallScreen
                            ? '16px'
                            : isMidScreen
                                ? `${(15 * 4) / 7}px`
                                : '15px',
                        mb: 3,
                        fontWeight: 100,
                        width: isSmallScreen ? '100%' : 'auto',
                    }}
                >
                    <Suspense fallback={<div>Loading animation...</div>}>
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
                    <CustomButton text="Shop collection" />
                </Suspense>
            </Box>


        </Box>
    );
};

export default Poster;
