"use client";

import { useState } from "react";

import EditablRow from "@/app/components/Form";
import { DeleteButton, EditButton } from "@/app/components/Buttons";
import { FormData } from "@/app/product/type";
import { fetchProductById } from "@/app/product/service";
import { FormType } from "@/app/utils/formConfig";

const List = ({ product }: { product: FormData }) => {
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [currentProduct, setCurrentProduct] = useState<FormData>(product);

  const handleEditComplete = async () => {
    const updatedProduct = await fetchProductById(product.productId);
    setCurrentProduct(updatedProduct.data);
    setEditingProductId(null);
  };

  const Row = (
    <div
      key={currentProduct.productId}
      className="grid grid-cols-6 p-2 border-b"
    >
      <div>{currentProduct.productId}</div>
      <div>{currentProduct.productName}</div>
      <div>{currentProduct.quantity}</div>
      <div>{currentProduct.unitPrice}</div>
      <EditButton
        productId={currentProduct.productId}
        setEditingProductId={setEditingProductId}
      />
      <DeleteButton productId={currentProduct.productId} />
    </div>
  );

  return (
    <>
      {editingProductId ? (
        <EditablRow
          className="flex"
          type={FormType.EDIT}
          product={product}
          handleEditComplete={handleEditComplete}
        />
      ) : (
        Row
      )}
    </>
  );
};

export default List;
