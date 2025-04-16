import Cart from "@/domain/entities/Cart";
import CartItem, { CartItemProps } from "@/domain/entities/CartItem";
import db from "@/lib/db";

const addItemToCart = async (cartItem: CartItemProps) => {
  const existingItems = db
    .prepare("SELECT * FROM CartItem")
    .all() as CartItemProps[];
  const items = existingItems?.map((item) => new CartItem(item));
  const cartInstance = new Cart(items);
  const newCartItem = new CartItem(cartItem);
  cartInstance.addCartItem(newCartItem);
  const updatedCart = cartInstance?.items?.map((item) => item.toObject());

  if (updatedCart) {
    for (const item of updatedCart) {
      const existing = db
        .prepare(
          `
        SELECT * FROM CartItem WHERE productId = ?
      `
        )
        .get(item.productId);

      if (existing) {
        const update = db.prepare(`
          UPDATE CartItem
          SET quantity = ?
          WHERE productId = ?
        `);
        update.run(item.quantity, item.productId);
      } else {
        const insert = db.prepare(`
          INSERT INTO CartItem (id, productId, productName, quantity, unitPrice)
          VALUES (@id, @productId, @productName, @quantity, @unitPrice)
        `);
        insert.run(item);
      }
    }
  }
  return updatedCart;
};

export default addItemToCart;
