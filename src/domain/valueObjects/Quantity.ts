// should not be immutable

class Quantity {
  private readonly quantity: number;

  constructor({ quantity }: { quantity: number }) {
    if (quantity < 0) throw new Error("Quantity can not be negative");
    if (quantity > 100) throw new Error("Quantity can not be more than 100");
    this.quantity = quantity;
  }

  public increase(): Quantity {
    return new Quantity({ quantity: this.quantity + 1 });
  }

  public decrease(): Quantity {
    return new Quantity({ quantity: this.quantity - 1 });
  }
}

export default Quantity;
