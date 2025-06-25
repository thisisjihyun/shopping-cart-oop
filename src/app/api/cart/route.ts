import { addItemToCart, getCartWithTotal } from "@/services/cartService";

// route handlers
export async function POST(request: Request) {
  const body = await request.json();
  await addItemToCart(body);
  return new Response(JSON.stringify({ message: "Item added to cart" }), {
    status: 200,
  });
}

// Question - if cartId is always same, why do we need?
export async function GET(request: Request) {
  const { cartItems, totalCartPrice } = getCartWithTotal();
  return new Response(JSON.stringify({ cartItems, totalCartPrice }), {
    status: 200,
  });
}
