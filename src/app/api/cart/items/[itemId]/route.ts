import { deleteItem, updateItemQuantity } from "@/services/cartService";
import { NextRequest } from "next/server";
import {
  validateItemId,
  validateBody,
  returnNotFoundOrSuccess,
} from "@/lib/validation";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const { itemId } = await params;
  const errorItemId = validateItemId(itemId);
  if (errorItemId) return errorItemId;

  const body = await req.json();
  const errorBody = validateBody(body);
  if (errorBody) return errorBody;

  const success = await updateItemQuantity(itemId, body.quantity);
  return returnNotFoundOrSuccess(
    `The quantity of Item ${itemId} has been successfully updated`,
    success
  );
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const { itemId } = await params;
  const errorItemId = validateItemId(itemId);
  if (errorItemId) return errorItemId;

  const success = await deleteItem(itemId);
  return returnNotFoundOrSuccess(
    `Item ${itemId} has been successfully deleted`,
    success
  );
}
