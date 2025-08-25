import { NextResponse } from "next/server";
import { adminDb } from "@/lib/server/firebase-admin";
import type { BaseProduct, CreateProductInput } from "@/lib/types/product";
import { ApiResponse } from "@/lib/types/api";
import { FieldValue } from "firebase-admin/firestore";
import { getErrorMessage } from "@/utils/error";

// CREATE product
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreateProductInput;

    const docRef = await adminDb.collection("products").add({
      ...body,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      createdBy: "system", 
      updatedBy: "system",
      sold: 0,
      views: 0,
      ratings: [],
      averageRating: 0,
    });

    const doc = await docRef.get();
    const product = { id: doc.id, ...(doc.data() as Omit<BaseProduct, "id">) };

    return NextResponse.json<ApiResponse<BaseProduct>>({
      success: true,
      data: product,
      error: null,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, data: null, error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const snapshot = await adminDb
      .collection("products")
      .orderBy("date", "asc")
      .get();

    const products: BaseProduct[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<BaseProduct, "id">),
    }));

    return NextResponse.json<ApiResponse<BaseProduct[]>>({
      success: true,
      data: products,
      error: null,
    });
  } catch (err: unknown) {
    console.error("Error fetching events:", err);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, data: null, error: getErrorMessage(err) },
      { status: 500 }
    );
  }
}