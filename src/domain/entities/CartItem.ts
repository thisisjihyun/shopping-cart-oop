class CartItem {
  constructor(
    public id: string,
    public productId: string,
    public cartId: string,
    public quantity: number = 1
  ) {}

  toRow() {
    return [this.id, this.productId, this.cartId, this.quantity];
  }

  increment() {
    this.quantity++;
  }
}

export default CartItem;
