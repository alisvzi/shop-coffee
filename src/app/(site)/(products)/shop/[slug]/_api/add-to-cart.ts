import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import type { IProduct } from "@/types/product.interface";

const useAddToCart = () => {
  const { confirm } = useDialog();

  const showConfirmation = async () => {
    await confirm({
      title: "فزودن به سبد خرید",
      description: "با موفقیت به سبد خرید افزوده شد",
      confirmText: "فهمیدم",
      variant: "success",
      isQuestion: false,
    });
  };

  type CartItem = { id: string; name: string; price: number; count: number };

  const addToCart = async (
    product: Pick<IProduct, "_id" | "name" | "price">,
    count: number
  ) => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const productId = String(product._id);
    const existingItemIndex = cart.findIndex((item) => item.id === productId);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].count += count;
    } else {
      const cartItem: CartItem = {
        id: productId,
        name: product.name,
        price: product.price,
        count,
      };
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    await showConfirmation();
  };

  return addToCart;
};

export default useAddToCart;
