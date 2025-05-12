"use client";

const EditButton = ({ productId, setEditingProductId }) => {
  return (
    <button
      className="w-1/2 bg-green-600 text-white font-semibold rounded hover:bg-grey-700 transition-colors duration-200"
      onClick={() => setEditingProductId(productId)}
    >
      Edit
    </button>
  );
};

export default EditButton;
