import React from 'react';
import { Box, Typography, Avatar, Stack } from '@mui/material';

const comments = [
  {
    name: 'Sam Smith',
    date: 'Jul 10',
    text: 'Mattis pulvinar non viverra donec pellentesque. Odio mi consequat libero dolor. Porta ut diam lobortis eget leo, lectus. Tortor diam dignissim amet, in interdum aliquet. Nascetur libero elementum adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc integer etiam.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Santie Mary',
    date: 'Jul 10',
    text: 'Mattis pulvinar non viverra donec pellentesque. Odio mi consequat libero dolor. Porta ut diam lobortis eget leo, lectus. Tortor diam dignissim amet, in interdum aliquet. Nascetur libero elementum adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc integer etiam.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Analisa Nora',
    date: 'Jul 10',
    text: 'Mattis pulvinar non viverra donec pellentesque. Odio mi consequat libero dolor. Porta ut diam lobortis eget leo, lectus. Tortor diam dignissim amet, in interdum aliquet. Nascetur libero elementum adipiscing mauris maecenas et magna. Etiam nec, rutrum a diam lacus, nunc integer etiam.',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

const CommentsSection = () => {
  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {comments.length} COMMENTS
      </Typography>
      {comments.map((comment, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 2,
            p: 2,
            borderRadius: 2,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: '#f9f9f9',
              transform: 'translateX(80px)',
            },
          }}
        >
          <Avatar
            alt={comment.name}
            src={comment.avatar}
            sx={{ width: 64, height: 64 }}
          />
          <Box>
            <Stack direction="row" spacing={1}>
              <Typography variant="subtitle1" fontWeight="bold">
                {comment.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {comment.date}
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {comment.text}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1, color: 'red', cursor: 'pointer' }}
            >
              Reply Now
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CommentsSection;
