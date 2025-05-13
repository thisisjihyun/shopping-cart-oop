"use client";
import { useRouter } from "next/navigation";
import { deleteProduct } from "../product/service";

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

  const handleDelete = async () => {
    const data = await deleteProduct(productId);
    if (data) router.refresh();
  };

  return productId ? (
    <BaseButton
      className="w-1/2 bg-red-500 hover:bg-red-700"
      onClick={handleDelete}
      name="Delete"
    ></BaseButton>
  ) : (
    <BaseButton
      className="bg-red-500 hover:bg-red-700"
      onClick={handleDelete}
      name="Delete"
    ></BaseButton>
  );
};

const EditButton = ({
  productId,
  setEditingProductId,
}: {
  productId: string;
  setEditingProductId: (productId: string) => void;
}) => {
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

const SubmitButton = () => {
  return (
    <BaseButton
      className="bg-blue-600 hover:bg-blue-700"
      name="Submit"
    ></BaseButton>
  );
};

export { DeleteButton, EditButton, SaveButton, SubmitButton };
