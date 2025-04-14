import Quantity from "../valueObjects/Quantity.js";
 import { v4 as uuidv4 } from "uuid";
 
 interface CartItemProps {
   productId: string;
   productName: string;
   quantity: Quantity;
   unitPrice: number;
   cartItemId?: string;
 }
 
 class CartItem {
   public readonly productId: string;
   public readonly productName: string;
   public readonly quantity: Quantity;
   public readonly unitPrice: number;
   public readonly cartItemId: string;
 
   constructor({
     productId,
     productName,
     quantity,
     unitPrice,
     cartItemId,
   }: CartItemProps) {
     this.productId = productId;
     this.productName = productName;
     this.quantity = quantity;
     this.unitPrice = unitPrice;
     this.cartItemId = cartItemId ?? uuidv4();
     // cartItemId to be used otherwise everytime updateQunatity called, it will regenerate a new one
   }
 
   public updateQuantity(quantity: Quantity) {
     return new CartItem({ ...this, quantity });
   }
 }
 
 export default CartItem;