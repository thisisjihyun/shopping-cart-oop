"use client";

import { useForm } from "react-hook-form";
import { createProduct, updateProduct } from "@/app/product/service";
import { defaultValues, FormType } from "@/app/utils/formConfig";
import { ProductData } from "@/app/product/type";

interface UseProductFormProps {
  type: FormType;
  product?: ProductData;
  handleEditComplete?: () => void;
  setErrorMessage?: (message: string | null | undefined) => void;
}

const useProductForm = ({
  type,
  product,
  handleEditComplete,
  setErrorMessage,
}: UseProductFormProps) => {
  console.log('here product',product)
  const value = product || defaultValues;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: value });

  const onValid = async (data: ProductData) => {
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

  return {
    setErrorMessage,
    onValid,
    handleSubmit,
    register,
    errors,
  };
};

export default useProductForm;
