import  HeaderLayout from "./Components/Header/HeaderLayout"
import FooterLayout from "./Components/Footer/FooterLayout"

import { Outlet } from "react-router-dom";

const Layout = () => {
  console.log("HeaderLayout:", HeaderLayout);
console.log("FooterLayout:", FooterLayout);

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
