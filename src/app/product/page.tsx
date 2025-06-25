import Form from "@/app/components/Form";
import { FormType } from "@/app/utils/formConfig";

const ProductPage = () => {
  return (
    <>
      <h1 className="text-3xl font-semibold rounded-lg text-center">
        Add a product
      </h1>
      <Form
        className="w-full max-w-md mx-auto p-6 rounded-lg space-y-4"
        type={FormType.ADD}
      />
    </>
  );
};

export default ProductPage;
