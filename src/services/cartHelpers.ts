import Cart from "@/domain/entities/Cart";
import CartItem from "@/domain/entities/CartItem";
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// TODO - there is no sign up route yet so it needs to set up Cart manually
export const getOrCreateCart = (userId: string) => {
  let cart: Cart;
  const userCart = db
    .prepare(`SELECT * FROM Cart WHERE userId = ?`)
    .get(userId);

  if (!userCart) {
    const newCartId = uuidv4();
    db.prepare(`INSERT INTO Cart (id, userId) VALUES (?,?)`).run(
      newCartId,
      userId
    );
    cart = new Cart(newCartId, userId, []);
  } else {
    const cartItems = db
      .prepare(`SELECT * FROM CartItem WHERE cartId = ?`)
      .all(userCart.id);
    const items = cartItems.map((item) => {
      return new CartItem(item.id, item.productId, userCart.id, item.quantity);
    });
    cart = new Cart(userCart.id, userCart.userId, items);
  }
  return cart;
};


