import  HeaderLayout from "./Components/Header/HeaderLayout"
import FooterLayout from "./Components/Footer/FooterLayout"

import { Outlet } from "react-router-dom";

const Layout = () => {


  return (
    <>
      <HeaderLayout />
      <main>
        <Outlet />
      </main>
      <FooterLayout />
    </>
  );
};

export default Layout;
