import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ChatMessage from "@/models/ChatMessage";

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ success: true, messages: [] });
    }
    await dbConnect();
    const messages = await ChatMessage.find({}).sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({ success: true, messages: messages.reverse() });
  } catch (error: any) {
    return NextResponse.json(
      { success: true, messages: [] },
      { status: 200 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, text, badge, badgeType } = body;

    if (!text || !text.trim()) {
      return NextResponse.json(
        { success: false, error: "Message text is required" },
        { status: 400 }
      );
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({
        success: true,
        message: {
          _id: "local-" + Date.now(),
          username: username || "Player" + Math.floor(1000 + Math.random() * 9000),
          text: text.trim(),
          badge: badge || "⭐",
          badgeType: badgeType || "gold",
          createdAt: new Date(),
        },
      }, { status: 201 });
    }

    await dbConnect();

    const newMessage = await ChatMessage.create({
      username: username || "Player" + Math.floor(1000 + Math.random() * 9000),
      text: text.trim(),
      badge: badge || "⭐",
      badgeType: badgeType || "gold",
    });

    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
