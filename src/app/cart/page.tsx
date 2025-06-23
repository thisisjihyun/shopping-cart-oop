"use client";

import { useEffect, useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);
  return (
    <div>
      {cart?.map((item, i) => (
        <div key={i} className="flex">
          <div>name: {item.productName}</div>
          <div>quantity: {item.quantity}</div>
          <div>unit price: {item.unitPrice}</div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
