"use client";
import { useRouter } from "next/navigation";
import { safeFetch } from "../utils/safeFetch";
import useProductForm from "../hooks/useProductForm";

const BaseButton = ({
  className,
  onClick,
  name,
}: {
  className: string;
  onClick?: () => void;
  name: string;
}) => {
  return (
    <button
      className={`px-4 py-2 font-semibold rounded transition-colors duration-200 ${className}`}
      onClick={onClick}
      type="submit"
    >
      {name}
    </button>
  );
};

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

  return productId ? (
    <BaseButton
      className="w-1/2 bg-red-500 hover:bg-red-700"
      onClick={() => deleteProduct(productId)}
      name="Delete"
    ></BaseButton>
  ) : (
    <BaseButton
      className="bg-red-500 hover:bg-red-700"
      onClick={() => deleteProduct()}
      name="Delete"
    ></BaseButton>
  );
};

const EditButton = ({ productId }: { productId: string }) => {
  const { setEditingProductId } = useProductForm();
  return (
    <BaseButton
      className="w-1/2 bg-green-600 hover:bg-green-700"
      onClick={() => setEditingProductId(productId)}
      name="Edit"
    ></BaseButton>
  );
};

const SaveButton = () => {
  return (
    <BaseButton
      className="bg-blue-600 hover:bg-blue-700"
      name="Save"
    ></BaseButton>
  );
};

export { DeleteButton, EditButton, SaveButton };
