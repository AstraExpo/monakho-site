import { NextResponse } from "next/server";
import { adminDb } from "@/lib/server/firebase-admin";
import { ApiResponse } from "@/lib/types/api";
import { FieldValue } from "firebase-admin/firestore";
import { BaseProduct, UpdateProductInput } from "@/lib/types/product";

// GET product from the db
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const doc = await adminDb.collection("products").doc(id).get();

    if (!doc.exists) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, data: null, error: "Product not found" },
        { status: 404 }
      );
    }

    const product = { id: doc.id, ...(doc.data() as Omit<BaseProduct, "id">) };

    return NextResponse.json<ApiResponse<BaseProduct>>({
      success: true,
      data: product,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, data: null, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// UPDATE product
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = (await req.json()) as UpdateProductInput;

    await adminDb.collection("products").doc(id).update({
      ...body,
      updatedAt: FieldValue.serverTimestamp(),
      updatedBy: "system",
    });

    const updatedDoc = await adminDb.collection("products").doc(id).get();
    if (!updatedDoc.exists) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, data: null, error: "Product not found" },
        { status: 404 }
      );
    }

    const updatedProduct = {
      id: updatedDoc.id,
      ...(updatedDoc.data() as Omit<BaseProduct, "id">),
    };

    return NextResponse.json<ApiResponse<BaseProduct>>({
      success: true,
      data: updatedProduct,
      error: null,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, data: null, error: "Failed to update product" },
      { status: 500 }
    );
  }
}


// DELETE product
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const params = await context.params;
    const docRef = adminDb.collection("products").doc(params.id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json<ApiResponse<null>>(
        { success: false, data: null, error: "Product not found" },
        { status: 404 }
      );
    }

    await docRef.delete();

    return NextResponse.json<ApiResponse<{ id: string }>>({
      success: true,
      data: { id: params.id },
      error: null,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json<ApiResponse<null>>(
      { success: false, data: null, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
