export const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "Course Platform API",
    version: "1.0.0",
    description: "API документация для платформы курсов",
  },
  servers: [
    {
      url: "/api",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
          },
          email: {
            type: "string",
            format: "email",
          },
          name: {
            type: "string",
            nullable: true,
          },
          avatarUrl: {
            type: "string",
            nullable: true,
          },
          role: {
            type: "string",
            enum: ["ADMIN", "USER"],
          },
        },
      },
      Course: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
          },
          title: {
            type: "string",
          },
          description: {
            type: "string",
            nullable: true,
          },
          youtubeUrl: {
            type: "string",
          },
          price: {
            type: "string",
          },
          category: {
            type: "string",
          },
          createdBy: {
            type: "string",
            format: "uuid",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      Student: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
          },

          name: {
            type: "string",
            nullable: true,
          },
          avatarUrl: {
            type: "string",
            nullable: true,
          },
        },
      },
    },
  },
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Регистрация нового пользователя",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                  },
                  password: {
                    type: "string",
                    format: "password",
                  },
                  name: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Успешная регистрация",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: {
                      $ref: "#/components/schemas/User",
                    },
                    token: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Вход в систему",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                  },
                  password: {
                    type: "string",
                    format: "password",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Успешный вход",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    user: {
                      $ref: "#/components/schemas/User",
                    },
                    token: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Выход из системы",
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Успешный выход",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/auth/get-me": {
      get: {
        tags: ["User"],
        summary: "Получение данных текущего пользователя",
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Информация о текущем пользователе",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
    },
    "/auth/update": {
      put: {
        tags: ["User"],
        summary: "Обновление профиля пользователя",
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    nullable: true,
                  },
                  avatarUrl: {
                    type: "string",
                    nullable: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Профиль обновлен",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
    },
    "/auth/update-role": {
      patch: {
        tags: ["User"],
        summary: "Обновление роли пользователя",
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  role: {
                    type: "string",
                    enum: ["ADMIN", "USER"],
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Роль пользователя обновлена",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
    },
    "/course/get-all": {
      get: {
        tags: ["Courses"],
        summary: "Получение списка всех курсов",
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Список курсов",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Student",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/course/my": {
      get: {
        tags: ["Courses"],
        summary: "Получение списка курсов студента",
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Информация о текущем пользователе",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Course",
                },
              },
            },
          },
        },
      },
    },
    "/course/admin": {
      get: {
        tags: ["Courses"],
        summary:
          "Получение списка курсов админа (создателя курса) (только для админов)",
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Информация о текущем пользователе",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Course",
                },
              },
            },
          },
        },
      },
    },
    "/course/create": {
      post: {
        tags: ["Courses"],
        summary: "Создание нового курса (только для админов)",
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "youtubeUrl"],
                properties: {
                  title: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  youtubeUrl: {
                    type: "string",
                  },
                  price: {
                    type: "string",
                  },
                  category: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Курс создан",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Course",
                },
              },
            },
          },
        },
      },
    },
    "/course/review": {
      post: {
        tags: ["Courses"],
        summary: "Оставить отзыв",
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  courseId: {
                    type: "string",
                  },
                  review: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Отзыв успешно отправлен",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Course",
                },
              },
            },
          },
        },
      },
    },
    "/course/enrollment-count": {
      get: {
        tags: ["Courses"],
        summary: "Получение списка студентов",
        security: [
          {
            BearerAuth: [],
          },
        ],
        parameters: [
          {
            in: "query",
            name: "authorId",
            required: true,
            schema: {
              type: "string",
            },
            description: "Идентификатор админа, создавщего курса",
          },
        ],

        responses: {
          200: {
            description: "Список студентов",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
      },
    },
    "/course/update/{courseId}": {
      parameters: [
        {
          name: "courseId",
          in: "path",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
          },
        },
      ],
      put: {
        tags: ["Courses"],
        summary: "Обновление курса (только для админов)",
        security: [
          {
            BearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  youtubeUrl: {
                    type: "string",
                  },
                  price: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Курс обновлен",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Course",
                },
              },
            },
          },
        },
      },
    },
    "/course/delete/{courseId}": {
      parameters: [
        {
          name: "courseId",
          in: "path",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
          },
        },
      ],
      delete: {
        tags: ["Courses"],
        summary: "Удаление курса (только для админов)",
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Курс удален",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/course/enroll/{courseId}": {
      parameters: [
        {
          name: "courseId",
          in: "path",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
          },
        },
      ],
      post: {
        tags: ["Courses"],
        summary: "Запись на курс",
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          201: {
            description: "Успешная запись на курс",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/course/unenroll/{courseId}": {
      parameters: [
        {
          name: "courseId",
          in: "path",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
          },
        },
      ],
      post: {
        tags: ["Courses"],
        summary: "Отмена записи на курс",
        security: [
          {
            BearerAuth: [],
          },
        ],
        responses: {
          201: {
            description: "Отмена записи на курс",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
