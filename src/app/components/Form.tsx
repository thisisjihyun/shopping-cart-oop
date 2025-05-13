"use client";

import { useState } from "react";
import FormInput from "@/app/components/FormInput";
import { formFields, FormType } from "@/app/utils/formConfig";
import useProductForm from "@/app/hooks/useProductForm";
import { SaveButton, SubmitButton } from "@/app/components/Buttons";
import { FormData } from "@/app/product/type";

interface FormProps {
  className: string;
  type: FormType;
  product: FormData;
  handleEditComplete: () => void;
}

const Form = ({ className, type, product, handleEditComplete }: FormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(
    null
  );
  const { handleSubmit, onInvalid, onValid, register } = useProductForm({
    type,
    product,
    handleEditComplete,
    setErrorMessage,
  });

  return (
    <>
      <form onSubmit={handleSubmit(onValid, onInvalid)} className={className}>
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
        {type === "edit" ? <SaveButton /> : <SubmitButton />}
      </form>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </>
  );
};

export default Form;
