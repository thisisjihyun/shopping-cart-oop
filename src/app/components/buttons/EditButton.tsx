"use client";

const EditButton = ({ productId, setEditingProductId }) => {
  return <button onClick={() => setEditingProductId(productId)}>Edit</button>;
};

export default EditButton;
