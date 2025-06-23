import db from "@/lib/db";
import { addItemToCart } from "@/services/cartService";

export async function POST(request: Request) {
  const body = await request.json();
  await addItemToCart(body);
  return new Response(JSON.stringify({ message: "Item added to cart" }), {
    status: 200,
  });
}

// Question - if cartId is always same, why do we need?
// is it best to leave here? or move the db code somewhere else?
export async function GET(request: Request) {
  const cart = db
    .prepare(
      `SELECT 
  CartItem.quantity,
  CartItem.cartId,
  Product.id as productId,
  Product.productName,
  Product.unitPrice
  FROM CartItem
  JOIN Product ON CartItem.productId = Product.id`
    )
    .all();
  return new Response(JSON.stringify(cart), {
    status: 200,
  });
}
