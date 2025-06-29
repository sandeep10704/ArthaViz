import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";


const HeaderLayout = lazy(() => import("./Components/Header/HeaderLayout"));
const FooterLayout = lazy(() => import("./Components/Footer/FooterLayout"));

const Layout = () => {
  return (
    <>
      <Suspense fallback={<div>Loading Header...</div>}>
        <HeaderLayout />
      </Suspense>

      <main>
        <Outlet />
      </main>

      <Suspense fallback={<div>Loading Footer...</div>}>
        <FooterLayout />
      </Suspense>
    </>
  );
};

export default Layout;
