import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, username, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    const user = await User.create({ email, username, password });
    const token = signToken({ id: user._id, email: user.email, username: user.username });
    
    await setAuthCookie(token);

    return NextResponse.json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error: any) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
