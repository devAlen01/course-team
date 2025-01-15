import { NextRequest, NextResponse } from "next/server";
import { updateRole } from "@/lib/auth";
import { verifyAuth } from "@/lib/verifyAuth";

export async function PATCH(req: NextRequest) {
  try {
    const userId = await verifyAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = await req.json();
    const updatedUser = await updateRole(userId, { role });

    return NextResponse.json({ user: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
