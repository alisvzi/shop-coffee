"use client";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button/button";
import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { Price } from "@/app/_components/ui/price";

const WishCard = ({
  name,
  price,
  productID,
}: {
  name: string;
  price: number;
  productID: string;
}) => {
  const { confirm } = useDialog();

  const removeFromWishlist = async (id: string) => {
    const ok = await confirm({
      title: "حذف محصول",
      description: "آیا مطمئن هستید که میخواهید این محصول حذف شود ؟",
      variant: "error",
    });

    if (ok) {
      fetch(`/api/wishlist/${id}`, {
        method: "DELETE",
      });

      location.reload();
    }
  };

  return (
    <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex-shrink-0">
        <img
          className="h-24 w-24 rounded-lg object-cover border border-gray-200"
          src={"/"}
          alt={name}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-gray-900 truncate">{name}</h3>
        <div className="mt-1 flex items-center gap-3">
          <span className="text-xl font-semibold text-gray-900">
            <Price price={price} />
          </span>
          {false && <Badge variant="error">ناموجود</Badge>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <Button
          onClick={() => removeFromWishlist(productID)}
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
  );
};

export default WishCard;
