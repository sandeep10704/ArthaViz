import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Chip, Grid, Paper, IconButton, Tabs, Tab,
  Avatar, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useSelector, useDispatch } from 'react-redux';
import ColorPalette from '../Assets/ColorPalette'; // Assuming this file exists for your theme
import {
  setArticleDataField,
  setField,
  addComment,
  setCommentInput,
  addArrayItem,
  removeArrayItem,
  setTab,
  resetForm,
  postBlog,
  setBlogImageFile,
  removeBlogImageFile,
  uploadBlogImages,
  setResponsiveSectionField,
  updateNestedArray
} from '../store/addBlogSlice'; // Ensure all actions are imported

// Helper component to render tab content
const TabPanel = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`blog-tabpanel-${index}`}
    aria-labelledby={`blog-tab-${index}`}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

// Reusable Image Uploader Component
const ImageUploader = ({ title, imageFile, onFileSelect, onFileRemove }) => (
    <Box>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>{title}</Typography>
        {imageFile ? (
            <Paper elevation={2} sx={{ position: 'relative', borderRadius: 1.5, overflow: 'hidden', width: 'fit-content' }}>
                <img src={imageFile.previewUrl} alt="Preview" style={{ maxWidth: '250px', display: 'block' }} />
                <IconButton
                    size="small"
                    onClick={onFileRemove}
                    sx={{ position: 'absolute', top: 6, right: 6, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'white' } }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Paper>
        ) : (
            <label>
                <input accept="image/*" style={{ display: 'none' }} type="file" onChange={onFileSelect} />
                <Box sx={{ height: 150, width: 250, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed', borderColor: 'divider', borderRadius: 1.5, cursor: 'pointer', color: 'text.secondary', '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' }}}>
                    <CloudUploadIcon sx={{ mb: 1 }} />
                    <Typography variant="button">Upload Image</Typography>
                </Box>
            </label>
        )}
    </Box>
);

// Component for predefined array inputs (Tags, Categories)
const ArrayInputSection = ({ title, arrayKey, options, onAdd, onRemove }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const { formData } = useSelector(state => state.blog);
    const handleAdd = () => {
        if (selectedValue) {
            onAdd(arrayKey, selectedValue);
            setSelectedValue('');
        }
    };
    const availableOptions = options.filter(opt => !formData[arrayKey].includes(opt));
    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>{title}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <FormControl fullWidth sx={{ mr: 1 }} size="small">
                    <InputLabel>{`Select ${title.slice(0, -1)}`}</InputLabel>
                    <Select value={selectedValue} label={`Select ${title.slice(0, -1)}`} onChange={(e) => setSelectedValue(e.target.value)}>
                        {availableOptions.length === 0 ? ( <MenuItem value="" disabled>All options added</MenuItem> ) : ( availableOptions.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>) )}
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleAdd} startIcon={<AddIcon />} disabled={!selectedValue}>Add</Button>
            </Box>
            <Paper variant="outlined" sx={{ p: 1, display: 'flex', flexWrap: 'wrap', gap: 1, minHeight: '48px', backgroundColor: 'action.hover' }}>
                {formData[arrayKey].map((item) => ( <Chip key={item} label={item} onDelete={() => onRemove(arrayKey, item)} color="primary" /> ))}
            </Paper>
        </Box>
    );
};

// Component for free-form text array inputs
const FreeformArrayInput = ({ title, arrayData, onAdd, onRemove, isParagraph = false }) => {
    const [inputValue, setInputValue] = useState('');
    const handleAdd = () => {
        if (inputValue.trim()) {
            onAdd(inputValue.trim());
            setInputValue('');
        }
    };
    return (
        <Box>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>{title}</Typography>
            <Box sx={{ display: 'flex', alignItems: isParagraph ? 'flex-start' : 'center', mb: 1, gap: 1 }}>
                <TextField
                    label={`Add a new ${title.slice(0, -1).toLowerCase()}`}
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline={isParagraph}
                    rows={isParagraph ? 3 : 1}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => { if (e.key === 'Enter' && !isParagraph && !e.shiftKey) { e.preventDefault(); handleAdd(); } }}
                />
                <Button variant="contained" onClick={handleAdd} startIcon={<AddIcon />} sx={{ height: 'fit-content' }}>Add</Button>
            </Box>
            <Paper variant="outlined" sx={{ p: 1, display: 'flex', flexWrap: 'wrap', gap: 1, minHeight: '48px', backgroundColor: 'action.hover' }}>
                {arrayData?.length > 0 ? arrayData.map((item, index) => (
                    <Chip key={index} label={item} onDelete={() => onRemove(item)} color="secondary" sx={{ height: 'auto', '& .MuiChip-label': { display: 'block', whiteSpace: 'normal', padding: '8px' } }} />
                )) : <Typography sx={{ p: 1, color: 'text.secondary', fontStyle: 'italic' }}>No items added.</Typography>}
            </Paper>
        </Box>
    );
};

