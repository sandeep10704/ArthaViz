import { useState } from "react";
import ImagesAssets from "../../../../../Assets/ImagesAssets";
import { Box, Grid, MenuItem, Pagination, Select, Typography } from "@mui/material";
import PostCard from "../../../../CommonComponents/PostCard"
import ColorPalette from "../../../../../Assets/ColorPalette";


const PostMenu = () => {
    // Placeholder data
    
  const products = [
  {
    id: 1,
    cardHeading: "Gadgets",
    textHeading: "5 Must-Have Gadgets for the Modern Home",
    text: "Dive into the world of cutting-edge technology with our latest blog post, where we highlight five essential gadgets every modern home should have. From smart assistants to home security systems, discover how these innovations can enhance your daily life and bring convenience to your fingertips.",
    image: ImagesAssets.Post01,
  },
  {
    id: 2,
    cardHeading: "Gadgets",
    textHeading: "5 Must-Have Gadgets for the Modern Home",
    text: "Dive into the world of cutting-edge technology with our latest blog post, where we highlight five essential gadgets every modern home should have. From smart assistants to home security systems, discover how these innovations can enhance your daily life and bring convenience to your fingertips.",
    image: ImagesAssets.Post01,
  },
  {
    id: 3,
    cardHeading: "Phones",
    textHeading: "Eco-Friendly Innovations Making a Difference",
    text: "Explore the intersection of technology and sustainability in our latest blog post. Learn about the innovative eco-friendly technologies revolutionizing various industries, from renewable energy solutions to recyclable electronics. Discover how these advancements are paving the way for a more sustainable future.",
    image: ImagesAssets.Post02,
  },
  {
    id: 4,
    cardHeading: "Tech",
    textHeading: "The Future of Wearable Tech: Trends to Watch",
    text: "Stay ahead of the curve with our insightful look into the rapidly evolving landscape of wearable technology. Explore the latest trends, from health monitoring devices to fashion-forward wearables, and learn how these advancements are shaping the future of personal technology.",
    image: ImagesAssets.Post03,
  },
  {
    id: 5,
    cardHeading: "Digital Watch",
    textHeading: "Top Apps and Tools for Remote Work",
    text: "In today's remote work environment, productivity is key. Discover the top apps and tools that can help you stay organized, focused, and efficient while working from home. From project management platforms to time-tracking apps, find out which tools are essential for maximizing your productivity.",
    image: ImagesAssets.Post04,
  },
  {
    id: 6,
    cardHeading: "Gadgets",
    textHeading: "5 Must-Have Gadgets for the Modern Home",
    text: "Dive into the world of cutting-edge technology with our latest blog post, where we highlight five essential gadgets every modern home should have. From smart assistants to home security systems, discover how these innovations can enhance your daily life and bring convenience to your fingertips.",
    image: ImagesAssets.Post01,
  },
  {
    id: 7,
    cardHeading: "Gadgets",
    textHeading: "5 Must-Have Gadgets for the Modern Home",
    text: "Dive into the world of cutting-edge technology with our latest blog post, where we highlight five essential gadgets every modern home should have. From smart assistants to home security systems, discover how these innovations can enhance your daily life and bring convenience to your fingertips.",
    image: ImagesAssets.Post01,
  },
  {
    id: 8,
    cardHeading: "Phones",
    textHeading: "Eco-Friendly Innovations Making a Difference",
    text: "Explore the intersection of technology and sustainability in our latest blog post. Learn about the innovative eco-friendly technologies revolutionizing various industries, from renewable energy solutions to recyclable electronics. Discover how these advancements are paving the way for a more sustainable future.",
    image: ImagesAssets.Post02,
  },
  {
    id: 9,
    cardHeading: "Tech",
    textHeading: "The Future of Wearable Tech: Trends to Watch",
    text: "Stay ahead of the curve with our insightful look into the rapidly evolving landscape of wearable technology. Explore the latest trends, from health monitoring devices to fashion-forward wearables, and learn how these advancements are shaping the future of personal technology.",
    image: ImagesAssets.Post03,
  },
  {
    id: 10,
    cardHeading: "Digital Watch",
    textHeading: "Top Apps and Tools for Remote Work",
    text: "In today's remote work environment, productivity is key. Discover the top apps and tools that can help you stay organized, focused, and efficient while working from home. From project management platforms to time-tracking apps, find out which tools are essential for maximizing your productivity.",
    image: ImagesAssets.Post04,
  },
  {
    id: 11,
    cardHeading: "Gadgets",
    textHeading: "5 Must-Have Gadgets for the Modern Home",
    text: "Dive into the world of cutting-edge technology with our latest blog post, where we highlight five essential gadgets every modern home should have. From smart assistants to home security systems, discover how these innovations can enhance your daily life and bring convenience to your fingertips.",
    image: ImagesAssets.Post01,
  },
  {
    id: 12,
    cardHeading: "Gadgets",
    textHeading: "5 Must-Have Gadgets for the Modern Home",
    text: "Dive into the world of cutting-edge technology with our latest blog post, where we highlight five essential gadgets every modern home should have. From smart assistants to home security systems, discover how these innovations can enhance your daily life and bring convenience to your fingertips.",
    image: ImagesAssets.Post01,
  },
  {
    id: 13,
    cardHeading: "Phones",
    textHeading: "Eco-Friendly Innovations Making a Difference",
    text: "Explore the intersection of technology and sustainability in our latest blog post. Learn about the innovative eco-friendly technologies revolutionizing various industries, from renewable energy solutions to recyclable electronics. Discover how these advancements are paving the way for a more sustainable future.",
    image: ImagesAssets.Post02,
  },
  {
    id: 14,
    cardHeading: "Tech",
    textHeading: "The Future of Wearable Tech: Trends to Watch",
    text: "Stay ahead of the curve with our insightful look into the rapidly evolving landscape of wearable technology. Explore the latest trends, from health monitoring devices to fashion-forward wearables, and learn how these advancements are shaping the future of personal technology.",
    image: ImagesAssets.Post03,
  },
  {
    id: 15,
    cardHeading: "Digital Watch",
    textHeading: "Top Apps and Tools for Remote Work",
    text: "In today's remote work environment, productivity is key. Discover the top apps and tools that can help you stay organized, focused, and efficient while working from home. From project management platforms to time-tracking apps, find out which tools are essential for maximizing your productivity.",
    image: ImagesAssets.Post04,
  },
  // Duplicate this 15-item pattern again to reach 30
  // Adding items 16-30 by repeating items 1-15 with updated ids
];

for (let i = 16; i <= 30; i++) {
  const baseItem = products[(i - 1) % 15];
  products.push({ ...baseItem, id: i });
}




    const itemsPerPage = 9;
    const [page, setPage] = useState(1);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, products.length);
    const currentProducts = products.slice(startIndex, endIndex);

    return (
        <Box sx={{ padding: '0 0 0 20px', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Top section with text and dropdown */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            >
                <Typography variant="h6" sx={{ fontFamily: "Outfit", fontWeight: 200 }}>
                    Showing {startIndex + 1}-{endIndex} of {products.length} results
                </Typography>
                <Select defaultValue="default" size="small" sx={{ fontFamily: "Outfit", fontWeight: 200 }}>
                    <MenuItem value="default" sx={{ fontFamily: "Outfit", fontWeight: 200 }}>Default</MenuItem>
                    <MenuItem value="TOP" sx={{ fontFamily: "Outfit", fontWeight: 200 }}>TOP</MenuItem>
                    <MenuItem value="New to Old" sx={{ fontFamily: "Outfit", fontWeight: 200 }}>New to Old</MenuItem>
                    <MenuItem value="Old to New" sx={{ fontFamily: "Outfit", fontWeight: 200 }}>Old to New</MenuItem>
                </Select>
            </Box>
            <Box sx={{ padding: { sm: "0 100px 0 0", md: "0 40px" } }}>
                {/* Grid of cards */}
                <Grid
                    container
                    spacing={2}
                >
                    {currentProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={3} key={product.id}>
                            <PostCard data={product} />
                        </Grid>
                    ))}
                </Grid>

            </Box>
            {/* Pagination below */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                    padding: '10px',
                    fontFamily: "Outfit",
                    fontWeight: 200
                }}
            >
                <Pagination
                    count={pageCount}
                    page={page}
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
        </Box>
    );
};

export default PostMenu;
