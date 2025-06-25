"use client";

import { CartItemWithProduct } from "@/services/cartService";
import { useEffect, useState } from "react";

type Cart = {
  cartItems: CartItemWithProduct[];
  totalCartPrice: number;
};

const Cart = () => {
  const [data, setData] = useState<Cart | null>(null);

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <div>
        {data?.cartItems?.map((item, i) => (
          <div key={i} className="flex">
            <div>name: {item.productName}</div>
            <div>quantity: {item.quantity}</div>
            <div>unit price: {item.unitPrice}</div>
          </div>
        ))}
      </div>
      <div>total price: €{data?.totalCartPrice}</div>
    </>
  );
};

export default Cart;
