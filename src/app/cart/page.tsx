import db from "@/lib/db";

const Cart = () => {
  // TODO - UNDERSTAND
  const cart = db
    .prepare(
      `SELECT 
        CartItem.quantity,
        Product.productName,
        Product.unitPrice
        FROM CartItem
        JOIN Product ON CartItem.productId = Product.id
        JOIN Cart ON CartItem.cartId = Cart.id
        WHERE CartItem.cartId = ?`
    )
    .all("06788eb8-264a-4684-8bb6-0fd67390ea05");
  return (
    <>
      <div>
        {/* TODO - reusable display  */}
        {cart?.map((x) => {
          return (
            <div className="flex">
              <div>name : {x.productName}</div>
              <div>quantity : {x.quantity}</div>
              <div>unit price : {x.unitPrice}</div>
            </div>
          );
        })}
      </div>
      {/* TODO - Delete each item */}
      {/* TODO - Delete all the items */}
      {/* TODO - Total price  */}
    </>
  );
};

export default Cart;
