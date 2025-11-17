import ticketModel from "@/models/Ticket";
import connectToDB from "../../../../../configs/db";
import PanelTitle from "../../_components/PanelTitle";
import TicketsTable from "./_components/TicketsTable";

const page = async () => {
  await connectToDB();
  const tickets = await ticketModel
    .find({ isAnswer: "" })
    .populate("user")
    .populate("department")
    .sort({ _id: -1 })
    .lean();

  console.log(tickets);

  return (
    <>
      <PanelTitle title="لیست تیکت‌ها" />

      <TicketsTable tickets={JSON.parse(JSON.stringify(tickets))} />
    </>
  );
};

export default page;
