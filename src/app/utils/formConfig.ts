import { ProductData } from "@/app/product/type";

export enum FormType {
  ADD = "add",
  EDIT = "edit",
}

export const defaultValues: ProductData = {
  productName: "",
  quantity: 1,
  unitPrice: 1,
  description: "",
};

export const formFields: Array<{
  id: "productName" | "quantity" | "unitPrice" | "description";
  label: string;
  type: string;
  defaultValue: string | number;
}> = [
  {
    id: "productName",
    label: "Name",
    type: "string",
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
  {
    id: "description",
    label: "Description",
    type: "string",
    defaultValue: "",
  },
];
