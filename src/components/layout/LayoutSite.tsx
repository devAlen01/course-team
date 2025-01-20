"use client";
import { ReactNode } from "react";
import scss from "./LayoutSite.module.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import SiteBar from "../pages/SiteBar/SiteBar";
const LayoutSite = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const path = ["/login", "/register", "/docs"];
  const checkPath = path.some((item) => item === pathname);
  const pathFooter = [
    "/login",
    "/register",
    "/docs",
    "/profile",
    "/chat",
    "/courseAll",
  ];
  const checkPathFooter = pathFooter.some((item) => item === pathname);
  const pathProfile = [
    "/login",
    "/register",
    "/docs",
    "/",
    "/about",
    "/contact",
    "/marketing1",
    "/marketing2",
    "/course",
  ];
  const checkPathProfile = pathProfile.some((item) => item === pathname);

  return (
    <div className={scss.LayoutSite}>
      {!checkPath ? <Header /> : null}
      <main>{children}</main>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {!checkPathProfile ? <SiteBar /> : null}
      {!checkPathFooter ? <Footer /> : null}
    </div>
  );
};

export default LayoutSite;
