import React, { useState } from 'react';
import axios from 'axios';

const MultiImageUpload = () => {
  const [imageUrls, setImageUrls] = useState([]);

  const handleImagesUpload = async (e) => {
    const files = e.target.files;
    const urls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'shop_upload_preset');
      formData.append('public_id', fileNameWithoutExtension); // ✅ set public_id to filename

      try {
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/dq7lkkucz/image/upload',
          formData
        );
        urls.push(res.data.secure_url);
      } catch (err) {
        console.error(err);
      }
    }

    setImageUrls(urls);
    console.log(urls);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleImagesUpload} />
      <div>
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index}`} width="200" />
        ))}
      </div>
    </div>
  );
};

export default MultiImageUpload;
