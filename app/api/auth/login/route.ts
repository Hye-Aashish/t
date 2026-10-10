import { NextResponse } from "next/server";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // DUMMY LOGIN: Accept any credentials
    const dummyUser = {
      _id: "dummy_id_" + Date.now(),
      email: email,
      username: email.split("@")[0],
    };

    const token = signToken({ id: dummyUser._id, email: dummyUser.email, username: dummyUser.username });
    
    await setAuthCookie(token);

    return NextResponse.json({
      message: "Logged in successfully",
      user: {
        id: dummyUser._id,
        email: dummyUser.email,
        username: dummyUser.username,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
