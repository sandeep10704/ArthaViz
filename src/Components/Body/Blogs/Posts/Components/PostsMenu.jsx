import React from "react";
import { Box, Grid, Typography, Pagination, Select, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../../../../CommonComponents/PostCard";
import ColorPalette from "../../../../../Assets/ColorPalette";
import { setPage } from "../../../../../store/postsSlice";


const PostsMenu = () => {
  const dispatch = useDispatch();
  const {
    currentPosts,
    filteredPosts,
    pagination: { currentPage, pageCount, itemsPerPage },
  } = useSelector((state) => state.posts);

  const handleChangePage = (event, value) => {
    dispatch(setPage(value));
  };

  const total = filteredPosts.length;
  const startIndex = total === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, total);

  return (
    <Box sx={{ padding: "0 0 0 20px", maxWidth: "1000px", margin: "0 auto" }}>

      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <Typography variant="h6" sx={{ fontFamily: "Outfit", fontWeight: 200 }}>
          Showing {total === 0 ? 0 : startIndex}-{endIndex} of {total} results
        </Typography>
        <Select defaultValue="default" size="small" sx={{ fontFamily: "Outfit", fontWeight: 200 }}>
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="TOP">TOP</MenuItem>
          <MenuItem value="New to Old">New to Old</MenuItem>
          <MenuItem value="Old to New">Old to New</MenuItem>
        </Select>
      </Box>


      <Box sx={{ padding: { sm: "0 100px 0 0", md: "0 40px" } }}>
        <Grid container spacing={2}>
          {currentPosts.map((post) => (
            <Grid item xs={12} sm={6} md={3} key={post.id}>
              <PostCard data={post} />
            </Grid>
          ))}
        </Grid>
      </Box>

    
      {pageCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px", padding: "10px" }}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handleChangePage}
            sx={{
              '& .Mui-selected': {
                backgroundColor: ColorPalette.orange,
                color: 'white',
                '&:hover': {
                  backgroundColor: ColorPalette.orange,
                  opacity: 0.8,
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default PostsMenu;
