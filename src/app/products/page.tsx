import db from "@/lib/db";
import { DeleteButton } from "@/app/components/Buttons";
import List from "@/app/components/List";

const ProductsPage = async () => {
  const data = db.prepare("SELECT * FROM Product").all();

  return (
    <>
      <div className="grid grid-cols-6 font-semibold border-b p-3 bg-blue-500">
        <div>ID</div>
        <div>Name</div>
        <div>Quantity</div>
        <div>Price</div>
      </div>
      {data.map((product, index) => (
        <List product={product} key={index} />
      ))}
      <DeleteButton />
    </>
  );
};

export default ProductsPage;
