import React, { useState } from 'react';
import axios from 'axios';
import { Button, Avatar } from '@mui/material';

const SingleImageUpload = ({ onUpload }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'shop_upload_preset');
    formData.append('public_id', fileNameWithoutExtension);

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dq7lkkucz/image/upload',
        formData
      );
      const url = res.data.secure_url;
      setImageUrl(url);
      console.log("Uploaded image URL:", url);

      // Pass the uploaded URL to parent if needed
      if (onUpload) onUpload(url);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
        id="single-image-upload"
      />
      <label htmlFor="single-image-upload">
        <Button variant="contained" component="span" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
      </label>

      {imageUrl && (
        <div style={{ marginTop: '10px' }}>
          <Avatar
            src={imageUrl}
            alt="Uploaded"
            sx={{ width: 80, height: 80, margin: 'auto' }}
          />
        </div>
      )}
    </div>
  );
};

export default SingleImageUpload;
