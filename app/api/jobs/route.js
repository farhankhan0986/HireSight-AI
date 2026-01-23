import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Job from "../../../models/Job";
import jwt from "jsonwebtoken";

/* ======================
   CREATE JOB (RECRUITER)
   ====================== */
export async function POST(req) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (payload.role !== "recruiter") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const {
    title,
    company,
    location,
    jobType,
    skills,
    description,
    salaryRange,
  } = await req.json();

  if (!title || !company || !location || !skills || !description) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const job = await Job.create({
    title,
    company,
    location,
    jobType,
    skills,
    description,
    salaryRange,
    createdBy: payload.userId, // recruiter link
  });

  return NextResponse.json(job, { status: 201 });
}

/* ======================
   GET JOBS (PAGINATED)
   ====================== */
export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const mine = searchParams.get("mine");

  const skip = (page - 1) * limit;

  let filter = {};

  // 🔐 recruiter-only jobs
  if (mine === "true") {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    filter.createdBy = payload.userId;
  }

  const jobs = await Job.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(filter);
  const totalPages = Math.ceil(totalJobs / limit);

  return NextResponse.json({
    jobs,
    currentPage: page,
    totalPages,
    totalJobs,
  });
}
