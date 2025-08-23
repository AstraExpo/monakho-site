// app/api/products/[id]/edit/route.ts
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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // ✅ Authenticate admin
    const sessionCookie = (await cookies()).get("session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    if (decoded.email !== "monakhoministry@gmail.com") {
      return NextResponse.json(
        { error: "Unauthorized: Only admin can edit products" },
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

    // ✅ Price & stock validation
    if (typeof productData.price !== "number" || productData.price <= 0) {
      return NextResponse.json(
        { error: "Invalid price. Must be a positive number" },
        { status: 400 }
      );
    }

    if (!Number.isInteger(productData.stock) || productData.stock < 0) {
      return NextResponse.json(
        { error: "Invalid stock. Must be a non-negative integer" },
        { status: 400 }
      );
    }

    // ✅ Firestore reference
    const docRef = adminDb.collection("products").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // ✅ Update product
    await docRef.update({
      name: productData.name,
      price: productData.price,
      stock: productData.stock,
      category: productData.category,
      description: productData.description || "",
      status: productData.status,
      updatedAt: admin.firestore.FieldValue.serverTimestamp() as FieldValue,
      updatedBy: decoded.email,
    });

    // ✅ Fetch updated product
    const updatedProduct = (await docRef.get()).data() as BaseProduct;

    // ✅ Strip out Firestore doc's `id`, but don’t keep it around
    const { id: _, ...productWithoutId } = updatedProduct;

    return NextResponse.json({
      success: true,
      product: { id, ...productWithoutId },
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: getErrorMessage(err) || "Failed to update product" },
      { status: 500 }
    );
  }
}
