import { AddToCartButton } from "@/app/components/Buttons";
import { ProductData } from "@/app/product/type";

const CustomerProductList = ({ data }: { data: ProductData[] }) => {
  return (
    <>
     <h1 className="text-3xl font-semibold rounded-lg text-center m-6">Product List</h1>
      <div className="flex flex-wrap justify-start mx-auto w-full max-w-6xl gap-6">
        {data.map((item) => (
          <div
            key={item.productName}
            className="w-1/4 bg-white max-w-[250px] flex flex-col break-words"
          >
            <img
              alt="product image"
              src="https://fastly.picsum.photos/id/493/200/200.jpg?hmac=gTkCS4bzTaN0S0X4DVmbvEYkY0QxwyorqWjnxVNHtgg"
            ></img>
            <div>{item?.productName}</div>
            <div>€{item?.unitPrice}</div>
            <div>{item?.description}</div>
            <AddToCartButton product={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CustomerProductList;
