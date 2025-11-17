import PanelTitle from "@/app/(panels)/_components/PanelTitle";
import DiscountForm from "./_components/DiscountForm";

const page = () => {
  return (
    <>
      <PanelTitle
        title="افزودن تخفیف"
        link="/panel-admin/discounts"
        linkTitle=" همه تخفیف‌ها"
      />
      <DiscountForm />
    </>
  );
};

export default page;
