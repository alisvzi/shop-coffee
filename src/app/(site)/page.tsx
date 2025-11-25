import Link from "next/link";
import { IconArrowLeftFill, IconBasket, IconStar, IconInfo } from "../_components/icons/icons";
import { Button } from "../_components/ui/button/button";
import { BlogPostCardList } from "./(blog)/_components/blog-post-card-list";
import { ProductCardList } from "./(products)/_components/ProductCardList";
import { HomeHeroSection } from "./_components/template/home-hero-section/home-hero-section";
import { PromoteSection } from "./_components/template/promote/promote-section";
import { FAQSection } from "./_components/template/faq/faq-section";

export default async function Home() {
  return (
    <main className="">
      <HomeHeroSection />
      <section className="container mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-base-100 border border-base-content/10">
            <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-primary/20 text-primary">
              <IconBasket width={20} height={20} />
            </span>
            <div>
              <p className="font-bold">ارسال سریع و مطمئن</p>
              <p className="text-sm">تحویل در کمتر از ۲۴ ساعت</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-base-100 border border-base-content/10">
            <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-accent/20 text-accent">
              <IconStar width={20} height={20} />
            </span>
            <div>
              <p className="font-bold">برشت تازه هر سفارش</p>
              <p className="text-sm">عطر و طعم پایدار در هر فنجان</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-base-100 border border-base-content/10">
            <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-neutral/30 text-base-content">
              <IconInfo width={20} height={20} />
            </span>
            <div>
              <p className="font-bold">تنوع تخصصی برای هر سلیقه</p>
              <p className="text-sm">اسپرسو، دمی و ترکیبات ویژه</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 container">
        <div className="bg-base-content pointer-events-none absolute left-1/2 aspect-square w-1/2 -translate-x-1/2  rounded-full opacity-20 blur-3xl"></div>
        <div className="flex flex-col xl:flex-row gap-4 justify-center xl:justify-between items-center">
          <div className="text-center xl:text-right">
            <h2 className="text-2xl font-extrabold">محصولات اخیر</h2>
            <p className="mt-3 text-lg">
              به رایگان، به‌روزترین مقاله‌های دنیای تکنولوژی رو در اختیارت
              می‌ذاریم؛ چون پیشرفتت برامون مهمه!
            </p>
          </div>
          <Link href="/shop">
            <Button
              variant="neutral"
              className="font-semibold"
              animatedIcon={true}
            >
              مشاهده بیشتر
              <IconArrowLeftFill fill="currentColor" />
            </Button>
          </Link>
        </div>
        <ProductCardList />
      </section>

      <PromoteSection />
      <section className="py-20 container">
        <div className="flex flex-col xl:flex-row gap-4 justify-center xl:justify-between items-center">
          <div className="text-center xl:text-right">
            <h2 className="text-2xl font-extrabold"> مقالات اخیر</h2>
            <p className="mt-3 text-lg">
              به رایگان، به‌روزترین مقاله‌های دنیای تکنولوژی رو در اختیارت
              می‌ذاریم؛ چون پیشرفتت برامون مهمه!
            </p>
          </div>
          <Button
            variant="neutral"
            className="font-semibold"
            animatedIcon={true}
          >
            مشاهده بیشتر
            <IconArrowLeftFill fill="currentColor" />
          </Button>
        </div>
        <BlogPostCardList />
      </section>
      <FAQSection />
    </main>
  );
}
