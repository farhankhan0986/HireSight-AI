import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicantEmail: {
      type: String,
      required: true,
    },
    resumeLink: {
      type: String,
    },
    resumeText: {
      type: String,
      default: "",
    },
    aiParsingStatus: {
      type: String,
      enum: ["pending", "parsed", "failed"],
      default: "pending"
    },
    ai_score: {
      type: Number,
      default: null,
    },
    ai_analysis: {
      type: Object,
      default: null, // expecting { strengths: [], missing_skills: [], suggestions: "" }
    },
    rank: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      enum: ["Applied", "Under Review", "Accepted", "Rejected"],
      default: "Applied",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);
