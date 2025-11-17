import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="bg-base-100 text-base-content">
      <footer className="container flex flex-col lg:flex-row items-center gap-8 px-0 lg:px-12 xl:px-40 py-16">
        <div className="text-center flex flex-col items-center lg:me-20">
          <Image src="/images/coffee-svg-2.svg" width={180} height={36} alt="قهوه ست" />
          <p className="opacity-70 mt-2">
            فروشگاه تخصصی قهوه
            <br /> تجربه‌ای خوش‌طعم برای حرفه‌ای‌ها
          </p>
        </div>
        <div className="flex flex-1 flex-col md:flex-row gap-8 whitespace-nowrap">
          <div className="grid flex-1 basis-36 gap-3 place-items-center md:place-items-start">
            <Link href="/shop" className="link link-hover">فروشگاه</Link>
            <Link href="/wishlist" className="link link-hover">علاقه‌مندی‌ها</Link>
            <Link href="/cart" className="link link-hover">سبد خرید</Link>
          </div>
          <div className="grid flex-1 basis-36 gap-3 place-items-center md:place-items-start">
            <Link href="/blog" className="link link-hover">مطالب و مقالات</Link>
            <Link href="/about-us" className="link link-hover">درباره ما</Link>
            <Link href="/contact-us" className="link link-hover">تماس با ما</Link>
          </div>
          <div className="grid flex-1 basis-36 gap-3 place-items-center md:place-items-start">
            <Link href="/rules" className="link link-hover">قوانین و حریم خصوصی</Link>
          </div>
        </div>
      </footer>

      <div className="bg-base-200">
        <div className="container py-8 flex flex-col md:flex-row justify-between items-center">
          <span className="text-sm text-base-content/60 font-semibold">
            © {new Date().getFullYear()} قهوه ست — تمامی حقوق محفوظ است
          </span>
          <span className="text-sm text-base-content/60">طعم بهتر، روز بهتر</span>
        </div>
      </div>
    </div>
  );
};
