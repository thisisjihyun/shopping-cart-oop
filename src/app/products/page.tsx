import db from "@/lib/db";
import CustomerProductList from "./components/CustomerProductList";
import AdminProductList from "./components/AdminProductList";
import { getUserRole } from "./utils/getUserRole";

const ProductsPage = async () => {
  const userRole = await getUserRole();
  const data = db.prepare("SELECT * FROM Product").all();

  if (userRole === "admin") {
    return <AdminProductList data={data} />;
  } else {
    return <CustomerProductList data={data} />;
  }
};

export default ProductsPage;
