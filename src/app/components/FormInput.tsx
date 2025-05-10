import { FromInputProps } from "../product/type";

const FormInput = ({ label, id, inputProps, defaultValue }: FromInputProps) => {
  return (
    <label htmlFor={id}>
      {label}
      <input
        {...inputProps}
        defaultValue={defaultValue}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </label>
  );
};

export default FormInput;
