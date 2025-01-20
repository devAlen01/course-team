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
