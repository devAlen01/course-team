import { getMe } from "@/lib/auth";
import { updateCourse } from "@/lib/course";
import { verifyAuth } from "@/lib/verifyAuth";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    courseId: string;
  };
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const userId = await verifyAuth(request);
    const existingUser = await getMe(`${userId}`);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (existingUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
    }

    const data = await request.json();
    const course = await updateCourse(userId, params.courseId, data);

    return NextResponse.json(course);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
