import { safeFetch } from "@/app/utils/safeFetch";
import { ProductData } from "@/app/product/type";

export const createProduct = async (formData: ProductData) => {
  return await safeFetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

export const updateProduct = async (formData: ProductData) => {
  return await safeFetch(`/api/products/${formData.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
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
