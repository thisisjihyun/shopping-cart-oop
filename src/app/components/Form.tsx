"use client";

import FormInput from "../components/FormInput";
import { formFields } from "../utils/formConfig";
import useProductForm from "../hooks/useProductForm";
import { SaveButton, SubmitButton } from "../components/Buttons";
import { useState } from "react";

const Form = ({ className, type, product, handleEditComplete }) => {
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
