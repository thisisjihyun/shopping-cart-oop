"use client";

import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { FormData } from "./type";

import FormInput from "../components/FormInput";
import { createProduct } from "./service";
import { defaultValues, formFields } from "./formConfig";

// TODO - Separate form (hooks + compoennts)
// file structure
const ProductPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(
    null
  );
  const { handleSubmit, reset, register } = useForm<FormData>({
    defaultValues,
  });

  const onValid = async (data: FormData) => {
    try {
      await createProduct(data);
      reset(defaultValues);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const onInvalid = (errors: FieldErrors<FormData>) => {
    return Object.values(errors).forEach((value) => {
      if (value.type === "required") setErrorMessage(value.message);
      if (value.type === "validate") setErrorMessage(value.message);
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
        {formFields.map((field, index) => (
          <FormInput
            key={index}
            id={field.id}
            label={field.label}
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
