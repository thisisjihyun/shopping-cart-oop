import Quantity from "../valueObjects/Quantity";
import CartItem from "./CartItem";

interface CartProps {
  items?: CartItem[];
}

class Cart {
  public items?: CartItem[];

  constructor(items: CartItem[]) {
    this.items = items;
  }
  toObject() {
    return {
      items: this.items?.map((item) => item.toObject()),
    };
  }

  addCartItem(cartItem: CartItem) {
    const existingCartItem = this.items?.find(
      (product) => product.productId === cartItem.productId
    );

    if (existingCartItem) {
      const existingItemIndex = this.items?.findIndex(
        (index) => index.productId === cartItem.productId
      );

      if (existingItemIndex !== -1) {
        const increasedQuantityItem = new CartItem(
          existingCartItem
        ).updateQuantity();
        this.items[existingItemIndex] = increasedQuantityItem;
        return this.items;
      }
    } else {
      this.items?.push(cartItem);
      return this.items;
    }
  }

  updateCartItem() {}
  deleteCartItem(id: string) {
    const matchedCartItem = this.items?.findIndex(
      (product) => product.productId == id
    );
    // check if the cart item exists first
    if (matchedCartItem === -1) return this.items;
    this.items.splice(matchedCartItem, 1);
    return this.items;
  }
  calculateTotalPrice() {}
  clearAllItems() {}
}

export default Cart;
