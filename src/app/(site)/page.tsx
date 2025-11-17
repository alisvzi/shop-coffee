import Link from "next/link";
import { IconArrowLeftFill } from "../_components/icons/icons";
import { Button } from "../_components/ui/button/button";
import { BlogPostCardList } from "./(blog)/_components/blog-post-card-list";
import { ProductCardList } from "./(products)/_components/ProductCardList";
import { HomeHeroSection } from "./_components/template/home-hero-section/home-hero-section";
import { PromoteSection } from "./_components/template/promote/promote-section";

export default async function Home() {
  return (
    <main className="">
      <HomeHeroSection />

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
    </main>
  );
}
