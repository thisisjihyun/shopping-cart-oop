import { FormData } from "./type";

export const createProduct = async (data: FormData) => {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to create product");
  }

  return res.json();
};
