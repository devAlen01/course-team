import { getMe } from "@/lib/auth";
import { deleteCourse } from "@/lib/course";
import { verifyAuth } from "@/lib/verifyAuth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    const existingUser = await getMe(`${user}`);

    if (existingUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
    }

    const url = new URL(request.url);
    const courseId = url.pathname.split("/").pop(); // Извлекаем последний сегмент пути

    if (!courseId) {
      return NextResponse.json(
        { error: "Не указан ID курса" },
        { status: 400 }
      );
    }

    await deleteCourse(`${existingUser.id}`, courseId);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
