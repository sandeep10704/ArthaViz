import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Divider, Avatar } from '@mui/material';
import axios from 'axios';
import CustomButton from '../../../../CommonComponents/CustomButton';
import ColorPalette from '../../../../../Assets/ColorPalette';

const CommentForm = ({id}) => {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!name || !email || !comment || !imageUrl) {
      alert("Please fill all required fields and upload an image");
      return;
    }

    const today = new Date();
    const formattedDate = today.toLocaleString('en-US', { month: 'short', day: 'numeric' });

    const newComment = {
      name: name,
      date: formattedDate,
      text: comment,
      avatar: imageUrl
    };

    try {
      const response = await axios.post(`https://arthaserve-1.onrender.com/blogs/{id}/comments`, newComment, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("Comment posted:", response.data);
      // Clear form after posting
      setComment("");
      setName("");
      setEmail("");
      setImageUrl("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      <Divider sx={{ borderColor: ColorPalette.line }} />
      <Typography variant="h5" sx={{ mb: 2, mt: 2, fontFamily: "Outfit", fontWeight: 300, textTransform: "uppercase" }}>
        Leave a comment
      </Typography>

      <Typography variant="body2" sx={{ mb: 2, fontFamily: "Outfit", fontWeight: 200 }}>
        Your email address will not be published. Required fields are marked<span style={{ color: 'red' }}>*</span>
      </Typography>

      <Typography variant="body2" sx={{ fontFamily: "Outfit", fontWeight: 200 }}>Choose your Photo *</Typography>
      <Button
        variant="outlined"
        component="label"
        sx={{ mb: 2, color: '#ccc', borderColor: '#ccc', textTransform: "capitalize" }}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Choose your file"}
        <input type="file" hidden onChange={handleImageUpload} />
      </Button>

      {imageUrl && (
        <Avatar
          src={imageUrl}
          alt="Uploaded"
          sx={{ width: 80, height: 80, mb: 2 }}
        />
      )}

      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder="Write your comment here *"
        sx={{ mb: 2 }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
        <TextField
          placeholder="Write your name here *"
          sx={{ flex: 1, minWidth: '250px' }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          placeholder="Write your email here *"
          sx={{ flex: 1, minWidth: '250px' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
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
          <CustomButton text={"POST COMMENT"} onClick={handleSubmit} />
        </Box>
      </Box>
      <Divider sx={{ borderColor: ColorPalette.line }} />
    </Box>
  );
};

export default CommentForm;
