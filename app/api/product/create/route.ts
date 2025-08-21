// app/api/products/create/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb, admin } from "@/lib/server/firebase-admin";
import { BaseProduct, Category, Status } from "@/lib/types/product";
import { FieldValue } from "firebase-admin/firestore";
import { getErrorMessage } from "@/utils/error";

const CATEGORIES: Category[] = [
  "Books",
  "Music",
  "Merch",
  "Clothing",
  "Accessories",
  "Video",
  "Other",
];

const STATUS: Status[] = ["Active", "Inactive", "Out of Stock"];

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

    // ✅ Required field validation
    if (!productData.name || !productData.price) {
      return NextResponse.json(
        { error: "Missing required fields: name, price" },
        { status: 400 }
      );
    }

    // ✅ Category validation
    if (!CATEGORIES.includes(productData.category)) {
      productData.category = "Other";
    }

    // ✅ Status validation
    if (!STATUS.includes(productData.status)) {
      productData.status = "Active";
    }

    // ✅ Price & stock
    if (typeof productData.price !== "number" || productData.price <= 0) {
      return NextResponse.json(
        { error: "Invalid price. Must be a positive number" },
        { status: 400 }
      );
    }

    if (
      !productData.variants &&
      (!Number.isInteger(productData.stock) || productData.stock < 0)
    ) {
      return NextResponse.json(
        { error: "Invalid stock. Must be a non-negative integer" },
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

    // ✅ Generate slug
    const slug =
      productData.slug ||
      productData.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");

    // ✅ Prepare product document
    const newProduct: Omit<BaseProduct, "id"> = {
      name: productData.name,
      slug,
      description: productData.description || "",
      category: productData.category,
      price: productData.price,
      stock: productData.stock ?? 0,
      status: productData.status,
      images: productData.images || [],
      pdfUrl: productData.pdfUrl || null,
      musicUrl: productData.musicUrl || null,
      videoUrl: productData.videoUrl || null,
      thumbnail: productData.thumbnail || null,
      variants: productData.variants || [],
      sold: productData.sold ?? 0,
      views: 0,
      ratings: [],
      averageRating: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp() as FieldValue,
      updatedAt: admin.firestore.FieldValue.serverTimestamp() as FieldValue,
      createdBy: decoded.email,
      updatedBy: decoded.email,
    };

    // ✅ Save to Firestore
    const docRef = await adminDb.collection("products").add(newProduct);

    return NextResponse.json({
      success: true,
      product: { id: docRef.id, ...newProduct } satisfies BaseProduct,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(err) || "Failed to create product" },
      { status: 500 }
    );
  }
}
