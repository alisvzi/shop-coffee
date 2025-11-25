import productModel from "@/models/Product";
import Link from "next/link";
import connectToDB from "../../../../../configs/db";
import { ProductCard } from "../_components/ProductCard";
import { ShopFilters } from "./_components/ShopFilters";
import { ShopHero } from "./_components/ShopHero";
import { ShopToolbar } from "./_components/ShopToolbar";

const Shop: React.FC<{
  searchParams?: Promise<Record<string, string>>;
}> = async ({ searchParams }) => {
  await connectToDB();

  const params = (await searchParams) || {};
  const q = params.q ?? "";
  const min = params.min ? Number(params.min) : undefined;
  const max = params.max ? Number(params.max) : undefined;
  const score = params.score ? Number(params.score) : undefined;
  const sort = params.sort ?? "latest";

  const query: Record<string, any> = {};
  if (q) query.name = { $regex: q, $options: "i" };
  if (min !== undefined || max !== undefined) {
    query.price = {};
    if (min !== undefined) query.price.$gte = min;
    if (max !== undefined) query.price.$lte = max;
  }
  if (score !== undefined) query.score = { $gte: score };

  const sortSpec: Record<string, 1 | -1> =
    sort === "price_asc"
      ? { price: 1 }
      : sort === "price_desc"
      ? { price: -1 }
      : sort === "score_desc"
      ? { score: -1 }
      : { _id: -1 };

  const products = await productModel
    .find(query, "img name weight price score")
    .sort(sortSpec)
    .lean();

  const maxAgg = await productModel.aggregate([
    { $group: { _id: null, maxPrice: { $max: "$price" } } },
  ]);
  const maxPrice = (maxAgg[0]?.maxPrice as number) ?? 1000000;

  const tagsAgg = await productModel.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags" } },
    { $sort: { _id: 1 } },
  ]);
  const tags: string[] = tagsAgg.map((t: { _id: string }) => t._id);

  return (
    <div className="container py-10">
      <ShopHero />
      <div className="mb-8">
        <p className="mt-2 text-lg opacity-80">انتخابی متناسب با هر ذائقه </p>
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tg) => (
              <Link
                key={tg}
                href={`/shop?tag=${encodeURIComponent(tg)}`}
                className="badge badge-ghost"
              >
                {tg}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <ShopFilters maxPrice={maxPrice} />
        <div className="flex-1">
          <ShopToolbar resultsCount={products.length} />
          <div className="flex flex-wrap justify-center xl:justify-start gap-4">
            {products.map((product) => (
              <ProductCard key={`product-${product._id}`} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shop;
