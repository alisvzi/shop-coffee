import commentModel from "@/models/Comment";
import ticketModel from "@/models/Ticket";
import wishlistModel from "@/models/Wishlist";
import { authUser } from "@/utils/serverHelpers";
import connectToDB from "../../../../configs/db";
import DashboardStatBox from "../_components/DashboardStatBox";
import Orders from "./_components/Orders/Orders";
import PanelTitle from "../_components/PanelTitle";
import Tickets from "./_components/Tickets/Tickets";

const page = async () => {
  await connectToDB();
  const user = await authUser();
  const tickets = await ticketModel
    .find({ user: user?._id })
    .limit(3)
    .populate("department", "title")
    .sort({ _id: -1 })
    .lean();
  const allTickets = await ticketModel.find({ user: user?._id });
  const allComments = await commentModel.find({ user: user?._id });
  const allWishes = await wishlistModel.find({ user: user?._id });
  const stats = [
    {
      title: "مجموع تیکت ها",
      value: allTickets.length,
      description: "تعداد کل تیکت‌های ثبت شده",
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
      title: "مجموع کامنت ها",
      value: allComments.length,
      description: "تعداد کل نظرات ثبت شده ",
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
      title: "مجموع علاقه‌مندی ها",
      value: allWishes.length,
      description: " تعداد کل محصولات مورد علاقه",
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

      <div className="flex my-6 gap-4">
        <div className="flex-1">
          <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
        </div>
        <div className="flex-1">
          <Orders />
        </div>
      </div>
    </>
  );
};

export default page;
