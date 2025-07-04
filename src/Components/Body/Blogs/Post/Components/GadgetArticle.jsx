import React from 'react';
import {
    Box,
    Typography,
    Divider,
    Card,
    CardMedia,
    List,
    ListItem,
    ListItemText,
    Grid,
    ListItemIcon,
} from '@mui/material';
import ImagesAssets from '../../../../../Assets/ImagesAssets';
import CommonCss from '../../../../../Assets/CommonCss';

const GadgetArticle = () => {
    return (
        <Box sx={{ mx: 'auto', p: 2, fontFamily: 'Outfit', fontWeight: 200 }}>
            {/* Header Image */}
            <CardMedia
                component="img"
                image={ImagesAssets.Selling01}
                alt="Tablet"
                sx={{ width: '100%', borderRadius: 2 }}
            />

            <Typography variant="caption" color="error" sx={{ mt: 2, display: 'block' }}>
                TECH • GADGETS
            </Typography>

            <Typography variant="h4" sx={{ mt: 1, fontWeight: 600 }}>
                5 Must-Have Gadgets for the Modern Home
            </Typography>

            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', fontFamily: 'Outfit', fontWeight: 200 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consectetur facilisis vivamus massa magna. Blandit mauris libero condimentum commodo morbi consectetur sociis convallis sit. Magna diam amet justo sed vel dolor et volutpat integer. Iaculis sit sapien hac odio elementum egestas neque. Adipiscing purus euismod orci sem amet, et. Turpis erat ornare nisi laoreet est euismod.
                Sit suscipit tortor turpis sed fringilla lectus facilisis amet. Ipsum, amet dolor curabitur non aliquet orci urna volutpat. Id aliquam neque, ut vivamus sit imperdiet enim, lacus, vel. Morbi arcu amet, nulla fermentum vitae mattis arcu mi convallis. Urna in sollicitudin in vestibulum erat. Turpis faucibus augue ipsum, at aliquam. Cras sagittis tellus nunc integer vitae neque bibendum eget. Tempus malesuada et pellentesque maecenas. Sociis porttitor elit tincidunt tellus sit ornare. Purus ut quis sed venenatis eget ut ipsum, enim lacus. Praesent imperdiet vitae eu, eu tincidunt nunc integer sit.
            </Typography>

            {/* Quotation Block */}
            <Box sx={{ bgcolor: '#f5f5f5', p: 2, my: 3, borderLeft: '4px solid #ccc', fontFamily: 'Outfit', fontWeight: 200 }}>
                <Typography variant="body1" fontStyle="italic">
                    "Sit suscipit tortor turpis sed fringilla lectus facilisis amet. Ipsum, amet dolor curabitur non aliquet
                    orci urna volutpat. Id aliquam neque, ut vivamus sit imperdiet enim, lacus, vel."
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', mt: 1, fontFamily: 'Outfit', fontWeight: 200 }}>
                    — ST. JOHN DOE
                </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Gadget Item Section */}
            <Box>
                {/* Heading and Bullet Points */}
                <Typography variant="h5" sx={{ fontWeight: 300, mb: 2, fontFamily: 'Outfit', }}>
                    IS THIS GREAT?
                </Typography>
                <List>
                    <ListItem disablePadding>
                        <ListItemIcon sx={{ minWidth: "24px" }}>
                            <Typography variant="body1" component="span" sx={{ fontFamily: 'Outfit', fontWeight: 200 }
                            }>•</Typography>
                        </ListItemIcon>
                        <ListItemText primary="Blandit mauris libero condimentum commodo sociis convallis sit." />
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemIcon sx={{ minWidth: "24px" }}>
                            <Typography variant="body1" component="span" sx={{ fontFamily: 'Outfit', fontWeight: 200 }}>•</Typography>
                        </ListItemIcon>
                        <ListItemText primary="Magna diam amet justo sed vel dolor et volutpat integer." />
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemIcon sx={{ minWidth: "24px" }}>
                            <Typography variant="body1" component="span" sx={{ fontFamily: 'Outfit', fontWeight: 200 }}>•</Typography>
                        </ListItemIcon>
                        <ListItemText primary="Laculis sit sapien hac odio elementum egestas neque." />
                    </ListItem>
                </List>

                <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Outfit', fontWeight: 200 }}>
                    Morbi arcu amet, nulla fermentum vitae mattis arcu mi convallis. Urna in sollicitudin in vestibulum erat. Turpis faucibus augue ipsum, at aliquam. Cras sagittis tellus nunc integer vitae neque bibendum eget. Tempus malesuada et pellentesque maecenas. Sociis porttitor elit tincidunt tellus sit ornare. Purus ut ipsum, enim lacus
                </Typography>
                <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Outfit', fontWeight: 200 }}>
                    Tortor diam dignissim amet, in interdum aliquet. Magnis dictum et eros purus fermentum, massa ullamcorper sit sollicitudin. Nascetur libero elementum adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc integer etiam. Mattis pulvinar non viverra donec pellentesque. Odio mi consequat libero dolor. Porta ut diam lobortis eget leo, lectus. Nunc tempus feugiat massa laoreet ultrices diam magna quam. Congue auctor auctor luctus neque. Enim lorem ultrices diam donec. Sed id placerat consectetur faucibus.
                </Typography>

                {/* Responsive Image + Text Side by Side on md+, stacked on sm/xs */}
                <Box
                    component="section"
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        gap: 4,
                        my: 4,
                    }}
                >
                    {/* Image Column */}
                    <Box sx={{ flex: { xs: '0 0 auto', md: '0 0 25%' }, width: '100%' }}>
                        <Card sx={{ borderRadius: 3, overflow: 'hidden', width: '100%' }}>
                            <CardMedia
                                component="img"
                                image={ImagesAssets.Insta01}
                                alt="Phone Camera"
                                sx={{
                                    width: '100%',
                                    height: 200,
                                    ...CommonCss.imageHoverBoxStyle,
                                }}
                            />
                        </Card>
                    </Box>

                    {/* Text Column */}
                    <Box sx={{ flex: { xs: '0 0 auto', md: '0 0 75%' }, display: "flex", flexDirection: "column", justifyContent: 'space-between', height: 200, minWidth: 0, }}>
                        <Typography variant="h6" gutterBottom>
                            VELIT, PRAESENT PHARETRA MALESUADA
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, fontFamily: 'Outfit', fontWeight: 200 }}>
                            Id pulvinar amet. Consequat potenti mollis massa iaculis et, dolor, eget lectus.
                            Aliquam pellentesque molestie felis fames sed eget non euismod eget.
                            Et eget ullamcorper urna, elit ac diam tellus viverra lacus.
                            Cras sagittis tellus nunc integer vitae neque bibendum eget.
                            Tempus malesuada et pellentesque maecenas.
                            Id pulvinar amet. Consequat potenti mollis massa iaculis et, dolor, eget lectus.
                            Aliquam pellentesque molestie felis fames sed eget non euismod eget.
                        </Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'Outfit', fontWeight: 200 }}>
                            Tortor diam dignissim amet, in interdum aliquet. Magnis dictum et eros purus
                            fermentum, massa ullamcorper sit sollicitudin. Nascetur libero elementum
                            adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc
                            integer etiam.
                            Aliquam pellentesque molestie felis fames sed eget non euismod eget.
                            Et eget ullamcorper urna, elit ac diam tellus viverra lacus.
                        </Typography>
                    </Box>
                </Box>

                {/* Bottom Paragraphs */}
                <Typography variant="body2" sx={{ mb: 2, fontFamily: 'Outfit', fontWeight: 200 }}>
                    Velit, praesent pharetra malesuada id pulvinar amet. Consequat potenti mollis massa iaculis et, dolor, eget lectus. Aliquam pellentesque molestie felis fames sed eget non euismod eget. Et eget ullamcorper urna, elit ac diam tellus viverra lacus.
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Outfit', fontWeight: 200 }}>
                    Tortor diam dignissim amet, in interdum aliquet. Magnis dictum et eros purus fermentum, massa ullamcorper sit sollicitudin. Nascetur libero elementum adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc integer etiam. Mattis pulvinar non viverra donec pellentesque. Odio mi consequat libero dolor. Porta ut diam lobortis eget leo, lectus.
                </Typography>
            </Box>

            {/* Footer */}
            <Typography variant="caption" color="text.secondary" sx={{ mt: 4, display: 'block', fontFamily: 'Outfit', fontWeight: 200 }}>
                Last Updated: Jul 3rd • 5 min read
            </Typography>
        </Box>
    );
};

export default GadgetArticle;
