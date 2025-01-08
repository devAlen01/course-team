"use client";

import ReduxProvider from "@/components/providers/ReduxProvider";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

const LayoutClient = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </SessionProvider>
  );
};

export default LayoutClient;
