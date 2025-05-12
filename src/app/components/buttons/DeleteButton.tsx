"use client";
import { useRouter } from "next/navigation";

// TOOD - make a general try and catch
const DeleteButton = ({ productId }) => {
  const router = useRouter();

  const deleteAll = async () => {
    try {
      const res = await fetch("api/products", {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete all products");
      }
      router.refresh();
    } catch (error) {
      console.log("Error deleting all products", error);
    }
  };

  const deleteProduct = async () => {
    try {
      const res = await fetch(`api/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete the product");
      }
      router.refresh();
    } catch (error) {
      console.log("Error deleting product", error);
    }
  };

  if (productId) {
    return (
      <button
        className="w-1/2 bg-red-500 text-white font-semibold rounded hover:bg-red-700 transition-colors duration-200"
        onClick={deleteProduct}
      >
        Delete
      </button>
    );
  } else {
    return (
      <button
        className="bg-red-500 text-white font-semibold rounded hover:bg-red-700 transition-colors duration-200"
        onClick={deleteAll}
      >
        Delete
      </button>
    );
  }
};

export default DeleteButton;
