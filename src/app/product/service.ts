import { safeFetch } from "@/app/utils/safeFetch";
import { FormData } from "@/app/product/type";

export const createProduct = async (formData: FormData) => {
  return await safeFetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const updateProduct = async (formData: FormData) => {
  return await safeFetch(`/api/products/${formData.productId}`, {
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
};

export const deleteProduct = async (productId?: string | null) => {
  const endpoint = productId ? `/api/products/${productId}` : "/api/products";
  return await safeFetch(endpoint, {
    method: "DELETE",
  });
};

// TODO - POST to return the updated data
export const fetchProductById = async (productId: string) => {
  return await safeFetch(`/api/products/${productId}`, {
    method: "GET",
  });
};
