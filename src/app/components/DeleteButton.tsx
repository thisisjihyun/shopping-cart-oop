"use client";

// TODO - REFRESH WHEN IT CHANGES
const DeleteButton = ({ productId }) => {
  const deleteAll = () => {
    fetch("api/cart", {
      method: "DELETE",
    });
  };

  const deleteItem = () => {
    fetch(`api/cart/items/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  if (productId) {
    return <button onClick={deleteItem}>Delete Item</button>;
  } else {
    return <button onClick={deleteAll}>Delete</button>;
  }
};

export default DeleteButton;
