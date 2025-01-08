"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const Profile = () => {
  const { data } = useSession();

  return (
    <div>
      Profile
      <h1>{data?.user.email}</h1>
      <h2>{data?.user.username}</h2>
      <button onClick={() => signOut({ callbackUrl: "/" })}>Выйти</button>
    </div>
  );
};

export default Profile;
