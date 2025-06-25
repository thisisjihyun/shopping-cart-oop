export interface ProductData {
  id?: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  description: string;
}

export interface FromInputProps {
  label?: string;
  id: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  defaultValue?: string | number;
}
