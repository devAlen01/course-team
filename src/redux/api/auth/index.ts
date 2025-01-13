import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    LogIn: build.mutation<AUTH.PostSignInResponse, AUTH.PostSignInRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    register: build.mutation<
      AUTH.PostRegisterResponse,
      AUTH.PostRegisterRequest
    >({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    getMe: build.query<AUTH.GetMeResponse, AUTH.GetMeRequest>({
      query: () => ({
        url: "/auth/get-me",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),

    updateProfile: build.mutation<
      AUTH.UpdateProfileResponse,
      AUTH.UpdateProfileRequest
    >({
      query: (data) => ({
        url: "/auth/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLogInMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
} = api;
