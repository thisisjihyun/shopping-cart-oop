// should not be immutable

class Quantity {
  private readonly value: number;

  constructor(value: number) {
    if (value < 0 || value > 100)
      throw new Error("Quantity can not be negative or more than 100");
    this.value = value;
  }

  // public getValue() {
  //   return this.value;
  // }

  // public increase(): Quantity {
  //   return new Quantity(this.value + 1);
  // }

  // public decrease(): Quantity {
  //   return new Quantity(this.value - 1);
  // }
}

export default Quantity;
