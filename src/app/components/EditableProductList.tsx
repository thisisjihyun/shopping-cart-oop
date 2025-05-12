"use client";

import { useState } from "react";

import DeleteButton from "./buttons/DeleteButton";
import EditButton from "./buttons/EditButton";
import EditableRow from "../components/EditableRow";

const EditableProductList = ({ product }) => {
  const [editingProductId, setEditingProductId] = useState(null);
  return (
    <>
      {editingProductId ? (
        <EditableRow product={product} setEditingProductId={setEditingProductId} />
      ) : (
        <div key={product.productId} className="grid grid-cols-6 p-2 border-b">
          <div>{product.productId}</div>
          <div>{product.productName}</div>
          <div>{product.quantity}</div>
          <div>{product.unitPrice}</div>
          <EditButton
            productId={product.productId}
            setEditingProductId={setEditingProductId}
          />
          <DeleteButton productId={product.productId} />
        </div>
      )}
    </>
  );
};

export default EditableProductList;
