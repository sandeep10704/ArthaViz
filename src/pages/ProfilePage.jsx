import React, { useEffect, useState } from 'react';
import { Avatar, Button, TextField, Select, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../store/authSlice';

function ProfilePage() {
  const dispatch = useDispatch();
  const { user, userProfile } = useSelector(state => state.auth);

  // Local states for form fields
  const [editMode, setEditMode] = useState(false);
  const [fullName, setFullName] = useState("");
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [timeZone, setTimeZone] = useState("");

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchUserProfile(user.uid));
    }
  }, [user, dispatch]);

  // Populate local state when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile.fullName || "");
      setNickName(userProfile.nickName || "");
      setGender(userProfile.gender || "");
      setCountry(userProfile.country || "");
      setLanguage(userProfile.language || "");
      setTimeZone(userProfile.timeZone || "");
    }
  }, [userProfile]);

  const handleSave = () => {
    if (user?.uid) {
      const updatedData = {
        fullName,
        nickName,
        gender,
        country,
        language,
        timeZone,
      };
      dispatch(updateUserProfile({ uid: user.uid, data: updatedData }));
      setEditMode(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '40px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    card: {
      background: 'white',
      borderRadius: '10px',
      padding: '30px',
      maxWidth: '900px',
      width: '100%',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    info: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    name: {
      margin: 0,
    },
    email: {
      margin: 0,
      color: 'gray',
      fontSize: '14px',
    },
    form: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginTop: '30px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      fontSize: '14px',
      marginBottom: '5px',
    },
    emailSection: {
      marginTop: '30px',
    },
    emailCard: {
      border: '1px solid #ddd',
      padding: '15px',
      borderRadius: '5px',
      marginBottom: '15px',
    },
    small: {
      color: 'gray',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.info}>
            <Avatar
              alt={fullName || "User"}
              src="https://via.placeholder.com/120"
              sx={{ width: 64, height: 64 }}
            />
            <div>
              <h3 style={styles.name}>{fullName || "Loading..."}</h3>
              <p style={styles.email}>{userProfile?.email || "Loading..."}</p>
            </div>
          </div>
          {editMode ? (
            <Button variant="contained" onClick={handleSave}>Save</Button>
          ) : (
            <Button variant="contained" onClick={() => setEditMode(true)}>Edit</Button>
          )}
        </div>

        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <TextField
              placeholder="Your Full Name"
              size="small"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={!editMode}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nick Name</label>
            <TextField
              placeholder="Your Nick Name"
              size="small"
              fullWidth
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              disabled={!editMode}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Gender</label>
            <Select
              size="small"
              fullWidth
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              disabled={!editMode}
            >
              <MenuItem value=""><em>Select Gender</em></MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Country</label>
            <Select
              size="small"
              fullWidth
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              disabled={!editMode}
            >
              <MenuItem value=""><em>Select Country</em></MenuItem>
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
            </Select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Language</label>
            <Select
              size="small"
              fullWidth
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={!editMode}
            >
              <MenuItem value=""><em>Select Language</em></MenuItem>
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Hindi">Hindi</MenuItem>
            </Select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Time Zone</label>
            <Select
              size="small"
              fullWidth
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
              disabled={!editMode}
            >
              <MenuItem value=""><em>Select Time Zone</em></MenuItem>
              <MenuItem value="IST">IST</MenuItem>
              <MenuItem value="GMT">GMT</MenuItem>
            </Select>
          </div>
        </div>

        <div style={styles.emailSection}>
          <h4>My Email Address</h4>
          <div style={styles.emailCard}>
            <p>{userProfile?.email || "Loading..."}</p>
            <small style={styles.small}>Last updated recently</small>
          </div>
          <Button variant="outlined">+ Add Email Address</Button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
