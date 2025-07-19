// SingleImageUpload.js

import React, { useState } from 'react';
import axios from 'axios';
import { Box, Stack, Button, Avatar, CircularProgress, Typography, Alert } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const SingleImageUpload = ({ value, onUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic file type validation
    if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        return;
    }

    setUploading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'shop_upload_preset'); // Replace with your preset

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dq7lkkucz/image/upload', // Replace with your Cloudinary URL
        formData
      );
      const url = res.data.secure_url;
      if (onUpload) {
        onUpload(url);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Box sx={{ position: 'relative' }}>
        <Avatar
          src={value}
          alt="Profile"
          sx={{
            width: 120,
            height: 120,
            border: '2px solid',
            borderColor: 'divider',
            opacity: uploading ? 0.5 : 1,
          }}
        >
          {/* Fallback Icon if no image */}
          <PhotoCamera sx={{ width: 60, height: 60, color: 'text.secondary' }} />
        </Avatar>
        {uploading && (
          <CircularProgress
            size={40}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-20px',
              marginLeft: '-20px',
            }}
          />
        )}
      </Box>

      <Button
        variant="outlined"
        component="label"
        disabled={uploading}
        startIcon={<PhotoCamera />}
      >
        {value ? 'Change Photo' : 'Upload Photo'}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          hidden
        />
      </Button>

      {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}
      
      <Typography variant="caption" color="text.secondary">
        JPG, PNG, or GIF. Max size of 5MB.
      </Typography>
    </Stack>
  );
};

export default SingleImageUpload;