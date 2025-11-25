import { Accordion } from "@/app/_components/ui/accordion";
import type { Accordion as AccordionItem } from "@/types/accordion";

const faqs: AccordionItem[] = [
  {
    id: 1,
    title: "سفارش من چه زمانی ارسال می‌شود؟",
    content:
      "تمام سفارش‌ها در کمتر از ۲۴ ساعت پردازش و ارسال می‌شوند. زمان تحویل بسته به شهر شما بین ۱ تا ۳ روز کاری است.",
  },
  {
    id: 2,
    title: "آیا قهوه‌ها تازه‌برشت هستند؟",
    content:
      "بله، تمام محصولات در بازه‌های کوتاه برشته می‌شوند و پیش از ارسال با بسته‌بندی استاندارد حفظ تازگی می‌گردند.",
  },
  {
    id: 3,
    title: "آیا امکان انتخاب آسیاب وجود دارد؟",
    content:
      "بله، هنگام ثبت سفارش می‌توانید نوع آسیاب متناسب با دم‌آور خود (اسپرسو، فرنچ‌پرس، کمکس و ...) را انتخاب کنید.",
  },
  {
    id: 4,
    title: "شرایط مرجوعی چگونه است؟",
    content:
      "در صورت مشکل در کیفیت یا آسیب‌دیدگی بسته‌بندی، تا ۷ روز پس از دریافت سفارش می‌توانید درخواست مرجوعی ثبت کنید.",
  },
  {
    id: 5,
    title: "برای انتخاب قهوه مناسب چه کمکی دریافت می‌کنم؟",
    content:
      "با مطالعه بلاگ و راهنمای انتخاب قهوه یا تماس با پشتیبانی، می‌توانید متناسب با سلیقه و روش دم‌آوری‌تان انتخاب دقیق‌تری داشته باشید.",
  },
];

export const FAQSection: React.FC = () => {
  return (
    <section className="container py-20">
      <div className="flex flex-col xl:flex-row gap-4 justify-center xl:justify-between items-center mb-8">
        <div className="text-center xl:text-right">
          <h2 className="text-2xl font-extrabold">سوالات متداول</h2>
          <p className="mt-3 text-lg">
            رایج‌ترین پرسش‌ها درباره ارسال، تازگی برشت و انتخاب آسیاب
          </p>
        </div>
      </div>
      <Accordion data={faqs} />
    </section>
  );
};