import React from "react";
import { Box, Grid, Typography, Pagination, Select, MenuItem, Zoom } from "@mui/material";
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
    <Box
      sx={{
        minHeight: "100vh", // ensures full viewport height
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: "1 0 auto",
          padding: "0 0 20px 20px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
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

        {/* Posts Grid */}
        <Box sx={{ padding: { sm: "0 100px 0 0", md: "0 40px" } }}>
          <Grid container spacing={2}>
            {currentPosts.length === 0 ? (
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "Outfit", fontWeight: 200, margin: "20px auto", textAlign: "center" }}
                >
                  No posts found.
                </Typography>
              </Grid>
            ) : (
              currentPosts.map((post, index) => (
                <Grid item xs={12} sm={6} md={3} key={post.id}>
                  <Zoom
                    in={true}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    <Box
                      sx={{
                        transition: "transform 0.3s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      <PostCard data={post} />
                    </Box>
                  </Zoom>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Box>

      {/* Pagination always at bottom */}
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
          padding: "10px",
          fontFamily: "Outfit",
          fontWeight: 200,
          backgroundColor: "#fff", // optional for clarity
        }}
      >
        <Pagination
          count={pageCount > 0 ? pageCount : 1}
          page={pageCount > 0 ? currentPage : 1}
          onChange={handleChangePage}
          disabled={pageCount <= 1}
          sx={{
            "& .Mui-selected": {
              backgroundColor: ColorPalette.orange,
              color: "white",
              "&:hover": {
                backgroundColor: ColorPalette.orange,
                opacity: 0.8,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PostsMenu;
