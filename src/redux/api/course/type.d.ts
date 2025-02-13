namespace COURSE {
  type GetAllCoursesResponse = Course[];
  type GetAllCoursesRequest = void;

  type CourseAdminResponse =
    | {
        id: string;
        title: string;
        description: string;
        youtubeUrl: string;
        price: string;
        category: string;
        createdBy: string;
        createdAt: string;
        updatedAt: string;
      }[]
    | undefined;
  type CourseAdminRequest = void;

  type CourseCreateResponse = {
    id: string;
    title: string;
    description: string;
    youtubeUrl: string;
    price: string;
    category: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
  };
  type CourseCreateRequest = {
    title: string;
    description: string;
    youtubeUrl: string;
    price: string;
    category: string;
  };

  type CourseDeleteResponse = {
    success: boolean;
  };
  type CourseDeleteRequest = string;

  type CourseUpdateResponse = {
    id: string;
    title: string;
    description: string;
    youtubeUrl: string;
    price: string;
    category: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
  };

  type CourseUpdateRequest = {
    id: string;
    title: string;
    description: string;
    youtubeUrl: string;
    price: string;
  };

  type CourseMyResponse = {
    id: string;
    title: string;
    description: string;
    youtubeUrl: string;
    price: string;
    category: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
  }[];
  type CourseMyRequest = void;

  type CourseEnroolResponse = {
    success: boolean;
  };

  type CourseEnroolRequest = string;

  type ReviewRequest = {
    courseId: string;
    review: string;
  };
  type ReviewResponse = void;
}
