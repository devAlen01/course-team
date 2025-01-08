"use client";
import { ReactNode } from "react";
import scss from "./LayoutSite.module.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
const LayoutSite = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const path = ["/login", "/register"];
  const checkPath = path.some((item) => item === pathname);
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
      {!checkPath ? <Footer /> : null}
    </div>
  );
};

export default LayoutSite;
