"use client";

import { FieldErrors, useForm } from "react-hook-form";
import { useState } from "react";
import { createProduct, updateProduct } from "../product/service";
import { defaultValues } from "../utils/formConfig";

const useProductForm = ({
  type,
  product,
  handleEditComplete,
  setErrorMessage,
}: {
  type?: string;
  product?: any;
  handleEditComplete?: () => void;
  setErrorMessage?: (message: string | null) => void;
} = {}) => {
  const value = product || defaultValues;
  const { register, handleSubmit, reset } = useForm({ defaultValues: value });
  const onValid = async (data: FormData) => {
    if (type === "add") {
      await createProduct(data);
      reset(defaultValues);
      setErrorMessage?.(null);
    }
    if (type === "edit") {
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
