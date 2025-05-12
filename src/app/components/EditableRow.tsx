"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import FormInput from "./FormInput";
import { SaveButton } from "./Buttons";
import { safeFetch } from "../utils/safeFetch";
import { formFields } from "../utils/formConfig";
import { FormData } from "../../app/product/type";

const EditableRow = ({
  product,
  setEditingProductId,
}: {
  product: FormData;
  setEditingProductId: (productId: string | null) => void;
}) => {
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
  const onSubmit = async (formData: FormData) => {
    const data = await safeFetch(`/api/products/${formData.productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: formData.productId,
        productName: formData.productName,
        quantity: Number(formData.quantity),
        unitPrice: Number(formData.unitPrice),
      }),
    });
    if (data) {
      setEditingProductId(null);
      router.refresh();
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
      <SaveButton />
    </form>
  );
};

export default EditableRow;
