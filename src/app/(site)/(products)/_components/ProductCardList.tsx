import productModel from "@/models/Product";
import { CourseSummary } from "@/types/course-summary.interface";
import { ProductCard } from "./ProductCard";
import connectToDB from "../../../../../configs/db";

type CourseCardListProps = {
  courses: CourseSummary[];
};

export const ProductCardList: React.FC = async () => {
  await connectToDB();

  const products = await productModel
    .find({}, "img name weight price score")
    .sort({ _id: -1 })
    .limit(8)
    .lean();

  console.log(products);
  return (
    <div className="flex flex-wrap justify-center xl:justify-start gap-4 mt-10">
      {products.map((product) => (
        <ProductCard key={`product-${product._id}`} {...product} />
      ))}
    </div>
  );
};
