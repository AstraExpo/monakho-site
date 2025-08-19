// app/api/products/create/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb, admin } from "@/lib/server/firebase-admin";

const CATEGORIES = [
  "Books",
  "Music",
  "Merch",
  "Clothing",
  "Accessories",
  "Video",
  "Other",
] as const;

const STATUS = ["Active", "Inactive", "Out of Stock"] as const;

export async function POST(req: Request) {
  try {
    // ✅ Authenticate admin
    const sessionCookie = (await cookies()).get("session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    if (decoded.email !== "monakhoministry@gmail.com") {
      return NextResponse.json(
        { error: "Unauthorized: Only admin can create products" },
        { status: 403 }
      );
    }

    // ✅ Parse request body
    const productData = await req.json();

    // ✅ Required field validation (common)
    if (!productData.name || !productData.price) {
      return NextResponse.json(
        { error: "Missing required fields: name, price" },
        { status: 400 }
      );
    }

    // ✅ Category validation (fallback to Other)
    if (!CATEGORIES.includes(productData.category)) {
      productData.category = "Other";
    }

    // ✅ Status validation (fallback to Active)
    if (!STATUS.includes(productData.status)) {
      productData.status = "Active";
    }

    // ✅ Price validation
    if (typeof productData.price !== "number" || productData.price <= 0) {
      return NextResponse.json(
        { error: "Invalid price. Must be a positive number" },
        { status: 400 }
      );
    }

    // ✅ Stock validation (only if no variants)
    if (
      !productData.variants &&
      (!Number.isInteger(productData.stock) || productData.stock < 0)
    ) {
      return NextResponse.json(
        { error: "Invalid stock. Must be a non-negative integer" },
        { status: 400 }
      );
    }

    // ✅ Images validation
    if (productData.images && !Array.isArray(productData.images)) {
      return NextResponse.json(
        { error: "Images must be an array of URLs" },
        { status: 400 }
      );
    }

    // ✅ Variants validation
    if (productData.variants && !Array.isArray(productData.variants)) {
      return NextResponse.json(
        { error: "Variants must be an array" },
        { status: 400 }
      );
    }

    // ✅ Category-specific validation
    switch (productData.category) {
      case "Books":
        if (!productData.images?.length) {
          return NextResponse.json(
            { error: "Books require at least one image" },
            { status: 400 }
          );
        }
        if (!productData.pdfUrl) {
          return NextResponse.json(
            { error: "Books require a PDF file (pdfUrl)" },
            { status: 400 }
          );
        }
        break;

      case "Music":
        if (!productData.musicUrl) {
          return NextResponse.json(
            { error: "Music requires a music file (musicUrl)" },
            { status: 400 }
          );
        }
        if (!productData.thumbnail) {
          return NextResponse.json(
            { error: "Music requires a thumbnail image" },
            { status: 400 }
          );
        }
        break;

      case "Video":
        if (!productData.videoUrl) {
          return NextResponse.json(
            { error: "Video requires a video file (videoUrl)" },
            { status: 400 }
          );
        }
        if (!productData.thumbnail) {
          return NextResponse.json(
            { error: "Video requires a thumbnail image" },
            { status: 400 }
          );
        }
        break;

      case "Accessories":
      case "Clothing":
      case "Merch":
        if (!productData.images?.length) {
          return NextResponse.json(
            { error: `${productData.category} require at least one image` },
            { status: 400 }
          );
        }
        break;
    }

    // ✅ Generate slug (SEO-friendly)
    const slug =
      productData.slug ||
      productData.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

    // ✅ Prepare document for Firestore
    const newProduct = {
      name: productData.name,
      slug,
      description: productData.description || "",
      category: productData.category,
      price: productData.price,
      stock: productData.stock ?? 0,
      status: productData.status,

      // 🔑 Files (category dependent)
      images: productData.images || [],
      pdfUrl: productData.pdfUrl || null,
      musicUrl: productData.musicUrl || null,
      videoUrl: productData.videoUrl || null,
      thumbnail: productData.thumbnail || null,

      // 🔑 Extra
      variants: productData.variants || [],
      sold: productData.sold ?? 0,
      views: 0,
      ratings: [],
      averageRating: 0,

      // 👤 Audit
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: decoded.email,
      updatedBy: decoded.email,
    };

    // ✅ Save to Firestore
    const docRef = await adminDb.collection("products").add(newProduct);

    return NextResponse.json({
      success: true,
      product: { id: docRef.id, ...newProduct },
    });
  } catch (err: any) {
    console.error("Error creating product:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
