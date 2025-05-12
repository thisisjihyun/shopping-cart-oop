"use client";

import { useForm } from "react-hook-form";
import { formFields } from "../utils/formConfig";
import FormInput from "./FormInput";
import { useRouter } from "next/navigation";

const EditableRow = ({ product, setEditingProductId }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      productId: product.productId,
      productName: product.productName,
      quantity: product.quantity,
      unitPrice: product.unitPrice,
    },
  });

  // TODO - NICER UI
  const onSubmit = async (data) => {
    try {
      const res = await fetch(`/api/products/${data.productId}`, {
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
      if (!res.ok) {
        throw new Error("Failed to update the product");
      }
      setEditingProductId(null);
      router.refresh();
    } catch (error) {
      console.log("Error updating product", error);
    }
  };

  return (
    <form className="flex" onSubmit={handleSubmit(onSubmit)}>
      {formFields.map((field, index) => (
        <FormInput
          key={index}
          id={field.id}
          inputProps={{
            ...register(field.id, {
              required: "This field is required",
              valueAsNumber: field.type === "number",
              validate: (value) =>
                field.type === "number"
                  ? (value > 0 && !isNaN(value)) ||
                    "Must be a number greater than 0"
                  : true,
            }),
          }}
        />
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors duration-200"
      >
        Save
      </button>
    </form>
  );
};

export default EditableRow;
