import { reviewCourse } from "@/lib/course";
import { verifyAuth } from "@/lib/verifyAuth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { review, courseId } = await request.json();

    if (!review || !courseId) {
      return NextResponse.json(
        { error: "Missing review or courseId" },
        { status: 400 }
      );
    }

    const course = await reviewCourse({ review, courseId, userId: user });

    if (course.status === "OK") {
      return NextResponse.json(course.comment, { status: 201 });
    }

    return NextResponse.json({ error: course.message }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
