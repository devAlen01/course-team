import { getMe } from "@/lib/auth";
import { enrollInCourse } from "@/lib/course";
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

    const enrollment = await enrollInCourse(
      `${existingUser.id}`,
      params.courseId
    );
    return NextResponse.json(enrollment, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
