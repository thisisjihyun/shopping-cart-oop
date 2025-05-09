// interface Price {
//   value: number;
//   currency: string;
// }

// interface ProductProps {
//   id: string;
//   name: string;
//   price: Price;
//   description: string;
// }

// class Product {
//   public readonly id: string;
//   public readonly name: string;
//   public readonly price: Price;
//   public readonly description: string;

//   constructor({ id, name, price, description }: ProductProps) {
//     if (price.value < 0) {
//       throw new Error("price can not be negative ");
//     }
//     this.id = id;
//     this.name = name;
//     this.price = { value: price.value, currency: "EUR" };
//     this.description = description;
//   }
// }

// export default Product;
