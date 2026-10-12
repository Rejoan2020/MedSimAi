import mongoose from "mongoose";
import { defineModel } from "@/lib/model";

const AnnouncementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, default: "Update" },
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
})

export default defineModel("Announcement", AnnouncementSchema);
