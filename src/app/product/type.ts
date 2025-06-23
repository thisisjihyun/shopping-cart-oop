export interface FormData {
  id?: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface FromInputProps {
  label?: string;
  id: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  defaultValue?: string | number;
}
