import { getMe } from "@/lib/auth";
import { deleteCourse } from "@/lib/course";
import { verifyAuth } from "@/lib/verifyAuth";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    courseId: string;
  };
}
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const user = await verifyAuth(request);
    const existingUser = await getMe(`${user}`);

    if (existingUser.role !== "ADMIN") {
      return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
    }

    await deleteCourse(`${existingUser.id}`, params.courseId);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
