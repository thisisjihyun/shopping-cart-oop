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

  calculateTotalPrice() {}
  clearAllItems() {}
}

export default Cart;
