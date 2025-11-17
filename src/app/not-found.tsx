// "use client";

import Head from "next/head";
import Link from "next/link";
import { Button } from "./_components/ui/button/button";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>صفحه یافت نشد | set-coffee</title>
        <meta
          name="description"
          content="صفحه مورد نظر شما در کافی ام یافت نشد"
        />
      </Head>

      <main className=" flex flex-col bg-base-100 text-base-content items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="relative inline-block mb-6">
            <h1 className="text-8xl md:text-9xl font-bold text-primary">404</h1>
            <div className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-gradient-first to-gradient-second rounded-full"></div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            صفحه مورد نظر یافت نشد!
          </h2>

          <p className="text-lg md:text-xl text-neutral-content mb-8 max-w-md mx-auto">
            به نظر می‌رسد در جستجوی قهوه‌ای گم شده‌اید! صفحه‌ای که به دنبال آن
            هستید وجود ندارد یا حذف شده است.
          </p>

          <div className="text-5xl mb-8"></div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button isOutline variant="primary">
              بازگشت به صفحه قبل
            </Button>

            <Link href="/">
              <Button variant="primary">بازگشت به صفحه اصلی</Button>
            </Link>
          </div>

          {/* <div className="max-w-lg mx-auto mb-12">
            <form className="flex rounded-full overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="جستجو در سایت..."
                className="flex-grow px-6 py-3 bg-white text-base-content focus:outline-none"
              />
              <button
                type="button"
                className="px-6 bg-accent text-accent-content hover:bg-accent-focus transition-colors"
              >
                جستجو
              </button>
            </form>
          </div> */}

          {/* لینک‌های مفید */}
          {/* <div className="border-t border-[var(--color-base-200)] pt-8">
            <h3 className="text-xl font-semibold mb-4">صفحات پرکاربرد:</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/menu"
                className="px-4 py-2 bg-[var(--color-base-200)] hover:bg-[var(--color-base-300)] rounded-full transition-colors"
              >
                منوی قهوه
              </Link>
              <Link
                href="/branches"
                className="px-4 py-2 bg-[var(--color-base-200)] hover:bg-[var(--color-base-300)] rounded-full transition-colors"
              >
                شعبه‌ها
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 bg-[var(--color-base-200)] hover:bg-[var(--color-base-300)] rounded-full transition-colors"
              >
                تماس با ما
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 bg-[var(--color-base-200)] hover:bg-[var(--color-base-300)] rounded-full transition-colors"
              >
                وبلاگ
              </Link>
            </div>
          </div> */}
        </div>
      </main>
    </>
  );
}
