"use client";
import { FC } from "react";
import scss from "./MobileMenu.module.scss";
import Link from "next/link";
import React from "react";
import { useHeaderStore } from "@/zustand/useHeaderStore";
import { useRouter } from "next/navigation";
import { links } from "@/constants/links";
import { useGetMeQuery } from "@/redux/api/auth";

const MobileMenu: FC = () => {
  const { data } = useGetMeQuery();

  const { isOpen, setIsOpen } = useHeaderStore();
  const router = useRouter();

  return (
    <div
      className={`${scss.MobileMenu} ${isOpen ? scss.active : ""}`}
      aria-hidden={!isOpen}
      onClick={() => setIsOpen(false)}
    >
      <div className={scss.content}>
        <nav className={scss.nav}>
          <ul>
            <li>
              {!data?.user && (
                <button
                  className={scss.auth_btn}
                  onClick={() => router.push("/login")}
                >
                  Войти
                </button>
              )}
            </li>
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  className={scss.link}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {data?.user && (
              <li>
                {data?.user && (
                  <Link
                    onClick={() => setIsOpen(false)}
                    className={scss.link}
                    href={"/profile"}
                  >
                    Профиль
                  </Link>
                )}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
