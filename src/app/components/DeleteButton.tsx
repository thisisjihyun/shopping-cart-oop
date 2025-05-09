"use client";

// TODO - REFRESH WHEN IT CHANGES
const DeleteButton = ({ productId }) => {
  const deleteAll = () => {
    fetch("api/products", {
      method: "DELETE",
    });
  };

  const deleteProduct = () => {
    fetch(`api/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  if (productId) {
    return <button onClick={deleteProduct}>Delete</button>;
  } else {
    return <button onClick={deleteAll}>Delete</button>;
  }
};

export default DeleteButton;
