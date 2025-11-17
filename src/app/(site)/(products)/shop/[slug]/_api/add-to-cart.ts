import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";

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

  const addToCart = async (product, count) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingItemIndex = cart.findIndex((item) => item.id === product._id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].count += count;
    } else {
      const cartItem = {
        id: product._id,
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
