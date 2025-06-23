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
  return await safeFetch(`/api/products/${formData.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: formData.id,
      productName: formData.productName,
      quantity: Number(formData.quantity),
      unitPrice: Number(formData.unitPrice),
    }),
  });
};

export const deleteProduct = async (id?: string | null) => {
  const endpoint = id ? `/api/products/${id}` : "/api/products";
  return await safeFetch(endpoint, {
    method: "DELETE",
  });
};

export const fetchProductById = async (id: string) => {
  return await safeFetch(`/api/products/${id}`, {
    method: "GET",
  });
};
