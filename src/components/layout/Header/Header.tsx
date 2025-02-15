"use client";

import React, { FC, useEffect } from "react";
import scss from "./Header.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/constants/links";
import { useHeaderStore } from "@/zustand/useHeaderStore";
import MobileMenu from "./MobileMenu";
import { IoMenu } from "react-icons/io5";
import { useGetMeQuery } from "@/redux/api/auth";

const Header: FC = () => {
  const pathname = usePathname();
  const { data } = useGetMeQuery();
  const { isMobile, setIsMobile, isOpen, setIsOpen } = useHeaderStore();
  const changeIsMobile = () => {
    setIsMobile(window.innerWidth <= 700);
  };

  useEffect(() => {
    changeIsMobile();
    window.addEventListener("resize", changeIsMobile);
    return () => {
      window.removeEventListener("resize", changeIsMobile);
    };
  }, [isMobile]);
  const path = ["/profile", "/chat", "/courseAll"];
  const checkPathHr = path.some((item) => item === pathname);
  return (
    <header className={`${scss.Header} ${isOpen ? scss.active : ""}`}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.logo}>
            <Link
              onClick={() => (isMobile ? setIsOpen(false) : null)}
              href={"/"}
              className={scss.logo_title}
            >
              CoursePeak
            </Link>
          </div>
          {!isMobile ? (
            <>
              {" "}
              <nav className={scss.nav}>
                <ol>
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link
                        className={
                          pathname === link.href ? scss.active : scss.link
                        }
                        href={link.href}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className={scss.action}>
                {!data?.user ? (
                  <>
                    <div className={scss.login}>
                      <Link href={"/login"}>Войти</Link>
                    </div>
                    <div className={scss.register}>
                      <Link href={"/register"}>Присоединяйся &#8594;</Link>
                    </div>
                  </>
                ) : (
                  <div className={scss.user}>
                    <span className={scss.username}>{data?.user.email}</span>
                    <Link href={"/profile"}>
                      <img
                        title={data?.user.name}
                        className={scss.avatar}
                        src={
                          data?.user?.avatarUrl
                            ? data?.user?.avatarUrl
                            : "/defAva.png"
                        }
                        alt="ava"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className={scss.action} onClick={() => setIsOpen(!isOpen)}>
                <span className={scss.burger}>
                  <IoMenu />
                </span>
              </div>
              <MobileMenu />
            </>
          )}
        </div>
      </div>
      {checkPathHr ? <hr className={scss.hr} /> : null}
    </header>
  );
};

export default Header;
