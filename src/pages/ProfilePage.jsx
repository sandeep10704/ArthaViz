import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Paper, CircularProgress, Alert, Stack } from '@mui/material';
import { fetchUserProfile, updateUserProfile } from '../store/authSlice'; // Adjust path if needed
import ProfileHeader from './ProfileHeader';
import ProfileForm from './ProfileForm';
// For notifications, you can use a library like 'react-hot-toast'
// import toast, { Toaster } from 'react-hot-toast';

// Initial state for the form to easily reset it
const initialFormData = {
  fullName: "",
  nickName: "",
  gender: "",
  language: "",
  timeZone: "",
  photoURL: "",
  phone: "",
  countryCode: "+91",
  country: null,
  state: null,
  city: null,
  zipCode: "",
  streetAddress: "",
  apartment: "",
};

function ProfilePage() {
  const dispatch = useDispatch();
  const { user, userProfile, status, error } = useSelector(state => state.auth);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [phoneError, setPhoneError] = useState("");

  // Fetches user profile when the component mounts or user changes
  useEffect(() => {
    if (user?.uid && status === 'idle') {
      dispatch(fetchUserProfile(user.uid));
    }
  }, [user, status, dispatch]);

  // Populates form with user profile data once it's loaded
  const resetForm = useCallback(() => {
    if (userProfile) {
      setFormData({
        fullName: userProfile.fullName || "",
        nickName: userProfile.nickName || "",
        gender: userProfile.gender || "",
        language: userProfile.language || "",
        timeZone: userProfile.timeZone || "",
        photoURL: userProfile.photoURL || "",
        phone: userProfile.phone || "",
        countryCode: userProfile.countryCode || "+91",
        country: userProfile.country || null,
        state: userProfile.state || null,
        city: userProfile.city || null,
        zipCode: userProfile.zipCode || "",
        streetAddress: userProfile.streetAddress || "",
        apartment: userProfile.apartment || "",
      });
    }
  }, [userProfile]);

  useEffect(() => {
    resetForm();
  }, [userProfile, resetForm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileImageUpload = (url) => {
    setFormData(prev => ({ ...prev, photoURL: url }));
  };

  const validatePhone = () => {
    if (formData.phone && !/^\d{7,15}$/.test(formData.phone)) {
      setPhoneError("Enter a valid phone number (7-15 digits).");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleSave = async () => {
    if (!validatePhone()) return;

    if (user?.uid) {
        // const loadingToast = toast.loading('Saving profile...');
        try {
            await dispatch(updateUserProfile({ uid: user.uid, data: formData })).unwrap();
            // toast.success('Profile updated successfully!', { id: loadingToast });
            setEditMode(false);
        } catch (err) {
            // toast.error(`Failed to save: ${err.message}`, { id: loadingToast });
            console.error("Failed to update profile:", err);
        }
    }
  };
  
  const handleCancel = () => {
    resetForm(); // Reset form changes
    setEditMode(false);
  };

  if (status === 'loading' || status === 'idle') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">Error loading profile: {error}</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{  minHeight: '100vh', py: 5 }}>
      {/* <Toaster position="top-center" /> */}
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: '12px' }}>
          <Stack spacing={4}>
            <ProfileHeader
              user={user}
              userProfile={userProfile}
              formData={formData}
              editMode={editMode}
              onEdit={() => setEditMode(true)}
              onSave={handleSave}
              onCancel={handleCancel}
              isSaving={status === 'updating'}
            />
            <ProfileForm
              formData={formData}
              editMode={editMode}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
              onImageUpload={handleProfileImageUpload}
              phoneError={phoneError}
            />
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default ProfilePage;