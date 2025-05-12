import db from "@/lib/db";
import DeleteButton from "../components/buttons/DeleteButton";
import EditableProductList from "../components/EditableProductList";

const ProductsPage = async () => {
  const data = db.prepare("SELECT * FROM Product").all(); // directly accessing DB to get data

  return (
    <>
      <div className="grid grid-cols-6 font-semibold border-b p-3 bg-blue-500">
        <div>ID</div>
        <div>Name</div>
        <div>Quantity</div>
        <div>Price</div>
      </div>
      {data.map((product, index) => (
        <EditableProductList product={product} key={index} />
      ))}
      <DeleteButton />
    </>
  );
};

export default ProductsPage;
