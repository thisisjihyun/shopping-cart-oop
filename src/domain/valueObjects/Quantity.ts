// should not be immutable

class Quantity {
  private readonly quantity: number;

  constructor({ quantity }: { quantity: number }) {
    if (quantity < 0) throw new Error("Quantity can not be negative");
    if (quantity > 100) throw new Error("Quantity can not be more than 100");
    this.quantity = quantity;
  }

  // reading the value, because quantity can't be accessable directly in other place
  public get value(): number {
    return this.quantity;
  }

  public increase(): Quantity {
    return new Quantity({ quantity: this.quantity + 1 });
  }

  public decrease(): Quantity {
    return new Quantity({ quantity: this.quantity - 1 });
  }
}

export default Quantity;
