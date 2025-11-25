"use client";

import { IconArrowLeftFill, IconBasket } from "@/app/_components/icons/icons";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button/button";
import { Rating } from "@/app/_components/ui/rating";
import Image from "next/image";
import Link from "next/link";
import HeroImg from "../../../../../../public/images/coffee-image-2.png";

export const HomeHeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/15 via-neutral/10 to-accent/10 py-12 md:py-20">
      <div className="container grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-5 xl:pr-6 text-center xl:text-right">
          <div className="flex items-center justify-center xl:justify-start gap-2">
            <Badge variant="ghost" size="small">
              تازه‌ و معطر
            </Badge>
            <Badge variant="neutral" size="small">
              ارسال ۲۴ ساعته
            </Badge>
          </div>
          <h1 className="text-3xl lg:text-5xl font-black text-base-content">
            قهوه ست؛ عطر و طعم حرفه‌ای‌ها
          </h1>
          <p className="text-lg md:text-xl leading-8 max-w-2xl mx-auto xl:mx-0">
            با انتخاب دانه‌های مرغوب و برشت تازه، تجربه‌ای متوازن از شیرینی،
            اسیدیته را در هر فنجان تحویل می‌گیرید. برای هر سلیقه انتخاب مناسب
            دارید.
          </p>
          <div className="mt-2 flex gap-4 justify-center xl:justify-start">
            <Link href="/shop">
              <Button
                variant="primary"
                size="large"
                className="btn-lg font-semibold"
              >
                خرید قهوه
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                variant="neutral"
                size="large"
                className="btn-lg font-semibold"
                animatedIcon
              >
                بلاگ قهوه
                <IconArrowLeftFill fill="currentColor" />
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center xl:justify-start gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Rating rate={5} size="small" className="justify-center" />
              <span>رضایت مشتریان ۴٫۸ از ۵</span>
            </div>
            <div className="flex items-center gap-2">
              <IconBasket width={18} height={18} />
              <span>بیش از ۴ نسل تجربه برشته‌کاری</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-2xl bg-base-100 p-3 shadow-lg max-w-[684px] h-[385px] overflow-hidden">
            <Image
              src={HeroImg}
              alt="coffee"
              fill
              placeholder="blur"
              className="object-cover rounded-2xl"
            />
          </div>
          <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-accent/20 rounded-full blur-lg"></div>
        </div>
      </div>
    </section>
  );
};
