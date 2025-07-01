import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import LoadingScreen from "./Components/CommonComponents/LoadingScreen";
import { Box } from "@mui/material";
import LatestPosts from "./Components/Footer/Components/LatestPosts";
import CustomersReviews from "./Components/Footer/Components/CustomersReviews";

const HeaderLayout = lazy(() => import("./Components/Header/HeaderLayout"));
const FooterLayout = lazy(() => import("./Components/Footer/FooterLayout"));

const Layout = () => {
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <HeaderLayout />
      </Suspense>

     <Box
  component="main"
  sx={{
    paddingTop: { xs: '10px', sm: '80px', md: '100px' },

    px: { xs: '10px', sm: '20px', md: '5px' },
    maxWidth: '1600px',
    margin: '0 auto',
  }}
>
  <Outlet />
  <CustomersReviews />
  <LatestPosts />
</Box>

      <Suspense fallback={<LoadingScreen />}>
        <FooterLayout />
      </Suspense>
    </>
  );
};

export default Layout;
