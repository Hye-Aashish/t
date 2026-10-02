import { NextResponse } from "next/server";
import { signToken, setAuthCookie } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST() {
  try {
    const demoData = {
      email: "demo@nonstopcasino.com",
      username: "Demo Player",
    };

    let userId = "demo-user-id";

    // Try MongoDB if reachable, else gracefully fallback to mock ID
    try {
      await dbConnect();
      let user = await User.findOne({ email: demoData.email });
      if (!user) {
        user = await User.create({
          email: demoData.email,
          username: demoData.username,
          password: "demo-password-123",
        });
      }
      userId = user._id.toString();
    } catch (dbErr) {
      console.warn("MongoDB connection skipped for demo login, using fallback:", dbErr);
    }

    const token = signToken({
      id: userId,
      email: demoData.email,
      username: demoData.username,
    });

    await setAuthCookie(token);

    return NextResponse.json({
      message: "Demo login successful",
      user: {
        id: userId,
        email: demoData.email,
        username: demoData.username,
      },
    });
  } catch (error: any) {
    console.error("Demo login error:", error);
    return NextResponse.json(
      { error: "Demo login failed" },
      { status: 500 }
    );
  }
}
