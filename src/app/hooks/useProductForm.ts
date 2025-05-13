"use client";

import { FieldErrors, useForm } from "react-hook-form";
import { createProduct, updateProduct } from "@/app/product/service";
import { defaultValues, FormType } from "@/app/utils/formConfig";
import { FormData } from "@/app/product/type";

interface UseProductFormProps {
  type: FormType;
  product?: any;
  handleEditComplete?: () => void;
  setErrorMessage?: (message: string | null | undefined) => void;
}

const useProductForm = ({
  type,
  product,
  handleEditComplete,
  setErrorMessage,
}: UseProductFormProps) => {
  const value = product || defaultValues;
  const { register, handleSubmit, reset } = useForm({ defaultValues: value });
  
  const onValid = async (data: FormData) => {
    if (type === FormType.ADD) {
      await createProduct(data);
      reset(defaultValues);
      setErrorMessage?.(null);
    }
    if (type === FormType.EDIT) {
      await updateProduct(data);
      handleEditComplete?.();
    }
  };

  const onInvalid = (errors: FieldErrors<FormData>) => {
    return Object.values(errors).forEach((value) => {
      if (value.type === "required") setErrorMessage?.(value.message);
      if (value.type === "validate") setErrorMessage?.(value.message);
    });
  };

  return {
    setErrorMessage,
    onValid,
    onInvalid,
    handleSubmit,
    register,
  };
};

export default useProductForm;
