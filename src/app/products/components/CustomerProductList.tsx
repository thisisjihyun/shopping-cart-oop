import { AddToCartButton } from "@/app/components/Buttons";
// alignSelf: "center", // content vs self
const CustomerProductList = ({ data }) => {
  return (
    <div style={{ display: "flex" }}>
      {data.map((item) => (
        <div
          key={item.productName}
          style={{
            background: "lightyellow",
            color: "black",
            width: "250px",
            display: "flex",
            flexDirection: "column",
            margin: "10px",
          }}
        >
          <img
            alt="product image"
            src="https://fastly.picsum.photos/id/493/200/200.jpg?hmac=gTkCS4bzTaN0S0X4DVmbvEYkY0QxwyorqWjnxVNHtgg"
          ></img>
          <div>{item?.productName}</div>
          <div>€{item?.unitPrice}</div>
          <div>{item?.description}</div>
          <AddToCartButton product={item}>Add to Cart</AddToCartButton>
        </div>
      ))}
    </div>
  );
};

export default CustomerProductList;
