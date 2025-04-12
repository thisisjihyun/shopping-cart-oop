import Cart from "../shopping-cart-api/src/domain/entities/Cart.js";
import CartItem from "../shopping-cart-api/src/domain/entities/CartItem.js";
import Quantity from "../shopping-cart-api/src/domain/valueObjects/Quantity.js";

const cartItem1 = new CartItem({
  productId: "12345",
  productName: "test",
  quantity: new Quantity({ quantity: 1 }),
  unitPrice: 123,
});

const cartItem2 = new CartItem({
  productId: "123",
  productName: "test",
  quantity: new Quantity({ quantity: 1 }),
  unitPrice: 123,
});

const cart = new Cart({
  items: [cartItem1, cartItem2],
});
const x = cart.addCartItem(cartItem1);
<<<<<<< HEAD
const y = cart.clearAllItems()
console.log("here -", y);
=======
const y = cart.addCartItem(cartItem1);
const z = cart.addCartItem(cartItem1);
console.log("here -", z);
>>>>>>> parent of 7e9540c (Add calcualteTotalPrice)
