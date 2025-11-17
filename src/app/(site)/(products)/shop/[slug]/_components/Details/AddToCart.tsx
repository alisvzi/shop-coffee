"use client";

import { Button } from "@/app/_components/ui/button/button";
import useAuthUser from "@/hooks/useAuthUser";
import { useDialog } from "@/app/_components/ui/dialog/DialogProvider";
import { useState } from "react";
import useAddToCart from "../../_api/add-to-cart";

const AddToCart = ({ product }) => {
  const user = useAuthUser();
  const addToCart = useAddToCart();
  const [count, setCount] = useState<number>(1);
  const { confirm } = useDialog();

  const IconHeart = {
    fill: (
      <svg
        width={24}
        height={24}
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.206 4.793a5.938 5.938 0 0 0-4.21-1.754 5.9 5.9 0 0 0-3.995 1.558 5.904 5.904 0 0 0-6.279-1.1 5.942 5.942 0 0 0-1.93 1.3c-2.354 2.363-2.353 6.06.001 8.412L12 21.416l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416Z" />
      </svg>
    ),
    notFill: (
      <svg
        width={24}
        height={24}
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 4.597a5.904 5.904 0 0 0-6.278-1.1 5.942 5.942 0 0 0-1.93 1.3c-2.354 2.363-2.353 6.06.001 8.412l7.333 7.332a.995.995 0 0 0 1.32.382.99.99 0 0 0 .347-.299l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.21-1.754 5.9 5.9 0 0 0-3.995 1.558Zm6.791 1.61c1.564 1.571 1.564 4.025.003 5.588L12 18.588l-6.794-6.793c-1.562-1.563-1.56-4.017-.002-5.584a3.953 3.953 0 0 1 2.8-1.172c1.044 0 2.034.416 2.788 1.17l.5.5a1 1 0 0 0 1.415 0l.5-.5c1.511-1.509 4.074-1.505 5.583-.002Z" />
      </svg>
    ),
  };

  const addToWishlist = async () => {
    if (!user?._id) {
      await confirm({
        title: "نیاز به ورود",
        description: "برای افزودن به علاقه‌مندی‌ها ابتدا وارد شوید",
        isQuestion: false,
        variant: "warning",
        confirmText: "باشه",
      });
      return;
    }

    const wish = {
      user: user?._id,
      product: product?._id,
    };

    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wish),
    });

    if (res.status === 201) {
      await confirm({
        title: "افزوده شد",
        description: "به علاقه‌مندی‌ها اضافه شد",
        isQuestion: false,
        variant: "success",
        confirmText: "فهمیدم",
      });
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col md:flex-row gap-3">
        <div className="flex gap-1 items-center">
          <Button
            shape="square"
            onClick={() => setCount(count - 1)}
            disabled={count <= 0}
          >
            -
          </Button>
          <div className="w-[50px] h-[50px] border-2 border-primary/40 rounded-xl mx-2 content-center text-center">
            {count}
          </div>
          <Button shape="square" onClick={() => setCount(count + 1)}>
            +
          </Button>
        </div>
        <Button variant="primary" onClick={() => addToCart(product, count)}>
          افزودن به سبد خرید
        </Button>
      </div>

      <div>
        <Button isLink={true} onClick={addToWishlist}>
          {IconHeart.notFill}
          افزودن به علاقه مندی‌ها
        </Button>
      </div>
    </>
  );
};

export default AddToCart;
