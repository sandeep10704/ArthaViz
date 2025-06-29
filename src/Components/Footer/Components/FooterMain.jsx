import { Box, Grid, Link, Typography } from "@mui/material";
import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const lines = [
  "Nisi, purus vitae, ultrices nunc.",
  "Sit ac sit suscipit hendrerit.",
  "Gravida massa volutpat aenean odio erat",
  "nullam fringilla."
];

const FooterMain = () => (
  <Box
    px={{ xs: 4, md: "190px" }}
    py={6}
    sx={{ backgroundColor: "#fff" }}
  >
    <Grid
      container
      spacing={8}
      justifyContent="space-between"
    >

      {/* Brand + Description + Social */}
      <Grid item xs={12} md={3}>
        <Typography
          sx={{
            fontFamily: "Outfit",
            fontSize: "31px",
            lineHeight: "100%",
            letterSpacing: "9%",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          SHOP
          <span style={{ fontWeight: 100 }}>
            LITE
          </span>
        </Typography>

        <Typography variant="body1" mt={2} sx={{ lineHeight: 1.5, fontWeight: 200 }}>
          {lines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Typography>

        <Box mt={3} display="flex" gap={2}>
          <FacebookIcon sx={{ color: "#f87171" }} />
          <InstagramIcon sx={{ color: "#d4d4d4" }} />
          <TwitterIcon sx={{ color: "#d4d4d4" }} />
          <LinkedInIcon sx={{ color: "#d4d4d4" }} />
          <YouTubeIcon sx={{ color: "#d4d4d4" }} />
        </Box>
      </Grid>

      {/* Quick Links */}
      <Grid item xs={12} md={2}>
        <Typography
          sx={{
            fontFamily: "Outfit",
            fontWeight: 200,
            fontSize: "16px",
            textTransform: "uppercase",
            letterSpacing: "10%",
            mb: 2,
          }}
        >
          QUICK LINKS
        </Typography>

        {["Home", "About", "Shop", "Blogs", "Contact"].map((link) => (
          <Typography
            key={link}
            sx={{
              fontFamily: "Outfit",
              fontWeight: 200,
              fontSize: "14px",
              textTransform: "uppercase",
              letterSpacing: "5%",
              mb: 1,
            }}
          >
            <Link href="#" underline="none" color="inherit">
              {link}
            </Link>
          </Typography>
        ))}
      </Grid>

      {/* Help & Info */}
      <Grid item xs={12} md={3}>
        <Typography
          sx={{
            fontFamily: "Outfit",
            fontWeight: 300,
            fontSize: "16px",
            textTransform: "uppercase",
            letterSpacing: "10%",
            mb: 2,
          }}
        >
          HELP & INFO
        </Typography>

        {["Track Your Order", "Returns Policies", "Shipping + Delivery", "Contact Us", "FAQs"].map((link) => (
          <Typography
            key={link}
            sx={{
              fontFamily: "Outfit",
              fontWeight: 200,
              fontSize: "14px",
              textTransform: "uppercase",
              letterSpacing: "5%",
              mb: 1,
            }}
          >
            <Link href="#" underline="none" color="inherit">
              {link}
            </Link>
          </Typography>
        ))}
      </Grid>

      {/* Contact */}
      <Grid item xs={12} md={3}>
        <Typography
          sx={{
            fontFamily: "Outfit",
            fontWeight: 200,
            fontSize: "16px",
            textTransform: "uppercase",
            letterSpacing: "10%",
            mb: 2,
          }}
        >
          CONTACT US
        </Typography>
        <Box>
          <Typography variant="body1" mt={1} sx={{ fontWeight: 200 }}>
            Do you have any queries <br /> or suggestions?
          </Typography>

          <Link href="mailto:yourinfo@gmail.com" underline="hover">
            yourinfo@gmail.com
          </Link>

          <Typography variant="body1" mt={2} sx={{ fontWeight: 200 }}>
            If you need support? Just <br /> give us a call.
          </Typography>

          <Link href="tel:+551112223344" underline="hover">
            +55 111 222 333 44
          </Link>
        </Box>
      </Grid>

    </Grid>
  </Box>
);

export default FooterMain;
