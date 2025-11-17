import DiscountModel from "@/models/Discount";
import connectToDB from "../../../../../configs/db";
import PanelTitle from "../../_components/PanelTitle";
import DiscountsTable from "./_components/DiscountsTable";

const page = async () => {
  await connectToDB();
  const discounts = await DiscountModel.find({}).lean();

  return (
    <>
      <PanelTitle
        title="کدهای تخفیف"
        link="/panel-admin/discounts/add-discount"
        linkTitle="افزودن کد تخفیف جدید"
      />

      {discounts.length > 0 ? (
        <DiscountsTable discounts={JSON.parse(JSON.stringify(discounts))} />
      ) : (
        <p>کد تخفیفی وجود ندارد</p>
      )}
    </>
  );
};

export default page;
