import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET(req) {
  await connectDB();

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ loggedIn: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB
    const user = await User.findById(decoded.userId).select(
      "name email role resume extracted_skills domain_scores"
    );

    if (!user) {
      return NextResponse.json({ loggedIn: false });
    }

    return NextResponse.json({
      loggedIn: true,
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      resume: user.resume || null, 
      extracted_skills: user.extracted_skills || [],
      domain_scores: user.domain_scores || {},
    });
  } catch (err) {
    return NextResponse.json({ loggedIn: false });
  }
}
