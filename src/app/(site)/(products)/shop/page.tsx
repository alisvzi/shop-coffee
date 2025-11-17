import productModel from "@/models/Product";
import connectToDB from "../../../../../configs/db";
import { ProductCard } from "../_components/ProductCard";

const Shop: React.FC = async () => {
  await connectToDB();

  const products = await productModel
    .find({}, "img name weight price score")
    .sort({ _id: -1 })
    .lean();

  return (
    <div className="flex flex-col lg:flex-row gap-6 container py-10">
      <aside className="w-full lg:w-[20%] bg-base-100 rounded-xl border border-base-200 p-4 space-y-6">
        <h3 className="text-lg font-semibold">فیلترها</h3>
        <div>
          <label className="block text-sm mb-2">نام محصول</label>
          <input
            type="text"
            placeholder="جستجو..."
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm mb-2">قیمت</label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder="حداقل"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              placeholder="حداکثر"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-2">امتیاز</label>
          {/* <RadioRating value={null} onChange={() => {}} size="small" /> */}
        </div>
        <button className="btn btn-primary w-full">اعمال فیلتر</button>
      </aside>
      <div className="flex-1 flex flex-wrap justify-center xl:justify-start gap-4">
        {products.map((product) => (
          <ProductCard key={`product-${product._id}`} {...product} />
        ))}
      </div>
    </div>
  );
};
export default Shop;
