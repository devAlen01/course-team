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
    CourseAdmin: build.query<
      COURSE.CourseAdminResponse,
      COURSE.CourseAdminRequest
    >({
      query: () => ({
        url: "/course/admin",
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    CourseCreate: build.mutation<
      COURSE.CourseCreateResponse,
      COURSE.CourseCreateRequest
    >({
      query: (data) => ({
        url: "/course/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),
    CourseDelete: build.mutation<
      COURSE.CourseDeleteResponse,
      COURSE.CourseDeleteRequest
    >({
      query: (id) => ({
        url: `/course/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["course"],
    }),
    CourseUpdate: build.mutation<
      COURSE.CourseUpdateResponse,
      COURSE.CourseUpdateRequest
    >({
      query: ({ id, ...data }) => ({
        url: `/course/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),
    CourseMy: build.query<COURSE.CourseMyResponse, COURSE.CourseMyRequest>({
      query: () => ({
        url: `/course/my`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    CourseEnrool: build.mutation<
      COURSE.CourseEnroolResponse,
      COURSE.CourseEnroolRequest
    >({
      query: (courseId) => ({
        url: `/course/enroll/${courseId}`,
        method: "POST",
      }),
      invalidatesTags: ["course"],
    }),
    CourseUnenrool: build.mutation<
      COURSE.CourseEnroolResponse,
      COURSE.CourseEnroolRequest
    >({
      query: (courseId) => ({
        url: `/course/unenroll/${courseId}`,
        method: "POST",
      }),
      invalidatesTags: ["course"],
    }),
    CourseenroolmentCount: build.query<
      COURSE.CourseenroolmentCountResponse,
      COURSE.CourseenroolmentCountRequest
    >({
      query: (authorId) => ({
        url: `/course/enrollment-count?authorId=${authorId}`,
        method: "GET",
      }),
      providesTags: ["course"],
    }),
  }),
});

export const {
  useCourseUpdateMutation,
  useGetAllCoursesQuery,
  useCourseAdminQuery,
  useCourseCreateMutation,
  useCourseDeleteMutation,
  useCourseMyQuery,
  useCourseEnroolMutation,
  useCourseUnenroolMutation,
  useCourseenroolmentCountQuery,
} = api;
