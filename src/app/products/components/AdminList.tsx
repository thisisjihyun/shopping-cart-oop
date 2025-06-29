"use client";

import { useState } from "react";

import EditablRow from "@/app/components/Form";
import { DeleteButton, EditButton } from "@/app/components/Buttons";
import { ProductData } from "@/app/product/type";
import { fetchProductById } from "@/app/product/service";
import { FormType } from "@/app/utils/formConfig";

const AdminList = ({ product }: { product: ProductData }) => {
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [currentProduct, setCurrentProduct] = useState<ProductData>(product);
  const handleEditComplete = async () => {
    const updatedProduct = await fetchProductById(product.id);
    setCurrentProduct(updatedProduct.data);
    setEditingProductId(null);
  };

  const Row = (
    <div className="grid grid-cols-6 p-2 border-b break-words">
      <div>{currentProduct.productName}</div>
      <div>{currentProduct.quantity}</div>
      <div>{currentProduct.unitPrice}</div>
      <div>{currentProduct.description}</div>
      <EditButton
        id={currentProduct.id}
        setEditingProductId={setEditingProductId}
      />
      <DeleteButton id={currentProduct.id} />
    </div>
  );

  return (
    <>
      {editingProductId ? (
        <EditablRow
          className="flex"
          type={FormType.EDIT}
          product={currentProduct}
          handleEditComplete={handleEditComplete}
        />
      ) : (
        Row
      )}
    </>
  );
};

export default AdminList;
