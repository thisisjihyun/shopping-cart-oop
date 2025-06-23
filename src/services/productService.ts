import Product from "@/domain/entities/Product";
import ProductItem, { ProductItemProps } from "@/domain/entities/ProductItem";
import db from "@/lib/db";

const getProductById = async (id: string) => {
  const getProduct = db.prepare("SELECT * FROM Product WHERE id = ?");
  const result = getProduct.get(id);
  return result;
};

const addProduct = async (product: ProductItemProps) => {
  const existingProduct = db
    .prepare("SELECT * FROM Product")
    .all() as ProductItemProps[];
  const products = existingProduct?.map((product) => new ProductItem(product));
  const productInstance = new Product(products);
  const newProductItem = new ProductItem(product);
  productInstance.addProduct(newProductItem);
  const updatedProduct = productInstance?.items?.map((item) => item.toObject());

  if (updatedProduct) {
    for (const item of updatedProduct) {
      const existing = db
        .prepare(
          `
        SELECT * FROM Product WHERE id = ?
      `
        )
        .get(item.id);

      if (existing) {
        const update = db.prepare(`
          UPDATE Product
          SET quantity = ?
          WHERE id = ?
        `);
        update.run(item.quantity, item.id);
      } else {
        const insert = db.prepare(`
          INSERT INTO Product (id,  productName, quantity, unitPrice)
          VALUES (@id, @productName, @quantity, @unitPrice)
        `);
        insert.run(item);
      }
    }
  }
  return updatedProduct;
};

const updateProduct = async (id: string, body: number) => {
  const updateQuantity = db.prepare(
    "UPDATE Product SET productName = ?, quantity = ?, unitPrice= ? WHERE id = ?"
  );
  const result = updateQuantity.run(
    body.productName,
    body.quantity,
    body.unitPrice,
    id
  );
  return result.changes > 0;
};

const deleteProduct = async (id: string): Promise<boolean> => {
  const deleteOrders = db.prepare("DELETE FROM CartItem WHERE productId = ?");
  const deleteProduct = db.prepare("DELETE FROM Product WHERE id = ?");
  deleteOrders.run(id);

  const result = deleteProduct.run(id);

  return result.changes > 0;
};

export { getProductById, addProduct, deleteProduct, updateProduct };
