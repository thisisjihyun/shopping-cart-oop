"use client";

import { useForm } from "react-hook-form";

const EditableRow = ({ product }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      productId: product.productId,
      productName: product.productName,
      quantity: product.quantity,
      unitPrice: product.unitPrice,
    },
  });

  const onSubmit = (data) => {
    fetch(`/api/cart/items/${data.productId}`, {
      method: "PATCH",
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
      {/* TODO - extract to make a separate label component */}
      <form className="bg-yellow-500" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="productId">
          Product Id <input {...register("productId")} />
        </label>
        <label htmlFor="productName">
          Product Name <input {...register("productName")} />
        </label>
        <label htmlFor="quantity">
          Quantity <input {...register("quantity")} />
        </label>
        <label htmlFor="unitPrice">
          Unit Price <input {...register("unitPrice")} />
        </label>
        <button type="submit" />
      </form>
    </>
  );
};

export default EditableRow;
