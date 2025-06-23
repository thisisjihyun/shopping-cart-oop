import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { addProduct } from "@/services/productService";

// run time validation
const ProductSchema = z.object({
  productName: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
});

export async function GET() {
  const product = db.prepare("SELECT * FROM Product").all();
  return NextResponse.json({ product }, { status: 200 });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const result = ProductSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Invalid product",
        issues: result.error.issues,
      },
      { status: 400 }
    );
  }
  const validatedData = result.data;
  const updatedProduct = await addProduct(validatedData);
  return NextResponse.json({ updatedProduct }, { status: 200 });
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  db.prepare("DELETE FROM Product").run();
  return new NextResponse(null, { status: 204 });
}
