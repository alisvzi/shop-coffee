import Ticket from "./Ticket";

type TicketsProps = {
  tickets: Array<{
    _id: string;
    title: string;
    department: { title: string } | string;
    hasAnswer: boolean;
    createdAt: string | number | Date;
  }>;
};

const Tickets = ({ tickets }: TicketsProps) => {
  return (
    <div className="bg-base-300 p-6 space-y-2 rounded">
      <div className="flex justify-between font-bold border-b pb-2 mb-2">
        <span>تیکت‌های اخیر</span>
        <span>همه تیکت‌ها </span>
      </div>
      {tickets.map((ticket) => (
        <Ticket
          key={ticket._id}
          _id={ticket._id}
          title={ticket.title}
          department={
            typeof ticket.department === "string"
              ? ticket.department
              : ticket.department.title
          }
          hasAnswer={ticket.hasAnswer}
          date={ticket.createdAt}
        />
      ))}
    </div>
  );
};

export default Tickets;
