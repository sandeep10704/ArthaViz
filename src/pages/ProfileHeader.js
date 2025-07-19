import React from 'react';
import { Avatar, Button, Typography, Stack, Box } from '@mui/material';

function ProfileHeader({ user, formData, editMode, onEdit, onSave, onCancel, isSaving }) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="space-between" alignItems="center">
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          alt={formData.fullName || "User"}
          src={formData.photoURL || "/default-avatar.png"}
          sx={{ width: 80, height: 80 }}
        />
        <Box>
          <Typography variant="h5" component="h1" fontWeight="bold">
            {formData.fullName || "User Profile"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" spacing={1}>
        {editMode ? (
          <>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" onClick={onSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={onEdit}>
            Edit Profile
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

export default ProfileHeader;