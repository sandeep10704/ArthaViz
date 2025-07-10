import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import ImagesAssets from '../../../../Assets/ImagesAssets';
import ColorPalette from '../../../../Assets/ColorPalette';
import { cardHoverStyle, imageHoverBoxStyle } from '../../../../Assets/CommonCss';

const ItemsCard = ({ title, items }) => {

    const itemTextStyle = {
        fontFamily: 'Outfit',
        fontWeight: 200,
        fontSize: '17px',
        lineHeight: '100%',
        letterSpacing: '0.01em',
        textTransform: 'capitalize',
    };

    return (
        <Box
            sx={{
                width: '240px',
                height: '350px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '30px 10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                ...cardHoverStyle,
            }}
        >
            <Typography
                sx={{
                    fontFamily: 'Outfit',
                    fontWeight: 200,
                    fontSize: '22px',
                    lineHeight: '100%',
                    letterSpacing: '0.01em',
                    textTransform: 'uppercase',
                }}
            >
                {title}
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

            <Box
                sx={{
                    width: '100%',
                    maxWidth: '240px',
                    height: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',

                }}
            >
                {items.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <Box
                            sx={{
                                width: '225px', 
                                minHeight: '80px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                ...cardHoverStyle,
                            }}
                        >
                            <Box sx={{ ...imageHoverBoxStyle, }}>
                                <Box
                                    component="img"
                                    src={item.image}
                                    alt={`Image of ${item.name}`}
                                    sx={{
                                        width: '70px',
                                        height: '70px',
                                        borderRadius: '6px',
                                        objectFit: 'cover',
                                        display: 'block',

                                    }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    width: '100%',
                                    maxWidth: '200px',
                                    minHeight: '60px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    gap: '5px',
                                }}
                            >
                                <Typography sx={itemTextStyle}>
                                    {item.name}
                                </Typography>
                                <Typography sx={{ ...itemTextStyle, fontWeight: 300, color: ColorPalette.orange }}>
                                    {item.price}
                                </Typography>
                            </Box>
                        </Box>
                        {index !== items.length - 1 && (
                            <Divider orientation="horizontal" flexItem />
                        )}
                    </React.Fragment>
                ))}
            </Box>
        </Box>
    );
};

export default ItemsCard;
