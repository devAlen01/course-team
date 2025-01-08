"use client";

import React, { FC, useEffect } from "react";
import scss from "./Header.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { links } from "@/constants/links";
import { useHeaderStore } from "@/zustand/useHeaderStore";
import MobileMenu from "./MobileMenu";
import { IoMenu } from "react-icons/io5";

const Header: FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
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
  return (
    <header className={`${scss.Header} ${isOpen ? scss.active : ""}`}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.logo}>
            <Link
              onClick={() => (isMobile ? setIsOpen(!isOpen) : null)}
              href={"/"}
              className={scss.logo_title}
            >
              Logo
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
                {!session?.user ? (
                  <>
                    <div className={scss.login}>
                      <Link href={"/login"}>Войти</Link>
                    </div>
                    <div className={scss.register}>
                      <Link href={"/register"}>Присоединяйся &#8594;</Link>
                    </div>
                  </>
                ) : (
                  <Link href={"/profile"}>
                    <img
                      title={session.user.username}
                      className={scss.avatar}
                      src={
                        session?.user?.avatar
                          ? session?.user?.avatar!
                          : "/defAva.png"
                      }
                      alt="ava"
                    />
                  </Link>
                )}
              </div>
            </>
          ) : (
            <>
              <div className={scss.action} onClick={() => setIsOpen(!isOpen)}>
                {session?.user ? (
                  <img
                    title={session?.user.username}
                    className={`${scss.avatar} ${scss.mob}`}
                    src={
                      session?.user?.avatar
                        ? session?.user?.avatar!
                        : "/defAva.png"
                    }
                    alt="ava"
                  />
                ) : (
                  <span className={scss.burger}>
                    <IoMenu />
                  </span>
                )}
              </div>
              <MobileMenu />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
