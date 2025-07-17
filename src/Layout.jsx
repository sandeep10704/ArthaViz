import React, { Suspense, lazy, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoadingScreen from "./Components/CommonComponents/LoadingScreen";
import { Box } from "@mui/material";
import LatestPosts from "./Components/Footer/Components/LatestPosts";
import CustomersReviews from "./Components/Footer/Components/CustomersReviews";
import ScrollToTop from "./Components/CommonComponents/ScrollToTop";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./Components/CommonComponents/Notification";
import { fetchUserCart } from "./store/cartSlice";
const HeaderLayout = lazy(() => import("./Components/Header/HeaderLayout"));
const FooterLayout = lazy(() => import("./Components/Footer/FooterLayout"));

const Layout = () => {
  const location = useLocation();
  const notification = useSelector(state => state.ui.notification);
  const { isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch(); 

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserCart());
    }
  }, [isLoggedIn, dispatch]);

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return (
      <>
        <Outlet />
        {notification && (
          <Notification type={notification.type} message={notification.message} />
        )}
      </>
    );
  }

  return (
    <>
      <ScrollToTop />

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

      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
    </>
  );
};

export default Layout;
