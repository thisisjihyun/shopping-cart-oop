"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
// TODO - Improve API side
// TODO - Verify type

const ProductPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const { handleSubmit, reset, register } = useForm();

  const onValid = (data) => {
    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: data.productId,
        productName: data.productName,
        quantity: data.quantity,
        unitPrice: data.unitPrice,
      }),
    });
    reset({
      productId: "",
      productName: "",
      quantity: 1,
      unitPrice: "",
    });
    setErrorMessage(null);
  };

  const onInvalid = (errors) => {
    return Object.values(errors).forEach((value) => {
      if (value.type === "required") setErrorMessage(value?.message);
      if (value.type === "validate") setErrorMessage(value?.message);
    });
  };

  return (
    <>
      <div className="p-6 text-lg font-semibold rounded-lg text-center">
        Add a product
      </div>
      <form
        onSubmit={handleSubmit(onValid, onInvalid)}
        className="w-full max-w-md mx-auto p-6 rounded-lg space-y-4"
      >
        <FormInput
          id="productId"
          label="Product Id"
          inputProps={{
            ...register("productId", {
              required: "This field is required",
            }),
          }}
        />
        <FormInput
          id="productName"
          label="Product Name"
          inputProps={{
            ...register("productName", {
              required: "This field is required",
            }),
          }}
        />
        <FormInput
          id="quantity"
          label="Quantity"
          inputProps={{
            ...register("quantity", {
              valueAsNumber: true,
              validate: (value) =>
                (value > 0 && !isNaN(value)) ||
                "Must be a number greater than 0",
            }),
          }}
          defaultValue={1}
        />
        <FormInput
          id="unitPrice"
          label="Unit Price"
          inputProps={{
            ...register("unitPrice", {
              required: "This field is required",
              valueAsNumber: true,
              validate: (value) =>
                (value > 0 && !isNaN(value)) ||
                "Must be a number greater than 0",
            }),
          }}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Submit
        </button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </>
  );
};

export default ProductPage;
