import Cart from "./domain/entities/Cart.ts";
import CartItem from "./domain/entities/CartItem.ts";
import Quantity from "./domain/valueObjects/Quantity.ts";

const cartItem1 = new CartItem({
  productId: "12345",
  productName: "test",
  quantity: new Quantity({ quantity: 1 }),
  unitPrice: 100,
});

const cartItem2 = new CartItem({
  productId: "123",
  productName: "test",
  quantity: new Quantity({ quantity: 1 }),
  unitPrice: 200,
});

const cart = new Cart({
  items: [cartItem1, cartItem2],
});
const x = cart.addCartItem(cartItem1);
const y = cart.addCartItem(cartItem1);
const z = cart.addCartItem(cartItem1);
const total = cart.calculateTotalPrice();
console.log("here -", total);
