import { FormData } from "@/app/product/type";

export enum FormType {
  ADD = "add",
  EDIT = "edit",
}

export const defaultValues: FormData = {
  productName: "",
  quantity: 1,
  unitPrice: 1,
};

export const formFields: Array<{
  id: "productName" | "quantity" | "unitPrice";
  label: string;
  type: string;
  defaultValue: string | number;
}> = [
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
    label: "Unit Price (€)",
    type: "number",
    defaultValue: 1,
  },
];
