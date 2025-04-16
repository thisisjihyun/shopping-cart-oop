import Quantity from "../valueObjects/Quantity";
import { v4 as uuidv4 } from "uuid";

export interface CartItemProps {
  id?: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

class CartItem {
  public readonly id: string;
  public readonly productId: string;
  public readonly productName: string;
  public readonly quantity: number;
  public readonly unitPrice: number;

  constructor({
    productId,
    productName,
    quantity,
    unitPrice,
    id,
  }: CartItemProps) {
    this.id = id ?? uuidv4();
    this.productId = productId;
    this.productName = productName;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }

  toObject() {
    return {
      id: this.id,
      productId: this.productId,
      productName: this.productName,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
    };
  }

  updateQuantity(): CartItem {
    return new CartItem({
      ...this,
      quantity: this.quantity + 1,
    });
  }
}

export default CartItem;
