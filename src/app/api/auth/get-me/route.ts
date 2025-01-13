import { NextRequest, NextResponse } from "next/server";
import { getMe } from "@/lib/auth";
import { verifyAuth } from "@/lib/middleware";

export async function GET(req: NextRequest) {
  try {
    const userId = await verifyAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const existingUser = await getMe(userId);
    return NextResponse.json({ user: existingUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
