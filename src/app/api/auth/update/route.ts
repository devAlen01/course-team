import { NextRequest, NextResponse } from "next/server";
import { updateProfile } from "@/lib/auth";
import { verifyAuth } from "@/lib/verifyAuth";

export async function PUT(req: NextRequest) {
  try {
    const userId = await verifyAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, avatarUrl } = await req.json();
    const updatedUser = await updateProfile(userId, { name, avatarUrl });

    return NextResponse.json({ user: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
