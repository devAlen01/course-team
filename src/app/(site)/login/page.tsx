"use client";
import LogIn from "@/components/pages/LogIn";
import { useSession } from "next-auth/react";
import React, { FC } from "react";

const page: FC = () => {
  const { data } = useSession();
  console.log("🚀 ~ data:", data);
  return (
    <>
      <LogIn />
    </>
  );
};

export default page;
