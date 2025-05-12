"use client";
import { useRouter } from "next/navigation";
import { safeFetch } from "../utils/safeFetch";

const DeleteButton = ({ productId }: { productId: string }) => {
  const router = useRouter();

  const deleteProduct = async (productId?: string | null) => {
    const endpoint = productId ? `api/products/${productId}` : "api/products";
    const data = await safeFetch(endpoint, {
      method: "DELETE",
    });

    if (data) {
      router.refresh();
    }
  };

  if (productId) {
    return (
      <button
        className="w-1/2 bg-red-500 text-white font-semibold rounded hover:bg-red-700 transition-colors duration-200"
        onClick={() => deleteProduct(productId)}
      >
        Delete
      </button>
    );
  } else {
    return (
      <button
        className="bg-red-500 text-white font-semibold rounded hover:bg-red-700 transition-colors duration-200"
        onClick={() => deleteProduct()}
      >
        Delete
      </button>
    );
  }
};

// TODO - edit error verification
const EditButton = ({
  productId,
  setEditingProductId,
}: {
  productId: string;
  setEditingProductId: (productId: string) => void;
}) => {
  return (
    <button
      className="w-1/2 bg-green-600 text-white font-semibold rounded hover:bg-grey-700 transition-colors duration-200"
      onClick={() => setEditingProductId(productId)}
    >
      Edit
    </button>
  );
};

const SaveButton = () => {
  return (
    <button
      type="submit"
      className="bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors duration-200"
    >
      Save
    </button>
  );
};

export { DeleteButton, EditButton, SaveButton };
