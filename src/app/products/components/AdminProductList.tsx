import AdminList from "@/app/products/components/AdminList";
import { ProductData } from "@/app/product/type";

const AdminProductList = ({ data }: { data: ProductData[] }) => {
  return (
    <>
     <h1 className="text-3xl font-semibold rounded-lg text-center m-10">Product List for Admin</h1>
      <div className="m-10">
        <div className="grid grid-cols-6 font-semibold border-b p-3 bg-blue-500">
          <div>Name</div>
          <div>Quantity</div>
          <div>Price (€)</div>
          <div>Description</div>
        </div>
        {data.map((product) => (
          <AdminList product={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default AdminProductList;
