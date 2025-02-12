namespace AUTH {
  type PostSignInResponse = IUser;
  type PostSignInRequest = { email: string; password: string };

  type PostRegisterResponse = IUser;
  type PostRegisterRequest = { email: string; password: string; name: string };

  type GetMeResponse = IUser;
  type GetMeRequest = void;

  type UpdateProfileResponse = IUser;
  type UpdateProfileRequest = { avatarUrl: string; name: string };

  type UpdateProfileRoleResponse = {
    id: string;
    email: string;
    name: string;
    avatarUrl: string;
    role: "ADMIN" | "USER";
  };
  type UpdateProfileRoleRequest = { role: "ADMIN" | "USER" };

  type LogoutResponse = {
    success: boolean;
  };
  type LogoutRequest = void;
}
