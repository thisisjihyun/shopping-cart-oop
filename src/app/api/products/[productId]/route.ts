import { NextRequest, NextResponse } from "next/server";
import {
  deleteProduct,
  getProductById,
  updateProductQuantity,
} from "@/services/productService";
import {
  validateProductId,
  validateBody,
  returnNotFoundOrSuccess,
} from "@/lib/validation";

export async function GET(
  _: NextRequest,
  { params }: { params: { productId: string } }
) {
  const { productId } = await params;
  const errorProductId = validateProductId(productId);
  if (errorProductId) return errorProductId;

  const data = await getProductById(productId);
  return NextResponse.json({ data }, { status: 200 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  const { productId } = await params;
  const errorProductId = validateProductId(productId);
  if (errorProductId) return errorProductId;

  const body = await req.json();
  const errorBody = validateBody(body);
  if (errorBody) return errorBody;

  const success = await updateProductQuantity(productId, body.quantity);
  return returnNotFoundOrSuccess(
    `The quantity of product ${productId} has been successfully updated`,
    success
  );
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { productId: string } }
) {
  const { productId } = await params;
  const errorProductId = validateProductId(productId);
  if (errorProductId) return errorProductId;

  const success = await deleteProduct(productId);
  return returnNotFoundOrSuccess(
    `Product ${productId} has been successfully deleted`,
    success
  );
}
