import { NextResponse } from "next/server";
import { register } from "@/lib/auth";
import * as z from "zod";

const UserSchema = z.object({
  name: z.string().min(1, "Имя пользователя обязательно").max(100),
  email: z
    .string()
    .min(1, "Электронная почта обязательна")
    .email("Некорректный адрес электронной почты"),
  password: z
    .string()
    .min(1, "Пароль обязателен")
    .min(8, "Пароль должен содержать не менее 8 символов"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedData = UserSchema.parse(body);

    const { user, token } = await register(
      validatedData.email,
      validatedData.password,
      validatedData.name
    );

    return NextResponse.json({ user, token });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
