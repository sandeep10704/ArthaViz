import React, { useMemo } from 'react';
import { TextField, Select, MenuItem, InputAdornment, Grid, FormControl, InputLabel, Typography, Divider, Box, Avatar, Stack } from '@mui/material';
import SingleImageUpload from '../Components/CommonComponents/SingleImageUpload';
import ReactSelect from 'react-select';
import { Country, State, City } from 'country-state-city';

// Move static options outside the component
const GENDERS = ["Male", "Female", "Other"];
const LANGUAGES = ["English", "Hindi", "Spanish", "French"];
const TIMEZONES = ["IST", "GMT", "EST", "PST"];

function ProfileForm({ formData, editMode, onInputChange, onSelectChange, onImageUpload, phoneError }) {
  // Memoize all country data to avoid recalculations
  const allCountryData = useMemo(() => Country.getAllCountries(), []);

  const countryOptions = useMemo(() => allCountryData.map(c => ({
    value: c.isoCode,
    label: c.name,
    phonecode: c.phonecode
  })), [allCountryData]);

  const countryCodeOptions = useMemo(() => allCountryData.map(c => ({
    label: `+${c.phonecode}`,
    value: `+${c.phonecode}`
  })), [allCountryData]);

  const stateOptions = useMemo(() => (
    formData.country ? State.getStatesOfCountry(formData.country.value).map(s => ({
      value: s.isoCode,
      label: s.name
    })) : []
  ), [formData.country]);

  const cityOptions = useMemo(() => (
    formData.country && formData.state ? City.getCitiesOfState(formData.country.value, formData.state.value).map(c => ({
      value: c.name,
      label: c.name
    })) : []
  ), [formData.country, formData.state]);

  const handleCountryChange = (selected) => {
    onSelectChange('country', selected);
    onSelectChange('state', null);
    onSelectChange('city', null);
    if (selected) {
      const countryData = allCountryData.find(c => c.isoCode === selected.value);
      if (countryData) {
        onSelectChange('countryCode', `+${countryData.phonecode}`);
      }
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off">
        {/* The main container is a Stack, which will arrange its direct children (the form sections) in a vertical column. */}
        <Stack spacing={4}>
            
            {/* === Section 1: Personal Information & Photo === */}
            <Stack spacing={2}>
                <Typography variant="h6">Personal Information</Typography>
                <Divider />

                {/* This nested Stack creates a responsive row. It's a column on mobile (xs) and a row on desktop (md). */}
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems={{ xs: 'center', md: 'flex-start' }}>
                
                    
                    {/* --- Image Uploader Column --- */}
                    <Box sx={{pt:4  }}>
                   

                        {editMode ? (
                            <SingleImageUpload value={formData.photoURL} onUpload={onImageUpload} />
                        ) : (
                            <Avatar
                                src={formData.photoURL}
                                sx={{ width: 120, height: 120 }}
                            />
                        )}
                         <Typography mt={2} mb={2} ml={1} mr={1}>Profile photo</Typography>
                    </Box>

                    {/* --- Form Fields Column --- */}
                    <Stack spacing={3} sx={{ width: '100%' }}>
                        <TextField
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={onInputChange}
                            disabled={!editMode}
                            fullWidth
                        />
                        <TextField
                            label="Nick Name"
                            name="nickName"
                            value={formData.nickName}
                            onChange={onInputChange}
                            disabled={!editMode}
                            fullWidth
                        />
                        <FormControl fullWidth>
                            <InputLabel id="gender-select-label">Gender</InputLabel>
                            <Select
                                labelId="gender-select-label"
                                name="gender"
                                value={formData.gender}
                                label="Gender"
                                onChange={onInputChange}
                                disabled={!editMode}
                            >
                                <MenuItem value=""><em>Select Gender</em></MenuItem>
                                {GENDERS.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Stack>
                </Stack>
            </Stack>

            {/* === Section 2: Contact Information === */}
            <Stack spacing={2}>
                <Typography variant="h6">Contact</Typography>
                <Divider />
                <TextField
                    label="Phone Number"
                    fullWidth
                    name="phone"
                    value={formData.phone}
                    onChange={onInputChange}
                    disabled={!editMode}
                    error={!!phoneError}
                    helperText={phoneError}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Select
                                    variant="standard"
                                    disableUnderline
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={onInputChange}
                                    disabled={!editMode}
                                    sx={{ mr: 1, minWidth: '80px' }}
                                >
                                    {countryCodeOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </InputAdornment>
                        )
                    }}
                />
            </Stack>

            {/* === Section 3: Address Information === */}
            <Stack spacing={2}>
                <Typography variant="h6">Address</Typography>
                <Divider />
                
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                    <Box sx={{ flex: 1 }}><ReactSelect placeholder="Select Country..." options={countryOptions} value={formData.country} onChange={handleCountryChange} isDisabled={!editMode} /></Box>
                    <Box sx={{ flex: 1 }}><ReactSelect placeholder="Select State..." options={stateOptions} value={formData.state} onChange={(val) => onSelectChange('state', val)} isDisabled={!editMode || !formData.country} /></Box>
                    <Box sx={{ flex: 1 }}><ReactSelect placeholder="Select City..." options={cityOptions} value={formData.city} onChange={(val) => onSelectChange('city', val)} isDisabled={!editMode || !formData.state} /></Box>
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                    <FormControl sx={{ flex: 2 }}>
                        <TextField name="streetAddress" value={formData.streetAddress} onChange={onInputChange} disabled={!editMode} label="Street Address" />
                    </FormControl>
                    <FormControl sx={{ flex: 1 }}>
                        <TextField name="apartment" value={formData.apartment} onChange={onInputChange} disabled={!editMode} label="Apartment, suite, etc." />
                    </FormControl>
                    <FormControl sx={{ flex: 1 }}>
                        <TextField name="zipCode" value={formData.zipCode} onChange={onInputChange} disabled={!editMode} label="ZIP Code" />
                    </FormControl>
                </Stack>
            </Stack>
            
            {/* === Section 4: Preferences === */}
            <Stack spacing={2}>
                <Typography variant="h6">Preferences</Typography>
                <Divider />
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                    <FormControl fullWidth sx={{ flex: 1 }}>
                        <InputLabel id="language-select-label">Language</InputLabel>
                        <Select
                            labelId="language-select-label"
                            name="language"
                            value={formData.language}
                            label="Language"
                            onChange={onInputChange}
                            disabled={!editMode}
                        >
                            <MenuItem value=""><em>Select Language</em></MenuItem>
                            {LANGUAGES.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ flex: 1 }}>
                        <InputLabel id="timezone-select-label">Time Zone</InputLabel>
                        <Select
                            labelId="timezone-select-label"
                            name="timeZone"
                            value={formData.timeZone}
                            label="Time Zone"
                            onChange={onInputChange}
                            disabled={!editMode}
                        >
                            <MenuItem value=""><em>Select Time Zone</em></MenuItem>
                            {TIMEZONES.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>
        </Stack>
    </Box>
);
}

export default ProfileForm;