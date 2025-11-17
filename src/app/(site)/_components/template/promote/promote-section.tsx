import { Button } from "@/app/_components/ui/button/button";
import Link from "next/link";

export const PromoteSection = () => {
  return (
    <section className="relative bg-base-100 my-20">
      {/* <div className="bg-base-content pointer-events-none absolute left-1/2 aspect-square w-1/2 -translate-x-1/2  rounded-full opacity-20 blur-3xl"></div> */}

      <div className="container flex flex-col md:flex-row justify-between gap-3.5">
        <div className="flex flex-col justify-between mt-10">
          <div>
            <span className="text-2xl font-extrabold text-center">
              خرید قهوه ، به سبک حرفه ای ها
            </span>
            <p className="mt-3 text-lg text-center">
              زیبایی امروز رو با قهوه “ست” کنید
            </p>
          </div>
          <img
            // className="h-[300px] w-[200px] object-cover"
            src="/images/coffee-image-1.png"
            alt="coffee"
          />
        </div>
        <div className="relative">
          <img
            className="rounded-tl-full"
            src="/images/clubset1.jpg"
            alt="coffee"
          />
          <div className="absolute bg-[#fafafa] bottom-0 p-6 rounded-tl-lg">
            <span className="text-2xl font-extrabold">باشگاه مشتریان ست</span>
            <p className="mt-3 text-lg">برای مشتریان وفادار قهوه ست</p>
          </div>
        </div>
      </div>
      <div className="container mt-20 flex flex-col md:flex-row justify-between items-center gap-10">
        <img
          className="hidden md:inline rounded-br-full"
          width={660}
          height={530}
          src="/images/Home32.jpg"
          alt=""
        />
        <section>
          <span className="block rounded-full w-16 h-16 bg-base-content"></span>
          <p className="mt-3 text-2xl font-extrabold">چرا قهوه ست</p>
          <p className="mt-3 text-lg">
            برخورداری از تجربه و قدمت کافی و آگاهی از ذایقه مصرف کنندگان راهنمای
            ما در برآورده ساختن نیاز مشتریان قهوه تخصصی (موج سوم) است .تجربه ای
            به قدمت چهار نسل و ارتباط مستمر با مصرف کنندگان قهوه ضامن این
            ویژگیها است.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/about-us">
              <Button
                variant="primary"
                size="large"
                className="btn-lg font-semibold"
              >
                بیشتر بخوانید
              </Button>
            </Link>
            <Link href="/category">
              <Button
                variant="neutral"
                size="large"
                className="btn-lg font-semibold"
              >
                فروشگاه
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
};
