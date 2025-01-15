import { getMe } from "@/lib/auth";
import { unenrollFromCourse } from "@/lib/course";
import { verifyAuth } from "@/lib/verifyAuth";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    courseId: string;
  };
}

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const user = await verifyAuth(request);
    const existingUser = await getMe(`${user}`);

    await unenrollFromCourse(`${existingUser.id}`, params.courseId);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
