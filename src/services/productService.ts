import Product from "@/domain/entities/Product";
import ProductItem, { ProductItemProps } from "@/domain/entities/ProductItem";
import db from "@/lib/db";

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
        SELECT * FROM Product WHERE productId = ?
      `
        )
        .get(item.productId);

      if (existing) {
        const update = db.prepare(`
          UPDATE Product
          SET quantity = ?
          WHERE productId = ?
        `);
        update.run(item.quantity, item.productId);
      } else {
        const insert = db.prepare(`
          INSERT INTO Product (id, productId, productName, quantity, unitPrice)
          VALUES (@id, @productId, @productName, @quantity, @unitPrice)
        `);
        insert.run(item);
      }
    }
  }
  return updatedProduct;
};

const updateProductQuantity = async (itemId: string, quantity: number) => {
  const updateQuantity = db.prepare(
    "UPDATE Product SET quantity = ? WHERE productId = ?"
  );
  const result = updateQuantity.run(quantity, itemId);
  console.log("result", result);
  return result.changes > 0;
};

const deleteProduct = async (itemId: string): Promise<boolean> => {
  const deleteItem = db.prepare("DELETE FROM Product WHERE productId = ?");
  const result = deleteItem.run(itemId);
  return result.changes > 0;
};

export { addProduct, deleteProduct, updateProductQuantity };
