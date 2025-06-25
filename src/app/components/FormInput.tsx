import { FormInputProps } from "@/app/product/type";

const FormInput = ({ label, id, inputProps, as }: FormInputProps) => {
  return (
    <label htmlFor={id}>
      {label}
      {as === "textarea" ? (
        <textarea
          {...inputProps}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        <input
          {...inputProps}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}
    </label>
  );
};

export default FormInput;
