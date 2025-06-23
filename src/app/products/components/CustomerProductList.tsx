import { AddToCartButton } from "@/app/components/Buttons";

const CustomerProductList = ({ data }) => {
  return (
    <div style={{ display: "flex" }}>
      {data.map((item) => (
        <div
          style={{
            background: "lightyellow",
            color: "black",
            width: "250px",
            display: "flex",
            flexDirection: "column",
            margin: "10px",
          }}
        >
          <div
            style={{
              width: "200px",
              height: "200px",
              margin: "5px",
              background: "white",
              alignSelf: "center", // content vs self
            }}
          ></div>
          <div>{item?.productName}</div>
          {/* <div>{item?.quantity}</div> */}
          <div>€{item?.unitPrice}</div>
          <AddToCartButton product={item}>Add to Cart</AddToCartButton>
        </div>
      ))}
    </div>
  );
};

export default CustomerProductList;
