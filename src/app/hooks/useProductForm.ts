"use client";

import { FieldErrors, useForm } from "react-hook-form";
import { useState } from "react";
import { createProduct, updateProduct } from "../product/service";
import { defaultValues } from "../utils/formConfig";

const useProductForm = ({
  type,
  product,
}: { type?: string; product?: any } = {}) => {
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(
    null
  );
  const value = product || defaultValues;
  const { register, handleSubmit, reset } = useForm({ defaultValues: value });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  console.log("here upated", editingProductId);
  const onValid = async (data: FormData) => {
    try {
      // this should be different
      if (type === "add") {
        await createProduct(data);
        reset(defaultValues);
        setErrorMessage(null);
      }
      // if (type === "edit") {
      //   console.log("editing mode", data);

      //   await updateProduct(data);
      //   setEditingProductId(null);
      //   //   router.refresh();
      // }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const onInvalid = (errors: FieldErrors<FormData>) => {
    console.log("errors", errors);
    return Object.values(errors).forEach((value) => {
      if (value.type === "required") setErrorMessage(value.message);
      if (value.type === "validate") setErrorMessage(value.message);
    });
  };

  return {
    errorMessage,
    setErrorMessage,
    onValid,
    onInvalid,
    handleSubmit,
    register,
    editingProductId,
    setEditingProductId,
  };
};

export default useProductForm;
