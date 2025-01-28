import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    getAllCourses: build.query<
      COURSE.GetAllCoursesResponse,
      COURSE.GetAllCoursesRequest
    >({
      query: () => ({
        url: "/course/get-all",
        method: "GET",
      }),
      providesTags: ["course"],
    }),
  }),
});

export const { useGetAllCoursesQuery } = api;
