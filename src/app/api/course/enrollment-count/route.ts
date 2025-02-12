// import { getCourseEnrollmentCount } from "@/lib/course";
import { getAllUsersEnrolledInAuthorsCourses } from "@/lib/course";
import { verifyAuth } from "@/lib/verifyAuth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const authorId = request.nextUrl.searchParams.get("authorId");

    if (!authorId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    const enrollmentCount = await getAllUsersEnrolledInAuthorsCourses(authorId);
    return NextResponse.json(enrollmentCount);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
