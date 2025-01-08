import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";
const UserSchema = z.object({
  username: z.string().min(1, "Имя пользователя обязательно").max(100),
  email: z
    .string()
    .min(1, "Электронная почта обязательна")
    .email("Некорректный адрес электронной почты"),
  password: z
    .string()
    .min(1, "Пароль обязателен")
    .min(8, "Пароль должен содержать не менее 8 символов"),
});

export const POST = async (req: Request) => {
  const body = await req.json();
  const { email, username, password } = UserSchema.parse(body);

  try {
    const existUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "Пользователь с такой электронной почтой уже существует!",
        },
        { status: 409 }
      );
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    const {
      password: newUserPassword,
      createdAt,
      updatedAt,
      ...rest
    } = newUser;
    return NextResponse.json(
      {
        user: rest,
        message: "Пользователь успешно зарегистрирован!",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Ошибка!!! Что-то пошло не так.",
      },
      { status: 500 }
    );
  }
};