const PREDEFINED_ATTRIBUTES = {
    categories: ['Tech', 'Tips', 'Gadgets', 'DIY', 'Reviews'],
    socialLinks: ['Twitter', 'Pinterest', 'Facebook', 'Instagram', 'LinkedIn'],
    tags: ['Apps', 'Mobile', 'Web', 'Design', 'Development'],
};

// Main Component
const AddBlogPage = () => {
    const dispatch = useDispatch();
    const { formData, commentInput, currentTab, loading, imageFiles } = useSelector(state => state.blog);

    // --- Handlers ---
    const handleFieldChange = (e) => dispatch(setField({ name: e.target.name, value: e.target.value }));
    const handleArticleDataChange = (e) => dispatch(setArticleDataField({ name: e.target.name, value: e.target.value }));
    const handleResponsiveSectionChange = (e) => dispatch(setResponsiveSectionField({ name: e.target.name, value: e.target.value }));
    const handleCommentInputChange = (e) => dispatch(setCommentInput({ [e.target.name]: e.target.value }));
    const handleAddComment = () => dispatch(addComment());
    const handleTabChange = (event, newValue) => dispatch(setTab(newValue));
    const handleFileSelect = (key, e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            dispatch(setBlogImageFile({ key, file, previewUrl }));
        }
        e.target.value = null;
    };
    const handleImageRemove = (key) => dispatch(removeBlogImageFile(key));
    const handleSubmit = async () => {
        try {
            const uploadedUrls = await dispatch(uploadBlogImages(imageFiles)).unwrap();
            const finalBlogData = { ...formData, articleData: { ...formData.articleData, headerImage: uploadedUrls.headerImageUrl || formData.articleData.headerImage, responsiveSection: { ...formData.articleData.responsiveSection, image: uploadedUrls.responsiveSectionImageUrl || formData.articleData.responsiveSection.image, }, }, updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', }), };
            await dispatch(postBlog(finalBlogData)).unwrap();
            alert("Blog post created successfully! ✅");
            dispatch(resetForm());
        } catch (err) {
            console.error("Submission failed:", err);
            alert("Error during submission ❌");
        }
    };

    return (
        <Box sx={{ maxWidth: 1400, width: "auto", mx: 'auto', my: 4 }}>
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ p: 3, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                    <Typography variant="h4" component="h1" fontWeight="bold">✍️ Add a New Blog Post</Typography>
                </Box>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={currentTab} onChange={handleTabChange} centered>
                        <Tab label="Main Content" id="blog-tab-0" />
                        <Tab label="Metadata & Media" id="blog-tab-1" />
                        <Tab label="Comments" id="blog-tab-2" />
                    </Tabs>
                </Box>

                <TabPanel value={currentTab} index={0}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}><TextField label="Article Title" name="title" fullWidth required value={formData.articleData.title} onChange={handleArticleDataChange} /></Grid>
                        <Grid item xs={12}><TextField label="Main Content" name="content" multiline rows={10} fullWidth value={formData.articleData.content} onChange={handleArticleDataChange} /></Grid>
                        <Grid item xs={12}><FreeformArrayInput title="Gadgets List" arrayData={formData.articleData.gadgetsList} onAdd={(value) => dispatch(updateNestedArray({ path: ['articleData', 'gadgetsList'], value, type: 'add' }))} onRemove={(value) => dispatch(updateNestedArray({ path: ['articleData', 'gadgetsList'], value, type: 'remove' }))} /></Grid>
                        <Grid item xs={12}><FreeformArrayInput title="Bottom Paragraphs" isParagraph={true} arrayData={formData.articleData.bottomParagraphs} onAdd={(value) => dispatch(updateNestedArray({ path: ['articleData', 'bottomParagraphs'], value, type: 'add' }))} onRemove={(value) => dispatch(updateNestedArray({ path: ['articleData', 'bottomParagraphs'], value, type: 'remove' }))} /></Grid>
                        <Grid item xs={12} sm={6}><TextField label="Quote Text" name="text" multiline rows={3} fullWidth value={formData.articleData.quote.text} onChange={(e) => dispatch(setArticleDataField({ name: 'quote', value: { ...formData.articleData.quote, text: e.target.value } }))} /></Grid>
                        <Grid item xs={12} sm={6}><TextField label="Quote Author" name="author" fullWidth value={formData.articleData.quote.author} onChange={(e) => dispatch(setArticleDataField({ name: 'quote', value: { ...formData.articleData.quote, author: e.target.value } }))} /></Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value={currentTab} index={1}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6}><TextField label="Display Category (e.g., TECH)" name="category" fullWidth value={formData.articleData.category} onChange={handleArticleDataChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField label="Read Time (e.g., 5 min read)" name="readTime" fullWidth value={formData.articleData.readTime} onChange={handleArticleDataChange} /></Grid>
                        <Grid item xs={12} md={6}><ImageUploader title="Header Image" imageFile={imageFiles.headerImageFile} onFileSelect={(e) => handleFileSelect('headerImageFile', e)} onFileRemove={() => handleImageRemove('headerImageFile')}/></Grid>
                        <Grid item xs={12} md={6}><ImageUploader title="Responsive Section Image" imageFile={imageFiles.responsiveSectionImageFile} onFileSelect={(e) => handleFileSelect('responsiveSectionImageFile', e)} onFileRemove={() => handleImageRemove('responsiveSectionImageFile')}/></Grid>
                        <Grid item xs={12}><TextField label="Responsive Section Title" name="title" fullWidth value={formData.articleData.responsiveSection.title} onChange={handleResponsiveSectionChange} /></Grid>
                        <Grid item xs={12}><FreeformArrayInput title="Responsive Section Paragraphs" isParagraph={true} arrayData={formData.articleData.responsiveSection.paragraphs} onAdd={(value) => dispatch(updateNestedArray({ path: ['articleData', 'responsiveSection', 'paragraphs'], value, type: 'add' }))} onRemove={(value) => dispatch(updateNestedArray({ path: ['articleData', 'responsiveSection', 'paragraphs'], value, type: 'remove' }))} /></Grid>
                        <Grid item xs={12} sm={6}><ArrayInputSection title="Categories" arrayKey="categories" options={PREDEFINED_ATTRIBUTES.categories} onAdd={(key, value) => dispatch(addArrayItem({ key, value }))} onRemove={(key, value) => dispatch(removeArrayItem({ key, value }))}/></Grid>
                        <Grid item xs={12} sm={6}><ArrayInputSection title="Tags" arrayKey="tags" options={PREDEFINED_ATTRIBUTES.tags} onAdd={(key, value) => dispatch(addArrayItem({ key, value }))} onRemove={(key, value) => dispatch(removeArrayItem({ key, value }))}/></Grid>
                        <Grid item xs={12}><ArrayInputSection title="Social Links" arrayKey="socialLinks" options={PREDEFINED_ATTRIBUTES.socialLinks} onAdd={(key, value) => dispatch(addArrayItem({ key, value }))} onRemove={(key, value) => dispatch(removeArrayItem({ key, value }))}/></Grid>
                        <Grid item xs={12} sm={6}><TextField label="Previous Article Title" name="previousArticle" fullWidth value={formData.previousArticle} onChange={handleFieldChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField label="Next Article Title" name="nextArticle" fullWidth value={formData.nextArticle} onChange={handleFieldChange} /></Grid>
                    </Grid>
                </TabPanel>
                
                <TabPanel value={currentTab} index={2}>
                    <Typography variant="h6" gutterBottom>Add a Comment</Typography>
                    <Box sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={6} md={3}><TextField name="name" label="Commenter Name" fullWidth value={commentInput.name} onChange={handleCommentInputChange} /></Grid>
                            <Grid item xs={12} sm={6} md={3}><TextField name="date" label="Date" type="date" fullWidth value={commentInput.date} InputLabelProps={{ shrink: true }} onChange={handleCommentInputChange} /></Grid>
                            <Grid item xs={12} md={6}><TextField name="avatar" label="Avatar URL" fullWidth value={commentInput.avatar} onChange={handleCommentInputChange} /></Grid>
                            <Grid item xs={12}><TextField name="text" label="Comment Text" fullWidth multiline rows={2} value={commentInput.text} onChange={handleCommentInputChange} /></Grid>
                        </Grid>
                        <Button variant="contained" sx={{ mt: 2 }} onClick={handleAddComment}>Add Comment</Button>
                    </Box>
                    <Typography variant="h6" gutterBottom>Current Comments</Typography>
                    {formData.comments.length === 0 ? ( <Typography variant="body2" color="text.secondary">No comments added yet.</Typography> ) : (
                        <Grid container spacing={2}>
                            {formData.comments.map((comment, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar src={comment.avatar} alt={comment.name} />
                                        <Box>
                                            <Typography variant="subtitle2">{comment.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">{new Date(comment.date).toLocaleDateString()}</Typography>
                                            <Typography variant="body2" sx={{ mt: 1 }}>{comment.text}</Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </TabPanel>
                
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', borderTop: 1, borderColor: 'divider', bgcolor: 'action.hover' }}>
                    <LoadingButton variant="contained" size="large" onClick={handleSubmit} loading={loading} disabled={!formData.articleData.title}>
                        {loading ? 'Submitting...' : 'Submit Blog Post'}
                    </LoadingButton>
                </Box>
            </Paper>
        </Box>
    );
}

export default AddBlogPage;