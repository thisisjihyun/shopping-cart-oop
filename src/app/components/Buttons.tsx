"use client";

import { useRouter } from "next/navigation";
import { deleteProduct } from "@/app/product/service";
import { ProductData } from "@/app/product/type";

interface BaseButtonProps {
  className: string;
  onClick?: () => void;
  name: string;
}

const BaseButton = ({ className, onClick, name }: BaseButtonProps) => {
  return (
    <button
      className={`h-12 px-4 py-2 text-white font-semibold rounded transition-colors duration-200 ${className}`}
      onClick={onClick}
      type="submit"
    >
      {name}
    </button>
  );
};

const DeleteButton = ({ id }: { id?: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const data = await deleteProduct(id);
    if (data) router.refresh();
  };

  return id ? (
    <BaseButton
      className="w-1/2 bg-red-500 hover:bg-red-700 justify-self-center"
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
  id,
  setEditingProductId,
}: {
  id?: string;
  setEditingProductId: (id?: string) => void;
}) => {
  return (
    <BaseButton
      className="w-1/2 bg-green-600 hover:bg-green-700 justify-self-center"
      onClick={() => setEditingProductId(id)}
      name="Edit"
    ></BaseButton>
  );
};

const SaveButton = () => {
  return (
    <BaseButton
      className="bg-blue-600 hover:bg-blue-700 justify-self-center"
      name="Save"
    ></BaseButton>
  );
};

const SubmitButton = () => {
  return (
    <BaseButton
      className="bg-blue-600 hover:bg-blue-700 mx-auto block"
      name="Submit"
    ></BaseButton>
  );
};

const AddToCartButton = ({ product }: { product: ProductData }) => {
  const handleAddToCart = () => {
    fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: product.id,
        quantity: 1,
        userId: 1,
      }),
    });
  };
  return (
    <BaseButton
      className="bg-blue-600 hover:bg-blue-700 self-center"
      name="Add to Cart"
      onClick={handleAddToCart}
    ></BaseButton>
  );
};
export { DeleteButton, EditButton, SaveButton, SubmitButton, AddToCartButton };
