import { db } from "./db";

// Создание нового курса (только для админов)
export async function createCourse(userId: string, data: CreateCourseData) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (user?.role !== "ADMIN") {
      throw new Error("Только администраторы могут создавать курсы");
    }

    const course = await db.course.create({
      data: {
        ...data,
        createdBy: userId,
      },
    });

    return course;
  } catch (error) {
    throw error;
  }
}

//! Запись студента на курс
export async function enrollInCourse(userId: string, courseId: string) {
  try {
    const existingEnrollment = await db.enrollment.findFirst({
      where: {
        userId,
        courseId,
      },
    });

    if (existingEnrollment) {
      throw new Error("Вы уже записаны на этот курс");
    }

    const enrollment = await db.enrollment.create({
      data: {
        userId,
        courseId,
      },
      include: {
        course: true,
      },
    });

    return enrollment;
  } catch (error) {
    throw error;
  }
}

//! Отмена записи на курс
export async function unenrollFromCourse(userId: string, courseId: string) {
  try {
    const enrollment = await db.enrollment.delete({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    return enrollment;
  } catch (error) {
    throw error;
  }
}

// Получение списка курсов студента
export async function getUserCourses(userId: string) {
  try {
    const enrollments = await db.enrollment.findMany({
      where: {
        userId,
      },
      include: {
        course: true,
      },
    });

    return enrollments.map((enrollment) => enrollment.course);
  } catch (error) {
    throw error;
  }
}

// Получение списка всех курсов
export async function getAllCourses() {
  try {
    const courses = await db.course.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        reviews: {
          select: {
            id: true,
            review: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    return courses;
  } catch (error) {
    throw error;
  }
}

// Получение списка курсов админа
export async function getAdminCourses(userId: string) {
  try {
    const course = await db.course.findMany({
      where: {
        createdBy: userId,
      },
    });

    return course;
  } catch (error) {
    throw error;
  }
}

// Обновление курса (только для админов)
export async function updateCourse(
  userId: string,
  courseId: string,
  data: Partial<CreateCourseData>
) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (user?.role !== "ADMIN") {
      throw new Error("Только администраторы могут обновлять курсы");
    }

    const course = await db.course.update({
      where: { id: courseId },
      data,
    });

    return course;
  } catch (error) {
    throw error;
  }
}

// Удаление курса (только для админов)
export async function deleteCourse(userId: string, courseId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (user?.role !== "ADMIN") {
      throw new Error("Только администраторы могут удалять курсы");
    }

    await db.course.delete({
      where: { id: courseId },
    });

    return true;
  } catch (error) {
    throw error;
  }
}
//! оставить отзыв курсу
export const reviewCourse = async (data: {
  review: string;
  courseId: string;
  userId: string;
}) => {
  if (!data?.review.trim()) {
    return { status: "ERROR", message: "Пустое поле" };
  }

  try {
    const course = await db.course.findUnique({
      where: { id: data.courseId },
    });

    if (!course) {
      return { status: "ERROR", message: "Курс не найден" };
    }

    const comment = await db.review.create({
      data: {
        review: data.review,
        courseId: data.courseId,
        userId: data.userId,
      },
    });

    return { status: "OK", comment };
  } catch (error) {
    console.error("Ошибка при создании отзыва:", error);
    return { status: "ERROR", message: "Произошла ошибка при создании отзыва" };
  }
};

// export const getCourseEnrollmentCount = async (courseId: string) => {
//   try {
//     const enrollments = await db.enrollment.findMany({
//       where: { courseId },
//       select: {
//         user: {
//           select: {
//             id: true,
//             name: true,
//             email: true,
//             avatarUrl: true,
//           },
//         },
//       },
//     });

//     return enrollments;
//   } catch (error) {
//     throw error;
//   }
// };

export const getAllUsersEnrolledInAuthorsCourses = async (authorId: string) => {
  try {
    // Получаем все курсы, созданные автором
    const courses = await db.course.findMany({
      where: {
        createdBy: authorId, // Фильтруем по автору
      },
      select: {
        enrollments: {
          // Получаем записи пользователей на курс
          select: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    // Собираем всех пользователей, подписанных на курсы
    const usersSet = new Set<string>(); // Используем Set для уникальности пользователей

    courses.forEach((course) => {
      course.enrollments.forEach((enrollment) => {
        const user = enrollment.user;
        usersSet.add(JSON.stringify(user)); // Добавляем строковое представление пользователя
      });
    });

    // Преобразуем обратно в массив объектов
    const users = Array.from(usersSet).map((userString: string) =>
      JSON.parse(userString)
    );

    return users;
  } catch (error) {
    throw error;
  }
};
