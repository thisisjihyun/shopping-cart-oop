import db from "@/lib/db";
import { addItemToCart } from "@/services/cartService";

export async function POST(request: Request) {
  const body = await request.json();
  await addItemToCart(body);
  return new Response(JSON.stringify({ message: "Item added to cart" }), {
    status: 200,
  });
}

export async function GET(request: Request) {
  const cart = db.prepare(`SELECT * FROM CartItem`).all();
  return new Response(JSON.stringify(cart), {
    status: 200,
  });
}
