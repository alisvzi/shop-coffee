import ticketModel from "@/models/Ticket";
import { authUser } from "@/utils/serverHelpers";
import connectToDB from "../../../../../configs/db";
import PanelTitle from "../../_components/PanelTitle";
import TicketList from "./_components/TicketList";

const page = async () => {
  await connectToDB();
  const user = await authUser();
  const tickets = await ticketModel
    .find({ user: user?._id, isAnswer: "" }, "-__v")
    .populate("department", "title")
    .sort({ _id: -1 });

  return (
    <>
      <PanelTitle
        title="همه تیکت‌ها"
        link="/panel-user/tickets/send-ticket"
        linkTitle="ارسال تیکت جدید"
      />
      <TicketList tickets={JSON.parse(JSON.stringify(tickets))} />
    </>
  );
};

export default page;
