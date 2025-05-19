import CartItem from "./CartItem";

// no DB code here - only business logic
class Cart {
  constructor(
    public id: string,
    public userId: string,
    public items: CartItem[] = []
  ) {}

  addItem(newItem: CartItem) {
    const existingItem = this.items.find(
      (item) => item.productId === newItem.productId
    );
    if (existingItem) {
      existingItem.increment();
    } else {
      this.items.push(newItem);
    }
  }

  getItem(productId: string): CartItem | undefined {
    return this.items?.find((item) => item.productId === productId);
  }
}

export default Cart;
