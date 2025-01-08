import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface IParams {
  email?: string;
}

export const PATCH = async (req: Request, { params }: { params: IParams }) => {
  try {
    const body = await req.json();
    const { avatar, username } = body;

    const existUser = await db.user.findUnique({
      where: { email: params.email },
    });

    if (!existUser) {
      return NextResponse.json(
        {
          user: null,
          message: "Пользователь не найден!",
        },
        { status: 404 }
      );
    }

    const updatedUser = await db.user.update({
      where: { email: params.email },
      data: {
        ...(avatar && { avatar }),
        ...(username && { username }),
      },
    });

    return NextResponse.json(
      {
        avatar: updatedUser.avatar,
        username: updatedUser.username,
        message: "Профиль успешно обновлен!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка обновления профиля:", error);
    return NextResponse.json(
      {
        message: "Произошла ошибка при обновлении профиля.",
      },
      { status: 500 }
    );
  }
};
