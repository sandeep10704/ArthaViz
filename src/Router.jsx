import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import UnderMaintenance from "./UnderMaintenance.jsx";
import LoadingScreen from "./Components/CommonComponents/LoadingScreen.jsx";
import AddProductPage from "./pages/AddProductPage.jsx";
import AddBlogPage from "./pages/AddBlogPage.jsx";
import AddReview from "./pages/AddReview.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

// Lazy imports for all routes
const AboutLayout = lazy(() => import("./Components/Body/About/AboutLayout.jsx"));
const BlogsLayout = lazy(() => import("./Components/Body/Blogs/BlogsLayout.jsx"));
const CartLayout = lazy(() => import("./Components/Body/Cart/CartLayout.jsx"));
const ContactLayout = lazy(() => import("./Components/Body/Contact/ContactLayout.jsx"));
const HomeLayout = lazy(() => import("./Components/Body/Home/HomeLayout.jsx"));
const ShopLayout = lazy(() => import("./Components/Body/Shop/ShopLayout.jsx"));
const MainShopLayout = lazy(() => import("./Components/Body/Shop/MainShop/MainShopLayout.jsx"));
const ProductShopLayout = lazy(() => import("./Components/Body/Shop/ProductShop/ProductShopLayout.jsx"));
const CheckoutLayout = lazy(() => import("./Components/Body/Checkout/CheckoutLayout.jsx"));
const PostsLayout = lazy(() => import("./Components/Body/Blogs/Posts/PostsLayout.jsx"));
const PostLayout = lazy(() => import("./Components/Body/Blogs/Post/PostLayout.jsx"));
const Loginpage = lazy(() => import("./pages/loginpage.jsx"));
const SignupPage = lazy(() => import("./pages/SignupPage.jsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.jsx"));

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <UnderMaintenance />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingScreen/>}>
            <HomeLayout />
          </Suspense>
        )
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingScreen/>}>
            <Loginpage />
          </Suspense>
        )
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<LoadingScreen/>}>
            <SignupPage />
          </Suspense>
        )
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<LoadingScreen/>}>
          <ProtectedRoute> 
            <ProfilePage />
            </ProtectedRoute>
          </Suspense>
        )
      },
      {
        path: "addproduct",
        element: (
          <Suspense fallback={<LoadingScreen/>}>
          <ProtectedRoute> 
            <AddProductPage/>
            </ProtectedRoute>
            
          </Suspense>
        )
      },
      {
        path: "addblog",
        element: (
          <Suspense fallback={<LoadingScreen/>}>
            
            <ProtectedRoute> 
            <AddBlogPage/>
            </ProtectedRoute>
          </Suspense>
        )
      },
      {
        path: "addreview",
        element: (
          <Suspense fallback={<LoadingScreen/>}>
            <ProtectedRoute> 
            <AddReview/> 
            </ProtectedRoute>
          </Suspense>
        )
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<LoadingScreen/>}>
            <AboutLayout />
          </Suspense>
        )
      },
      {
        path: "blogs",
        element: (
          <Suspense fallback={<LoadingScreen/>}>
            <BlogsLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingScreen/>}>
                <PostsLayout />
              </Suspense>
            )
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<LoadingScreen/>}>
                <PostLayout />
              </Suspense>
            )
          }
        ]
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<LoadingScreen/>}>
          <ProtectedRoute> 
            <CartLayout />
            </ProtectedRoute>
            
          </Suspense>
        )
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<LoadingScreen/>}>
            <ContactLayout />
          </Suspense>
        )
      },
      {
        path: "shop",
        element: (
          <Suspense fallback={<LoadingScreen/>}>
            <ShopLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingScreen/>}>
                <MainShopLayout />
              </Suspense>
            )
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<LoadingScreen/>}>
                <ProductShopLayout />
              </Suspense>
            )
          }
        ]
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={<LoadingScreen/>}>
          <ProtectedRoute> 
           <CheckoutLayout />
            </ProtectedRoute>
            
          </Suspense>
        )
      }
    ]
  }
]);

export default Router;
