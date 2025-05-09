"use client";

import { useForm } from "react-hook-form";
// TODO - VALIDATION

const ProductPage = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: data.productId,
        productName: data.productName,
        quantity: Number(data.quantity),
        unitPrice: Number(data.unitPrice),
      }),
    });
  };

  return (
    <>
      <div className="p-6 text-lg font-semibold rounded-lg text-center">
        Add a product
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto p-6 rounded-lg space-y-4"
      >
        <label htmlFor="productId">
          Product Id{" "}
          <input
            {...register("productId")}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
        <label htmlFor="productName">
          Product Name{" "}
          <input
            {...register("productName")}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
        <label htmlFor="quantity">
          Quantity{" "}
          <input
            {...register("quantity")}
            defaultValue={1}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
        <label htmlFor="unitPrice">
          Unit Price{" "}
          <input
            {...register("unitPrice")}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors duration-200"
        />
      </form>
    </>
  );
};

export default ProductPage;
