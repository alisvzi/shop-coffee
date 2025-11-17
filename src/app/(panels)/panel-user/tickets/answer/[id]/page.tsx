import PanelTitle from "@/app/(panels)/_components/PanelTitle";
import ticketModel from "@/models/Ticket";
import connectToDB from "../../../../../../../configs/db";
import Answer from "../_component/Answer";
import { notFound } from "next/navigation";
export type PageProps = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const ticketID = resolvedParams.id;

  await connectToDB();
  const ticket = await ticketModel.findOne({ _id: ticketID });
  const answerTickets = await ticketModel.find({ mainTicket: ticketID });

  if (!ticket) {
    return notFound();
  }

  return (
    <>
      <PanelTitle
        title="تیکت تستی"
        link="/panel-user/tickets/send-ticket"
        linkTitle="ارسال تیکت جدید"
      />

      <div className="p-5 space-y-6 bg-gray-50 max-w-4xl mx-auto">
        <Answer variant={""} body={ticket.body} type={"user"} time={ticket.createdAt} />

        {answerTickets.length > 0 &&
          answerTickets.map((answerTicket) => (
            <Answer
              key={answerTicket._id.toString()}
              variant={answerTicket?.isAnswer === "user" ? "" : "primary"}
              body={answerTicket?.body}
              type={answerTicket?.isAnswer}
              time={answerTicket?.createdAt}
            />
          ))}
      </div>
    </>
  );
};

export default page;
