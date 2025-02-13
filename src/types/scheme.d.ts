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

interface CreateCourseData {
  title: string;
  description?: string;
  youtubeUrl: string;
  price: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  price: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  reviews: Array<{
    id: string;
    review: string;
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      name: string;
      avatarUrl: string;
    };
  }>;
}
