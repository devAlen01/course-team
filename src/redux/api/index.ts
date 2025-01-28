import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: (headers) => {
    const tokensString = localStorage.getItem("token");
    let tokens;
    try {
      if (tokensString) {
        tokens = JSON.parse(tokensString);
      }
    } catch (error) {
      console.error("Failed to parse tokens:", error);
    }
    if (tokens) {
      headers.set("Authorization", `Bearer ${tokens}`);
    }
    return headers;
  },
});

const baseQuerExtended: BaseQueryFn = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQuerExtended,
  refetchOnFocus: false,
  refetchOnReconnect: false,
  endpoints: () => ({}),
  tagTypes: ["auth", "course"],
});
