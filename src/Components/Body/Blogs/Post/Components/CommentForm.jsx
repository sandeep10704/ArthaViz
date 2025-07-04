import React from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Rating, Divider } from '@mui/material';
import CustomButton from '../../../../CommonComponents/CustomButton';
import ColorPalette from '../../../../../Assets/ColorPalette';

const CommentForm = () => {
    return (
        <Box sx={{ mx: 'auto', p: 2 }}>
        <Divider sx={{ borderColor: ColorPalette.line }} />
            <Typography variant="h5" sx={{ mb:2,mt:2,fontFamily: "Outfit", fontWeight: 300,textTransform:"uppercase" }}>
                Leave a comment
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 ,fontFamily: "Outfit", fontWeight: 200}}>
                Your email address will not be published. Required fields are marked<span style={{ color: 'red' }}>*</span>
            </Typography>
        
            {/* <Typography variant="body2" sx={{fontFamily: "Outfit", fontWeight: 200}}>Your rating <span style={{ color: 'red' }}>*</span></Typography>
            <Rating sx={{ mb: 2 }} /> */}
            <Typography variant="body2" sx={{fontFamily: "Outfit", fontWeight: 200}}>Choose your Photo</Typography>
            <Button
                variant="outlined"
                component="label"
                sx={{ mb: 2, color: '#ccc', borderColor: '#ccc', textTransform: "capitalize" }}
            >
                Choose your file
                <input type="file" hidden />
            </Button>


            <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Write your comment here *"
                sx={{ mb: 2 }}
            />

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
                <TextField
                    placeholder="Write your name here *"
                    sx={{ flex: 1, minWidth: '250px' }}
                />
                <TextField
                    placeholder="Write your email here *"
                    sx={{ flex: 1, minWidth: '250px' }}
                />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column",mb:4 }}>
                <FormControlLabel
                    control={<Checkbox />}
                    label={
                        <Typography sx={{ fontFamily: "Outfit", fontWeight: 200 }}>
                            Save my name, email, and website in this browser for the next time.
                        </Typography>
                    }
                    sx={{ mb: 2 }}
                />

                <Box width={"auto"}>
                    <CustomButton text={"POST COMMENT"} />
                </Box>
            </Box>
            <Divider sx={{ borderColor: ColorPalette.line }} />
        </Box>
    );
};

export default CommentForm;
