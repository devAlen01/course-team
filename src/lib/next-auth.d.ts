import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;

    username: string;
    avatar: string | null;
  }
  interface Session {
    user: User & {
      id: string;

      username: string;
      avatar: string | null;
    };
    token: {
      id: string;

      username: string;
      avatar: string | null;
    };
  }
}
