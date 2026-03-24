import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";

export async function POST(req) {
    try {
        await connectDB();

        const formData = await req.formData()
        const file = formData.get("resume")

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const upload = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder: "resumes",
                        resource_type: "image",
                        format: "pdf",
                        access_mode: "public",
                        use_filename: true,
                        unique_filename: false,
                    },
                    (error, result) => {
                        if (error) reject(error)
                        else resolve(result)
                    }
                )
                .end(buffer)
        })
        return NextResponse.json({
            success: true,
            resume: upload.secure_url,
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Failed to upload resume" }, { status: 500 })
    }
}