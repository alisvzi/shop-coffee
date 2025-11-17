import { Tabs } from "@/app/_components/ui/tabs";
import productModel from "@/models/Product";
import { Tab } from "@/types/tab.type";

import connectToDB from "../../../../../../configs/db";
import ProductComments from "./_components/comments/product-comments";
import Details from "./_components/Details/Details";
import MoreInfo from "./_components/MoreInfo/MoreInfo";
import ProductGallery from "./_components/ProductGallery/ProductGallery";

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  await connectToDB();
  const { slug: productID } = await params;
  const product = await productModel.findOne({ _id: productID }).populate({
    path: "comments",
    options: { sort: { _id: -1 } },
  });
  const productDetails = JSON.parse(JSON.stringify(product));

  const tabs: Tab[] = [
    {
      label: "توضیحات",
      content: <div>{productDetails.longDesc}</div>,
    },
    {
      label: "توضیحات تکمیلی",
      content: <MoreInfo product={productDetails} />,
    },
    {
      label: "نظرات",
      content: (
        <ProductComments
          comments={productDetails.comments}
          productID={productDetails._id}
        />
      ),
    },
  ];

  return (
    <>
      <div className="container flex gap-10 py-10">
        <ProductGallery />
        <Details product={productDetails} />
      </div>

      <div className="container col-span-10 xl:col-span-6">
        <Tabs tabs={tabs} />
      </div>
    </>
  );
};

export default ProductDetails;
