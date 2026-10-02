import mongoose, { Document, Model, Schema } from "mongoose";

export interface IChatMessage extends Document {
  username: string;
  badge?: string;
  badgeType?: string;
  text: string;
  createdAt: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    username: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      default: "⭐",
    },
    badgeType: {
      type: String,
      default: "gold",
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models.ChatMessage) {
  delete mongoose.models.ChatMessage;
}

const ChatMessage: Model<IChatMessage> =
  mongoose.model<IChatMessage>("ChatMessage", ChatMessageSchema);

export default ChatMessage;
