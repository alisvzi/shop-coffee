import productModel from "@/models/Product";
import ticketModel from "@/models/Ticket";
import userModel from "@/models/User";
import connectToDB from "../../../../configs/db";
import DashboardStatBox from "../_components/DashboardStatBox";
import PanelTitle from "../_components/PanelTitle";
import AreaChartWrapper from "../_components/charts/AreaChartWrapper";
import LineChartWrapper from "../_components/charts/LineChartWrapper";

const page = async () => {
  await connectToDB();
  const allTickets = await ticketModel.find({}).lean();
  const allProducts = await productModel.find({}).lean();
  const allUsers = await userModel.find({}).lean();

  const stats = [
    {
      title: " تیکت‌های دریافتی",
      value: allTickets.length,
      description: "تعداد کل تیکت‌های دریافت شده",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {/* Ticket icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8v8a2 2 0 002 2h14a2 2 0 002-2v-8a2 2 0 00-2-2H5a2 2 0 00-2 2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 12h.01M12 12h.01M17 12h.01"
          />
        </svg>
      ),
    },
    {
      title: " محصولات",
      value: allProducts.length,
      description: "مجموع محصولات سایت",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {/* Comment icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4-.8L3 20l1.8-4a7.97 7.97 0 01-1.8-5.2c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
    {
      title: "مجموع سفارشات",
      value: 21,
      description: "تعداد کل سفارشات ثبت شده",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {/* Shopping cart icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8M17 13l1.6 8M6 21a1 1 0 100-2 1 1 0 000 2zm12 0a1 1 0 100-2 1 1 0 000 2z"
          />
        </svg>
      ),
    },
    {
      title: " کاربرهای سایت",
      value: allUsers.length,
      description: "مجموع کاربر های سایت",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {/* Heart icon */}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z"
          />
        </svg>
      ),
    },
  ];

  const data = [
    {
      name: "02/1/1",
      current: 4000,
      prev: 2400,
    },
    {
      name: "02/2/1",
      current: 4300,
      prev: 4000,
    },
    {
      name: "02/3/1",
      current: 5000,
      prev: 4300,
    },
    {
      name: "02/4/1",
      current: 3800,
      prev: 5000,
    },
    {
      name: "02/5/1",
      current: 4200,
      prev: 3800,
    },
    {
      name: "02/6/1",
      current: 3900,
      prev: 4200,
    },
  ];

  const data2 = [
    {
      date: "02/1/1",
      sale: 2000,
    },
    {
      date: "02/1/2",
      sale: 3000,
    },
    {
      date: "02/1/3",
      sale: 3800,
    },
    {
      date: "02/1/4",
      sale: 2900,
    },
    {
      date: "02/1/5",
      sale: 4000,
    },
    {
      date: "02/1/6",
      sale: 3500,
    },
  ];
  return (
    <>
      <PanelTitle title="داشبورد" />
      <div className="flex flex-wrap gap-5 justify-center">
        {stats.map(({ title, value, description, icon }, index) => (
          <DashboardStatBox
            key={index}
            title={title}
            value={value}
            description={description}
            icon={icon}
          />
        ))}
      </div>

      <div className="mt-16 flex mb-6 gap-4">
        <div className="flex-1">
          <AreaChartWrapper
            title="نمودار فروش ماهانه"
            data={data2}
            xKey="date"
            dataKeys={[{ key: "sale", color: "#711D1C" }]}
            height={400}
          />
        </div>
        <div className="flex-1">
          <LineChartWrapper
            title="نرخ رشد"
            data={data}
            xKey="name"
            dataKeys={[
              { key: "prev", color: "#711D1C" },
              { key: "current", color: "#000" },
            ]}
            height={400}
          />
        </div>
      </div>
    </>
  );
};

export default page;
