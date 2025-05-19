import CartItem from "@/domain/entities/CartItem";
import db from "@/lib/db";
import { getOrCreateCart } from "./cartHelpers";
import { v4 as uuidv4 } from "uuid";

// TODO - When a product is deleted on admin side, it should be inavailable in Cart
export const addItemToCart = async (item: any) => {
  const cart = getOrCreateCart(item.userId);

  const newCartItemId = uuidv4();
  const newCartItem = new CartItem(
    newCartItemId,
    item.productId,
    cart.id,
    item.quantity
  );
  cart.addItem(newCartItem);
  const existingItem = cart.getItem(newCartItem.productId);

  if (!existingItem) {
    throw new Error("No matched item");
  }

  const existingItemInDb = db
    .prepare(`SELECT * FROM CartItem WHERE cartId = ? AND productId = ?`)
    .get(existingItem.cartId, existingItem.productId);

  if (existingItemInDb) {
    db.prepare(
      `UPDATE CartItem SET quantity = ? WHERE cartId = ? AND productId = ?`
    ).run(existingItem.quantity, existingItem.cartId, existingItem.productId);
  } else {
    db.prepare(
      `INSERT INTO CartItem (id, productId, cartId, quantity) VALUES (?, ?, ?, ?)`
    ).run(...existingItem.toRow());
  }
};
