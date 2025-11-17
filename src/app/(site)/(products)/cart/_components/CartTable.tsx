import { Button } from "@/app/_components/ui/button/button";
import Link from "next/link";

type CartItem = {
  name: string;
  price: number;
  count: number;
  id?: string;
};

const CartTable = ({ cart }: { cart: CartItem[] }) => {
  return (
    <div className="flex-1 overflow-x-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-base-content/80">
        سبد خرید شما
      </h2>
      <table className="min-w-full border-collapse border border-base-content/30 text-right">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b border-base-content/30"></th>
            <th className="py-3 px-4 text-sm font-semibold text-base-content/60 border-b border-base-content/30">
              محصول
            </th>
            <th className="py-3 px-4 text-sm font-semibold text-base-content/60 border-b border-base-content/30">
              قیمت واحد
            </th>
            <th className="py-3 px-4 text-sm font-semibold text-base-content/60 border-b border-base-content/30">
              تعداد
            </th>
            <th className="py-3 px-4 text-sm font-semibold text-base-content/60 border-b border-base-content/30">
              جمع جزء
            </th>
          </tr>
        </thead>
        <tbody>
          {cart.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="text-center py-10 text-base-content/50"
              >
                سبد خرید شما خالی است.
              </td>
            </tr>
          )}
          {cart.map((item, index) => (
            <tr key={index} className="hover:bg-base-25 transition-colors">
              <td className="py-4 px-4 text-center">
                <button
                  className="text-error/80 hover:text-error transition text-xl font-bold"
                  // Implement remove item logic here
                  aria-label={`حذف ${item.name} از سبد خرید`}
                >
                  &times;
                </button>
              </td>
              <td className="py-4 px-4 flex items-center gap-4 whitespace-nowrap">
                <img
                  src="https://set-coffee.com/wp-content/uploads/2020/12/Red-box-DG--430x430.jpg"
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md shadow-sm"
                  loading="lazy"
                />
                <Link href="/">
                  <Button isLink>{item.name}</Button>
                </Link>
              </td>
              <td className="py-4 px-4 text-base-content/70 whitespace-nowrap">
                {item.price.toLocaleString()} تومان
              </td>
              <td className="py-4 px-4 whitespace-nowrap">
                <div className="inline-flex items-center border border-base-content/30 rounded-md overflow-hidden select-none">
                  <button
                    className="px-3 py-1 bg-gray-100 hover:bg-base-25 border-base-content/30 transition"
                    // Implement decrease count logic here
                    aria-label={`کاهش تعداد ${item.name}`}
                  >
                    -
                  </button>
                  <p className="px-5 py-1 text-center w-12 font-medium text-base-content/70">
                    {item.count}
                  </p>
                  <button
                    className="px-3 py-1 bg-gray-100 hover:bg-base-25 border-base-content/30 transition"
                    // Implement increase count logic here
                    aria-label={`افزایش تعداد ${item.name}`}
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="py-4 px-4 font-semibold text-base-content/90 whitespace-nowrap">
                {(item.count * item.price).toLocaleString()} تومان
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Actions Section */}
      <section className="mt-8 flex flex-col md:flex-row md:justify-between gap-4">
        <Button
          variant="ghost"
          isOutline
          // Implement update cart logic here
        >
          بروزرسانی سبد خرید
        </Button>
      </section>
    </div>
  );
};

export default CartTable;
