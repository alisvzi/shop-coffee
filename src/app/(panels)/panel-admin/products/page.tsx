import productModel from "@/models/Product";
import connectToDB from "../../../../../configs/db";
import PanelTitle from "../../_components/PanelTitle";
import ProductsTable from "./_components/ProductsTable";

const page = async () => {
  await connectToDB();
  const products = await productModel
    .find({}, "name price score shortDesc")
    .sort({ _id: -1 });

  return (
    <>
      <PanelTitle
        title="لیست محصولات"
        link="/panel-admin/products/add-product"
        linkTitle="افزودن محصول جدید"
      />

      <ProductsTable products={JSON.parse(JSON.stringify(products))} />
    </>
  );
};

export default page;
