import React from 'react';
import {
  Box, TextField, Button, Typography, Chip, Grid, Paper, IconButton, Tabs, Tab,
  Avatar, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';
import ColorPalette from '../Assets/ColorPalette';
import {
  setProductField, setDescriptionField, addToArray, removeFromArray,
  addPoint, removePoint, setTempPoint, setReviewInput, addReview,
  addImageFile, removeImageFile, uploadImages, setTab, resetForm,
  postProduct
} from '../store/ProductAddSlice';

const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const PREDEFINED_ATTRIBUTES = {
  colors: ['Blue', 'Black', 'Orange', 'Green', 'White', 'Silver', 'Gold', 'Red'],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  category: ['Phone', 'Screen Touch', 'Electronics', 'Accessories', 'Gadgets'],
  tags: ['Classic', 'Modern', 'New Arrival', 'Best Seller', 'Sale'],
};

const AddProductPage = () => {
  const dispatch = useDispatch();
  const { formData, imageFiles, reviewInput, tempPoint, currentTab, loading } = useSelector(state => state.product);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    dispatch(setProductField({ name, value }));
  };

  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    dispatch(setDescriptionField({ name, value }));
  };

  const handleAddToArray = (key, value) => {
    if (!value) return;
    dispatch(addToArray({ key, value }));
  };

  const handleRemoveFromArray = (key, value) => {
    dispatch(removeFromArray({ key, value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && imageFiles.length < 5) {
      const previewUrl = URL.createObjectURL(file);
      dispatch(addImageFile({ file, previewUrl }));
    }
  };

  const handleImageRemove = (previewUrl) => {
    URL.revokeObjectURL(previewUrl);
    dispatch(removeImageFile(previewUrl));
  };
  const handleTabChange = (event, newValue) => {
    dispatch(setTab(newValue));
  };

  const handleTempPointChange = (e) => {
    dispatch(setTempPoint(e.target.value));
  };

  const handleAddPoint = () => {
    dispatch(addPoint());
  };

  const handleRemovePoint = (point) => {
    dispatch(removePoint(point));
  };

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setReviewInput({ [name]: value }));
  };

  const handleAddReview = () => {
    dispatch(addReview());
  };


  const handleSubmit = async () => {
    try {
      const uploadedUrls = await dispatch(uploadImages(imageFiles)).unwrap();
      const finalProductData = {
        product: {
          ...formData.product,
          images: uploadedUrls,
        },
        productDescription: formData.productDescription,
        reviews: formData.reviews,
      };
      await dispatch(postProduct(finalProductData)).unwrap();
      alert("Product created successfully!");
      dispatch(resetForm());
    } catch (err) {
      console.error(err);
      alert("Error during submission");
    }
  };



  const orangeButtonStyle = {
    backgroundColor: `${ColorPalette.orange} !important`,
    color: `#fff !important`,
    fontWeight: 600,
    '&:hover': {
      backgroundColor: `${ColorPalette.orangeDark || ColorPalette.orange} !important`,
      opacity: 0.9,
    },
    mt: 1,
  };

  const ArrayInputSection = ({ title, arrayKey, options }) => {
    const [selectedValue, setSelectedValue] = React.useState('');
    const handleAdd = () => {
      handleAddToArray(arrayKey, selectedValue);
      setSelectedValue('');
    };
    const availableOptions = options.filter(opt => !formData.product[arrayKey].includes(opt));
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>{title}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <FormControl fullWidth sx={{ mr: 1 }} size="small">
            <InputLabel>{`Select ${title.slice(0, -1)}`}</InputLabel>
            <Select value={selectedValue} label={`Select ${title.slice(0, -1)}`} onChange={(e) => setSelectedValue(e.target.value)}>
              {availableOptions.length === 0 ? (
                <MenuItem value="" disabled>All options added</MenuItem>
              ) : (
                availableOptions.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)
              )}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleAdd} startIcon={<AddIcon />} disabled={!selectedValue} sx={orangeButtonStyle}>Add</Button>
        </Box>
        <Paper variant="outlined" sx={{ p: 1, display: 'flex', flexWrap: 'wrap', gap: 1, minHeight: '48px', backgroundColor: 'action.hover' }}>
          {formData.product[arrayKey].map((item) => (
            <Chip key={item} label={item} onDelete={() => handleRemoveFromArray(arrayKey, item)} color="primary" />
          ))}
        </Paper>
      </Box>
    );
  };
  return (
    <Box sx={{ maxWidth: 1400, width: "auto", mx: 'auto', my: 4 }}>
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 3, bgcolor: ColorPalette.orange, color: 'primary.contrastText' }}>
          <Typography variant="h4" component="h1" fontWeight="bold">✨ Add a New Product</Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={handleTabChange} centered>
            <Tab label="Basic Info" />
            <Tab label="Attributes" />
            <Tab label="Description Details" />
            <Tab label="Media" />
            <Tab label="Reviews" />
          </Tabs>
        </Box>

        {/* --- Basic Info --- */}
        <TabPanel value={currentTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}><TextField label="Product Name" name="name" fullWidth required value={formData.product.name} onChange={handleProductChange} /></Grid>
            <Grid item xs={12} sm={4}><TextField label="Brand" name="brand" fullWidth value={formData.product.brand} onChange={handleProductChange} /></Grid>
            <Grid item xs={12}><TextField label="Short Description" name="description" multiline rows={4} fullWidth value={formData.product.description} onChange={handleProductChange} /></Grid>
            <Grid item xs={12} sm={3}><TextField label="Price ($)" name="price" type="number" fullWidth required value={formData.product.price} onChange={handleProductChange} /></Grid>
            <Grid item xs={12} sm={3}><TextField label="Stock Quantity" name="stock" type="number" fullWidth required value={formData.product.stock} onChange={handleProductChange} /></Grid>
            <Grid item xs={12} sm={3}><TextField label="Rating" name="rating" type="number" fullWidth value={formData.product.rating} onChange={handleProductChange} /></Grid>
            <Grid item xs={12} sm={3}><TextField label="SKU" name="sku" fullWidth value={formData.product.sku} onChange={handleProductChange} /></Grid>
          </Grid>
        </TabPanel>

        {/* --- Attributes --- */}
        <TabPanel value={currentTab} index={1}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}><ArrayInputSection title="Colors" arrayKey="colors" options={PREDEFINED_ATTRIBUTES.colors} /></Grid>
            <Grid item xs={12} sm={6}><ArrayInputSection title="Sizes" arrayKey="sizes" options={PREDEFINED_ATTRIBUTES.sizes} /></Grid>
            <Grid item xs={12} sm={6}><ArrayInputSection title="Categories" arrayKey="category" options={PREDEFINED_ATTRIBUTES.category} /></Grid>
            <Grid item xs={12} sm={6}><ArrayInputSection title="Tags" arrayKey="tags" options={PREDEFINED_ATTRIBUTES.tags} /></Grid>
          </Grid>
        </TabPanel>

        {/* --- Description --- */}
        <TabPanel value={currentTab} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}><TextField label="Description Title" name="title" fullWidth value={formData.productDescription.title} onChange={handleDescriptionChange} /></Grid>
            <Grid item xs={12}><TextField label="Top Text" name="topText" multiline rows={2} fullWidth value={formData.productDescription.topText} onChange={handleDescriptionChange} /></Grid>
            <Grid item xs={12}>
              <Box>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>Feature Points</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TextField label="Add a feature point" variant="outlined" size="small" value={tempPoint} onChange={handleTempPointChange} onKeyPress={(e) => e.key === 'Enter' && handleAddPoint()} sx={{ flexGrow: 1, mr: 1 }} />
                  <Button variant="contained" onClick={handleAddPoint} startIcon={<AddIcon />} sx={orangeButtonStyle}>Add</Button>
                </Box>
                <Paper variant="outlined" sx={{ p: 1, display: 'flex', flexWrap: 'wrap', gap: 1, minHeight: '48px', backgroundColor: 'action.hover' }}>
                  {formData.productDescription.points.map((point) => (
                    <Chip key={point} label={point} onDelete={() => handleRemovePoint(point)} color="secondary" />
                  ))}
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12}><TextField label="Bottom Text" name="bottomText" multiline rows={2} fullWidth value={formData.productDescription.bottomText} onChange={handleDescriptionChange} /></Grid>
          </Grid>
        </TabPanel>

        {/* --- Media Upload --- */}
        <TabPanel value={currentTab} index={3}>
          <Typography variant="h6" gutterBottom>Product Images</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Upload up to 5 images. The first is the cover image.</Typography>
          <Grid container spacing={2}>
            {imageFiles.map((image, index) => (
              <Grid item xs={6} sm={4} md={12 / 5} key={image.previewUrl}>
                <Paper elevation={2} sx={{ position: 'relative', borderRadius: 1.5, overflow: 'hidden', }}>
                  <img
                    src={image.previewUrl}
                    alt={`Preview ${index + 1}`}
                    style={{
                      maxWidth: '200px',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                  />


                  <IconButton size="small" onClick={() => handleImageRemove(image.previewUrl)} sx={{ position: 'absolute', top: 6, right: 6, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'white' } }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Paper>
              </Grid>
            ))}
            {imageFiles.length < 5 && (
              <Grid item xs={6} sm={4} md={12 / 5}>
                <input accept="image/*" style={{ display: 'none' }} id="file-upload-input" type="file" onChange={handleFileSelect} />
                <label htmlFor="file-upload-input">
                  <Box sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed',
                    borderColor: 'divider',
                    borderRadius: 1.5,
                    aspectRatio: '1 / 1',
                    cursor: 'pointer',
                    color: 'text.secondary',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'action.hover'
                    }
                  }}>
                    <CloudUploadIcon sx={{ mb: 1 }} />
                    <Typography variant="button">Upload Image</Typography>
                  </Box>
                </label>
              </Grid>
            )}
          </Grid>
        </TabPanel>

        {/* --- Reviews --- */}
        <TabPanel value={currentTab} index={4}>
          <Typography variant="h6" gutterBottom>Product Reviews</Typography>
          <Box sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={3}><TextField name="name" label="Reviewer Name" fullWidth value={reviewInput.name} onChange={handleReviewInputChange} /></Grid>
              <Grid item xs={12} sm={6} md={3}><TextField name="date" label="Date" type="date" fullWidth value={reviewInput.date} InputLabelProps={{ shrink: true }} onChange={handleReviewInputChange} /></Grid>
              <Grid item xs={12} md={6}><TextField name="image" label="Reviewer Image URL" fullWidth value={reviewInput.image} onChange={handleReviewInputChange} /></Grid>
              <Grid item xs={12}><TextField name="text" label="Review Text" fullWidth multiline rows={2} value={reviewInput.text} onChange={handleReviewInputChange} /></Grid>
            </Grid>
            <Button variant="contained" sx={{ ...orangeButtonStyle, mt: 2 }} onClick={handleAddReview}>Add Review</Button>
          </Box>

          {formData.reviews.length === 0 ? (
            <Typography variant="body2" color="text.secondary">No reviews added yet.</Typography>
          ) : (
            <Grid container spacing={2}>
              {formData.reviews.map((review, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar src={review.image} alt={review.name} sx={{ mr: 1.5 }} />
                    <Box>
                      <Typography variant="subtitle2">{review.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{review.date}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ pl: 2 }}>{review.text}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </TabPanel>

        {/* --- Submit Button --- */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', borderTop: 1, borderColor: 'divider', bgcolor: 'action.hover' }}>
          <LoadingButton
            variant="contained"
            size="large"
            onClick={handleSubmit}
            loading={loading}
            disabled={!formData.product.name || !formData.product.price || !formData.product.stock}
            sx={{ ...orangeButtonStyle, mt: 0 }}
          >
            {loading ? 'Submitting...' : 'Submit Product'}
          </LoadingButton>
        </Box>
      </Paper>
    </Box>
  );

}
export default AddProductPage;