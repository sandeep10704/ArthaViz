import React, { Suspense, lazy } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoadingScreen from "./Components/CommonComponents/LoadingScreen";
import { Box } from "@mui/material";
import LatestPosts from "./Components/Footer/Components/LatestPosts";
import CustomersReviews from "./Components/Footer/Components/CustomersReviews";
import ScrollToTop from "./Components/CommonComponents/ScrollToTop";
import { useSelector } from "react-redux";
import Notification from "./Components/CommonComponents/Notification";

const HeaderLayout = lazy(() => import("./Components/Header/HeaderLayout"));
const FooterLayout = lazy(() => import("./Components/Footer/FooterLayout"));

const Layout = () => {
  const location = useLocation();
     const notification = useSelector(state => state.ui.notification);


  if (location.pathname === "/login") {
    return <> <Outlet />
    {notification &&
        <Notification type={notification.type} message={notification.message} />
      }</>;
  }
  if (location.pathname === "/signup") {
    return  <> <Outlet />
    {notification &&
        <Notification type={notification.type} message={notification.message} />
      }</>;
  }

  return (
    <>
     
      {/* <ScrollToTop /> */}
      
      <Suspense fallback={<LoadingScreen />}>
        <HeaderLayout />
      </Suspense>

      <Box
        component="main"
        sx={{
          paddingTop: { xs: '10px', sm: '80px', md: '100px' },
          px: { xs: '20px', sm: '30px', md: '5px' },
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
      
        <Outlet />
        <Box paddingBottom="40px">
          <CustomersReviews />
        </Box>
        <LatestPosts />
      </Box>

      <Suspense fallback={<LoadingScreen />}>
        <FooterLayout />
      </Suspense>
    </>
  );
};

export default Layout;
