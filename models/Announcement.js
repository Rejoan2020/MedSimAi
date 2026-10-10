import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    // Short label shown as a badge, e.g. "New Cases" or "Maintenance"
    type: { type: String, default: "Update" },
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
})

export default mongoose.models.Announcement || mongoose.model("Announcement", AnnouncementSchema);
