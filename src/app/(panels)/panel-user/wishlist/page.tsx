import { Button } from "@/app/_components/ui/button/button";
import wishlistModel from "@/models/Wishlist";
import { authUser } from "@/utils/serverHelpers";
import Link from "next/link";
import connectToDB from "../../../../../configs/db";
import PanelTitle from "../../_components/PanelTitle";
import WishCard from "./_component/WishCard";

type WishItem = {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    score?: number;
  };
};

const Wishlist = async () => {
  await connectToDB();
  let wishes: WishItem[] = [];
  const user = await authUser();
  if (user) {
    const raw = await wishlistModel
      .find({ user: user._id }, "-__v")
      .populate("product", "name price score")
      .lean();
    wishes = JSON.parse(JSON.stringify(raw)) as WishItem[];
  }
  return (
    <>
      <PanelTitle
        title="لیست علاقه‌مندی‌ها"
        subtitle={`${wishes.length} مورد در لیست شما`}
      />
      <div className="max-w-4xl mx-auto">
        {wishes.length <= 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900">
              لیست علاقه‌مندی شما خالی است
            </h3>
            <p className="mt-2 mb-10 text-gray-600">
              محصولات مورد علاقه خود را به این لیست اضافه کنید
            </p>
            <Link href={"/shop"}>
              <Button>مشاهده محصولات</Button>
            </Link>
          </div>
        ) : (
          <>
            {/* لیست محصولات */}
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                {wishes.map((item) => (
                  <WishCard
                    productID={String(item.product._id)}
                    name={item.product.name}
                    price={item.product.price}
                    key={String(item._id)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 bg-white shadow-sm rounded-lg p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-gray-600">مجموع قیمت:</p>
                  {/* <Price price={totalPrice} size="large" /> */}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Button>افزودن همه به سبد خرید</Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Wishlist;
