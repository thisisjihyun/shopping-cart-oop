import { FormData } from "./type";

export const defaultValues: FormData = {
  productId: "",
  productName: "",
  quantity: 1,
  unitPrice: 1,
};

export const formFields: Array<{
  id: "productId" | "productName" | "quantity" | "unitPrice";
  label: string;
  type: string;
  defaultValue: string | number;
}> = [
  {
    id: "productId",
    label: "Product Id",
    type: "text",
    defaultValue: "",
  },
  {
    id: "productName",
    label: "Product Name",
    type: "text",
    defaultValue: "",
  },
  {
    id: "quantity",
    label: "Quantity",
    type: "number",
    defaultValue: 1,
  },
  {
    id: "unitPrice",
    label: "Unit Price",
    type: "number",
    defaultValue: 1,
  },
];
