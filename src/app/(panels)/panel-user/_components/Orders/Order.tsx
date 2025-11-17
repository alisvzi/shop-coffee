import { Price } from "@/app/_components/ui/price";
import Link from "next/link";

const Order = () => {
  return (
    <Link
      href={`/p-user/tickets/answer/2323`}
      className="flex justify-between bg-base-25 text-base-content p-4 rounded-md "
    >
      <div>
        <p>حجم بسته بندی</p>
        <p className="mt-2 px-2 py-1 text-center text-sm">تکمیل شده</p>
      </div>
      <div>
        <p>8:00 1402/10/21</p>
        <p className="mt-2 px-2 py-1 text-center text-sm">
          <Price price={120000} size="tiny" />
        </p>
        {/* answer */}
      </div>
    </Link>
  );
};

export default Order;
