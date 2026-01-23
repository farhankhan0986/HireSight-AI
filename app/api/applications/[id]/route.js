import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Application from "../../../../models/Application";
import jwt from "jsonwebtoken";

export async function PATCH(req, context) {
  await connectDB();

    const { id } = await context.params; 

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  if (payload.role !== "recruiter") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { status } = await req.json();

  const allowed = ["Applied", "Under Review", "Accepted", "Rejected"];
  if (!allowed.includes(status)) {
    return NextResponse.json(
      { error: "Invalid status" },
      { status: 400 }
    );
  }

  const application = await Application.findById(id).populate("job");
  if (!application) {
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 }
    );
  }

  // 🔐 ownership check
  if (application.job.createdBy.toString() !== payload.userId) {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  application.status = status;
  await application.save();

  return NextResponse.json({ success: true });
}
