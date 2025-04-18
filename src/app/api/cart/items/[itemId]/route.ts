import { z } from "zod";

import { deleteItem } from "@/services/cartService";
import { NextRequest, NextResponse } from "next/server";

const itemIdSchema = z
  .string()
  .regex(/^\d+$/, "itemId should be a numeric string");

export async function DELETE(
  _: NextRequest,
  { params }: { params: { itemId: string } }
) {
  const { itemId } = await params;

  const result = itemIdSchema.safeParse(itemId);
  if (!result.success) {
    return NextResponse.json(
      { message: "Invalid cart item id", issues: result.error.issues },
      {
        status: 400,
      }
    );
  }

  const updatedCart = await deleteItem(itemId);

  if (!updatedCart) {
    return NextResponse.json(
      { message: `No matched item found` },
      { status: 404 }
    );
  }
  return NextResponse.json(
    { message: `Item ${itemId} is successfully deleted` },
    { status: 200 }
  );
}
