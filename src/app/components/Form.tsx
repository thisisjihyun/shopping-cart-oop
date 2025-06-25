"use client";

import FormInput from "@/app/components/FormInput";
import { formFields, FormType } from "@/app/utils/formConfig";
import useProductForm from "@/app/hooks/useProductForm";
import { SaveButton, SubmitButton } from "@/app/components/Buttons";
import { ProductData } from "@/app/product/type";

interface FormProps {
  className: string;
  type: FormType;
  product?: ProductData;
  handleEditComplete?: () => void;
}

const Form = ({ className, type, product, handleEditComplete }: FormProps) => {
  const { handleSubmit, onValid, register, errors } = useProductForm({
    type,
    product,
    handleEditComplete,
  });

  return (
    <>
      <form onSubmit={handleSubmit(onValid)} className={className}>
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
      {formFields.map((field, index) => (
        <div key={index} className="text-red-500">
          {errors[field.id]?.message}
        </div>
      ))}
    </>
  );
};

export default Form;
