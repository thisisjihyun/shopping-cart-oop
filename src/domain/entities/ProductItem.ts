import { v4 as uuidv4 } from "uuid";

export interface ProductItemProps {
  id?: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

class ProductItem {
  public readonly id: string;
  public readonly productName: string;
  public readonly quantity: number;
  public readonly unitPrice: number;

  constructor({
    productName,
    quantity,
    unitPrice,
    id,
  }: ProductItemProps) {
    this.id = id ?? uuidv4();
    this.productName = productName;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }

  toObject() {
    return {
      id: this.id,
      productName: this.productName,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
    };
  }

  updateQuantity(): ProductItem {
    return new ProductItem({
      ...this,
      quantity: this.quantity + 1,
    });
  }
}

export default ProductItem;
