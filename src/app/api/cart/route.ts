import { z } from "zod";

import db from "@/lib/db";
import { addItemToCart } from "@/services/cartService";
import { NextRequest, NextResponse } from "next/server";

// run time validation
const CartItemSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  productName: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
});

export async function GET() {
  const cart = db.prepare("SELECT * FROM CartItem").all();
  return NextResponse.json({ cart }, { status: 200 });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const result = CartItemSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Invalid cart item",
        issues: result.error.issues,
      },
      { status: 400 }
    );
  }
  const validatedData = result.data;
  const updatedCart = await addItemToCart(validatedData);
  return NextResponse.json({ items: updatedCart }, { status: 200 });
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  db.prepare("DELETE FROM CartItem").run();
  return new NextResponse(null, { status: 204 });
}
