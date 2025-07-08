import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: { sm: 0, md: 2 },
                // background: '#f5f5f5' // optional global background
                backgroundColor: 'white',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    borderRadius: 6,
                    overflow: 'hidden',
                    boxShadow: 3,
                    maxWidth: 1400,
                    width: '100%',
                    p:5,
                    backgroundColor: 'white',
                }}
            >
                {/* Left Section (2/3) */}
                <Box
                    sx={{
                        flexBasis: { xs: '100%', md: '50%' },
                        flexGrow: 0,
                        flexShrink: 0,
                 
                        display: { xs: 'none', md: 'block' },
                        background: 'linear-gradient(to bottom, #ff7900, #ffa84c)',
                        color: 'white',
                        p: 5,
                        borderRadius: 6,
                    }}
                >
                    <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                        <Box>
                            <Typography variant="h2" fontWeight="bold" sx={{ mb: 2 }}>
                                <Box component="span" sx={{ display: 'inline', mr: 1 }}>
                                    Discover
                                </Box>
                                <Box component="span" sx={{ display: 'inline', fontWeight: 400, fontSize: '0.8em' }}>
                                    gadgets with our
                                </Box>
                            </Typography>

                            <Box component="span" sx={{ position: 'relative', display: 'inline-block', mt: 2, fontSize: 70, fontWeight: 400 }}>
                                <Box component="span">insights..</Box>
                                <Box
                                    component="span"
                                    sx={{
                                        position: 'absolute',
                                        bottom: -26,
                                        left: 0,
                                        width: '100%',
                                        height: 20,
                                        background: 'none',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <svg width="100%" height="35" viewBox="0 0 100 14" preserveAspectRatio="none">
                                        <path d="M0,10 Q40,-7 100,13" stroke="white" strokeWidth="3" fill="transparent" />
                                    </svg>
                                </Box>
                            </Box>

                            <Typography
                                variant="h5"
                                mt={10}
                                sx={{
                                    fontWeight: 300,
                                    fontStyle: 'italic',
                                    paddingLeft: '16px',
                                    color: 'white'
                                }}
                            >
                                Shop gadgets smarter with our honest tech insights.
                            </Typography>
                        </Box>

                        <Box display="flex" justifyContent="center" gap={3} mt={6}>
                            <img
                                src="https://res.cloudinary.com/dq7lkkucz/image/upload/v1751970200/login_ytd0r5.png"
                                alt="login"
                                style={{
                                    height: "350px",
                                    objectFit: "contain",
                                    transform: "rotate(-10deg)",
                                }}
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Right Section (1/3) */}
                <Box
                                    sx={{
                                        flexBasis: { xs: '100%', md: '33.33%' },
                                        flexGrow: 0,
                                        flexShrink: 0,
                                        p: { xs: 4 },
                                        '@media (min-width: 900px)': {
                                            pt: '6px',
                                            pr: '10px',
                                            pb: '6px',
                                            pl: '100px',
                                        },
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: "center",
                                        backgroundColor: 'white',
                                    }}
                                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 500,
                            letterSpacing: '2px',
                            cursor: 'pointer',
                            fontFamily: 'Outfit',
                            fontSize: '50px',
                            lineHeight: '100%',
                            textTransform: 'uppercase',
                            mb: 2
                        }}
                        onClick={() => navigate('/')}
                    >
                        SHOP<span style={{ fontWeight: 100 }}>LITE</span>
                    </Typography>

                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Welcome Back
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mb={3}>
                        Please login to your account
                    </Typography>

                    <TextField
                        fullWidth
                        label="Email address"
                        variant="outlined"
                        margin="normal"
                        InputProps={{ sx: { fontSize: '1.125rem' } }}
                        InputLabelProps={{ sx: { fontSize: '1.125rem' } }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        margin="normal"
                        InputProps={{
                            sx: { fontSize: '1.125rem' },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePassword} edge="end" sx={{ fontSize: '1.5rem' }}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        InputLabelProps={{ sx: { fontSize: '1.125rem' } }}
                    />

                    <Box textAlign="right" mb={3} width="100%">
                        <a href="#" style={{ color: 'grey', textDecoration: 'none', fontSize: '1.3125rem' }}>
                            Forgot password?
                        </a>
                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            bgcolor: '#ff7900',
                            color: 'white',
                            textTransform: 'none',
                            borderRadius: 3,
                            fontSize: '1.125rem',
                            py: 1.5,
                            mb: 4.5,
                            '&:hover': { bgcolor: '#e76f00' }
                        }}
                    >
                        Login
                    </Button>

                    <Divider sx={{ mb: 4.5, fontSize: '1.125rem' }}>Or Login with</Divider>

                    <Box
                        display="flex"
                        flexDirection={{ xs: 'column', md: 'row' }}
                        gap={3}
                        mb={4.5}
                        width="100%"
                        sx={{ borderColor: "#ff7900" }}
                    >
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<GoogleIcon sx={{ fontSize: '1.5rem' }} />}
                            sx={{
                                textTransform: 'none',
                                fontSize: '1.125rem',
                                py: 1.5,
                                color: "#ff7900",
                                borderColor: "#ff7900"
                            }}
                        >
                            Google
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<FacebookIcon sx={{ fontSize: '1.5rem' }} />}
                            sx={{
                                textTransform: 'none',
                                fontSize: '1.125rem',
                                py: 1.5,
                                color: "#ff7900",
                                borderColor: "#ff7900"
                            }}
                        >
                            Facebook
                        </Button>
                    </Box>

                    <Typography variant="body1" textAlign="center">
                        Already have an account?{' '}
                        <span
                            onClick={() => navigate('/signup')}
                            style={{ color: '#ff7900', textDecoration: 'none', fontSize: '1.125rem', cursor: 'pointer' }}
                        >
                            Signup
                        </span>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPage;
