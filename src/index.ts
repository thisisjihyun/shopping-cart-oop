import Cart from "../shopping-cart-api/src/domain/entities/Cart.js";
import CartItem from "../shopping-cart-api/src/domain/entities/CartItem.js";
import Quantity from "../shopping-cart-api/src/domain/valueObjects/Quantity.js";

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
const y = cart.clearAllItems()
console.log("here -", y);
