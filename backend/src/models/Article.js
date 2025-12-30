import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "Unknown",
    },
    publishedAt: {
      type: String,
    },
    sourceUrl: {
      type: String,
      required:true,
      unique: true,
    },
    isUpdated: {
      type: Boolean,
      default: false,
    },
    competitorLinks: {
      type: [String],
      default: []
    },
    rewrittenContent: {
      type: String,
    },
    rewrittenAt: {
      type: Date,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Article", ArticleSchema);
