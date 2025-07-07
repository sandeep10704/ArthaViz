import React from 'react';
import { Box, Typography, Avatar, Stack } from '@mui/material';

const CommentsSection = ({ comments }) => {
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
