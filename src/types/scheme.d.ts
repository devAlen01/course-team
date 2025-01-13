interface IUser {
  user: {
    id: string;
    email: string;
    name: string;
    avatarUrl: string;
    role: "ADMIN" | "USER";
  };
  token: string;
}
