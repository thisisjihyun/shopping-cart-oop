import { NextRequest, NextResponse } from "next/server";
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "@/services/productService";
import {
  validateProductId,
  validateBody,
  returnNotFoundOrSuccess,
} from "@/lib/validation";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const errorProductId = validateProductId(id);
  if (errorProductId) return errorProductId;

  const data = await getProductById(id);
  return NextResponse.json({ data }, { status: 200 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const errorProductId = validateProductId(id);
  if (errorProductId) return errorProductId;
  
  const body = await req.json();
  const errorBody = validateBody(body);
  if (errorBody) return errorBody;

  const success = await updateProduct(id, body);
  return returnNotFoundOrSuccess(
    `The product ${id} has been successfully updated`,
    success
  );
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const errorProductId = validateProductId(id);
  if (errorProductId) return errorProductId;

  const success = await deleteProduct(id);
  return returnNotFoundOrSuccess(
    `Product ${id} has been successfully deleted`,
    success
  );
}
