import Quantity from "../valueObjects/Quantity.ts";
import CartItem from "./CartItem.ts";

interface CartProps {
  items: CartItem[];
}

class Cart {
  public items: CartItem[];

  constructor({ items }: CartProps) {
    this.items = items;
  }

  addCartItem(cartItem: CartItem) {
    const existingCartItem = this.items.find(
      (product) => product.productId == cartItem.productId
    );
    if (existingCartItem) {
      const existingItemIndex = this.items.findIndex(
        (index) => index.productId === cartItem.productId
      );

      const updatedQuantity = existingCartItem.quantity.increase();

      const updatedCartItem = new CartItem(existingCartItem).updateQuantity(
        updatedQuantity
      );
      this.items[existingItemIndex] = updatedCartItem;
      return this.items;
    } else {
      this.items.push(cartItem);
      return this.items;
    }
  }
  updateCartItem() {}
  deleteCartItem(cartItemId: string) {
    const matchedCartItem = this.items.findIndex(
      (product) => product.productId == cartItemId
    );
    // check if cart item exists first
    if (matchedCartItem === -1) return this.items;
    this.items.splice(matchedCartItem, 1);
    return this.items;
  }
  calculateTotalPrice() {
    return this.items.reduce(
      (total, item) => total + item.unitPrice * item.quantity.value,
      0
    );
  }
  clearAllItems() {}
}

export default Cart;
