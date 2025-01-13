import { NextResponse } from "next/server";
import { login } from "@/lib/auth";
import * as z from "zod";

const LoginSchema = z.object({
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

    const validatedData = LoginSchema.parse(body);

    const { user, token } = await login(
      validatedData.email,
      validatedData.password
    );

    return NextResponse.json({ user, token });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
