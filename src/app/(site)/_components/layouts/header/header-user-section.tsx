"use client";

import {
  IconBasket,
  IconHeart,
  IconUserProfile,
} from "@/app/_components/icons/icons";
import { Loading } from "@/app/_components/ui/loading";
import Link from "next/link";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";

interface IHeaderUserProps {
  isLogin: boolean;
}
const HeaderUserSection: React.FC<IHeaderUserProps> = ({ isLogin }) => {
  // const {data: session} = useSession();
  // const router = useRouter();
  // const [signOutState, action] = useFormState(logout, undefined);

  useEffect(() => {
    // if (signOutState?.isSuccess) {
    //     const fetchSession = async () => await getSession();
    //     fetchSession();
    //     router.push('/');
    // }
  }, [isLogin]);
  return (
    <>
      {isLogin ? (
        <>
          <div className="flex items-center gap-2">
            <Link
              href="/panel-user"
              className="flex gap-x-2 items-center hover:text-primary transition-colors p-2 hover:bg-base-25 active:bg-base-50 rounded-lg"
            >
              <IconUserProfile width={20} height={20} />
            </Link>
            <Link
              href="/wishlist"
              className="flex gap-x-2 items-center hover:text-primary transition-colors p-2 hover:bg-base-25 active:bg-base-50 rounded-lg"
            >
              <IconHeart width={20} height={20} />
            </Link>
            <Link
              href="/cart"
              className="flex gap-x-2 items-center hover:text-primary transition-colors p-2 hover:bg-base-25 active:bg-base-50 rounded-lg"
            >
              <IconBasket width={20} height={20} />
            </Link>
            {/* <LogoutButton /> */}
          </div>
        </>
      ) : (
        <Link
          href="/signin"
          className="flex gap-x-2 items-center hover:text-primary transition-colors p-2 hover:bg-base-25 active:bg-base-50 rounded-lg"
        >
          <IconUserProfile width={24} height={24} />
          ورود یا ثبت نام
        </Link>
      )}
    </>
  );
};

const LogoutButton = () => {
  const { pending } = useFormStatus();

  return (
    <button className="text-error">
      {pending && <Loading size="tiny" />}
      خروج از حساب کاربری
    </button>
  );
};

export default HeaderUserSection;
