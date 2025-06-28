
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import AboutLayout from "./Components/Body/About/AboutLayout.jsx";
import BlogsLayout from "./Components/Body/Blogs/BlogsLayout.jsx";
import CartLayout from "./Components/Body/Cart/CartLayout.jsx";
import ContactLayout from "./Components/Body/Contact/Contact.jsx";
import HomeLayout from "./Components/Body/Home/HomeLayout.jsx";
import ShopLayout from "./Components/Body/Shop/ShopLayout.jsx";



const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomeLayout /> },
      { path: "about", element: <AboutLayout /> },
      { path: "blogs", element: <BlogsLayout /> },
      { path: "cart", element: <CartLayout /> },
      { path: "contact", element: <ContactLayout /> },
      { path: "shop", element: <ShopLayout /> },

    ],
  },
]);

export default Router;
