import CartItem from "@/domain/entities/CartItem";
import db from "@/lib/db";
import { getOrCreateCart } from "./cartHelpers";
import { v4 as uuidv4 } from "uuid";
// business logics - DB connections, extra logics (calc)

export type CartItemWithProduct = {
  quantity: number;
  cartId: string;
  productId: string;
  productName: string;
  unitPrice: number;
};

// TODO - When a product is deleted on admin side, it should be inavailable in Cart
// is it better to delete without any notification? or should I inform the customer?
// if so, then how can i do that? message queue?
export const addItemToCart = async (item: any) => {
  const cart = getOrCreateCart(item.userId);

  const newCartItemId = uuidv4();
  const newCartItem = new CartItem(
    newCartItemId,
    item.id,
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

export const getCartItems = () => {
  return db
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
};

export const calculateTotal = (cart: CartItemWithProduct[]) => {
  return cart.reduce((acc, current) => {
    return acc + current.quantity * current.unitPrice;
  }, 0);
};

// raw SQL return any[] or unknown[] unless you explicitly type the result
export const getCartWithTotal = () => {
  const cartItems = getCartItems() as CartItemWithProduct[];
  const totalCartPrice = calculateTotal(cartItems);
  return { cartItems, totalCartPrice };
};
