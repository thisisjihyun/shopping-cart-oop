import AdminList from "@/app/products/components/AdminList";

const AdminProductList = ({ data }) => {
  return (
    <>
      <div className="grid grid-cols-6 font-semibold border-b p-3 bg-blue-500">
        <div>Name</div>
        <div>Quantity</div>
        <div>Price (€)</div>
      </div>
      {data.map((product, index) => (
        <AdminList product={product} key={index} />
      ))}
    </>
  );
};

export default AdminProductList;
