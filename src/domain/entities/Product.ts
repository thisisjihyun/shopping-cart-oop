import ProductItem from "./ProductItem";

class Product {
  public items?: ProductItem[];

  constructor(items: ProductItem[]) {
    this.items = items;
  }
  toObject() {
    return {
      items: this.items?.map((item) => item.toObject()),
    };
  }

  addProduct(product: ProductItem) {
    const existingProductItem = this.items?.find(
      (item) => item.productId === product.productId
    );

    if (existingProductItem) {
      const existingItemIndex = this.items?.findIndex(
        (index) => index.productId === product.productId
      );

      if (existingItemIndex !== -1) {
        const increasedQuantityItem = new ProductItem(
          existingProductItem
        ).updateQuantity();
        this.items[existingItemIndex] = increasedQuantityItem;
        return this.items;
      }
    } else {
      this.items?.push(product);
      return this.items;
    }
  }

  updateProductItem() {}

  calculateTotalPrice() {}
  clearAllItems() {}
}

export default Product;
