import Form from "@/app/components/Form";
import { FormType } from "@/app/utils/formConfig";

const ProductPage = () => {
  return (
    <>
      <div className="p-6 text-lg font-semibold rounded-lg text-center">
        Add a product
      </div>
      <Form
        className="w-full max-w-md mx-auto p-6 rounded-lg space-y-4"
        type={FormType.ADD}
      />
    </>
  );
};

export default ProductPage;
