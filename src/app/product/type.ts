export interface ProductData {
  id?: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  description: string;
}

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement>;
type TextareaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export type FormInputProps =
  | {
      as?: "input";
      id: string;
      label?: string;
      inputProps?: InputFieldProps;
    }
  | {
      as: "textarea";
      id: string;
      label?: string;
      inputProps?: TextareaFieldProps;
    };
