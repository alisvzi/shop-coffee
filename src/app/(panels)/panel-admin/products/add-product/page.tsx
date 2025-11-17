import PanelTitle from "@/app/(panels)/_components/PanelTitle";
import AddProductForm from "./_components/AddProductForm";

const AddProduct = () => {
  return (
    <>
      <PanelTitle
        title="افزودن محصول جدید"
        link="/panel-admin/products"
        linkTitle="لیست محصولات"
      />
      <AddProductForm />
    </>
  );
};

export default AddProduct;
