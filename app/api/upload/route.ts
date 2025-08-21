import { adminStorage } from "@/lib/server/firebase-admin";
import { getErrorMessage } from "@/utils/error";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Create unique filename
    const filename = `${folder}/${Date.now()}-${uuidv4()}-${file.name}`;

    // Convert File → Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Save to Firebase Storage
    const upload = adminStorage.file(filename);
    await upload.save(buffer, {
      contentType: file.type,
      public: true,
    });

    // Public URL
    const publicUrl = `https://storage.googleapis.com/${adminStorage.name}/${filename}`;

    return NextResponse.json({ url: publicUrl });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
