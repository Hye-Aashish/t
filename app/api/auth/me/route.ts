import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(null);
    }
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(null);
  }
}
