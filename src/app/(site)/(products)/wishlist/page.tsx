import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button/button";
import { Price } from "@/app/_components/ui/price";
import wishlistModel from "@/models/Wishlist";
import { authUser } from "@/utils/serverHelpers";
import Link from "next/link";
import connectToDB from "../../../../../configs/db";

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
    wishes = await wishlistModel
      .find({ user: user._id }, "-__v")
      .populate("product", "name price score")
      .lean();
  }
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            لیست علاقه‌مندی‌های من
          </h1>
          <p className="text-gray-600">{wishes.length} مورد در لیست شما</p>
        </div>

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
                  <div
                    key={item._id}
                    className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                  >
                    {/* تصویر محصول */}
                    <div className="flex-shrink-0">
                      <img
                        className="h-24 w-24 rounded-lg object-cover border border-gray-200"
                        src={"/"}
                        alt={item.product.name}
                      />
                    </div>

                    {/* اطلاعات محصول */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-3">
                        <span className="text-xl font-semibold text-gray-900">
                          <Price price={item.product.price} />
                        </span>
                        {false && <Badge variant="error">ناموجود</Badge>}
                      </div>
                    </div>

                    {/* دکمه‌ها */}
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <Button
                        // onClick={() => removeFromWishlist(item.id)}
                        variant="error"
                        shape="square"
                        isOutline={true}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </Button>
                      <Button variant="success" disabled={false}>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        افزودن به سبد
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* خلاصه و اقدامات */}
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
    </div>
  );
};

export default Wishlist;
