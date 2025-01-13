"use client";

import ReduxProvider from "@/components/providers/ReduxProvider";
import React, { ReactNode } from "react";

const LayoutClient = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ReduxProvider>{children}</ReduxProvider>
    </>
  );
};

export default LayoutClient;
