import Ticket from "./Ticket";

const Tickets = ({ tickets }) => {
  return (
    <div className="bg-base-300 p-6 space-y-2 rounded">
      <div className="flex justify-between font-bold border-b pb-2 mb-2">
        <span>تیکت‌های اخیر</span>
        <span>همه تیکت‌ها </span>
      </div>
      {console.log(tickets)}
      {tickets.map((ticket) => (
        <Ticket
          key={ticket._id}
          _id={ticket._id}
          title={ticket.title}
          department={ticket.department.title}
          hasAnswer={ticket.hasAnswer}
          date={ticket.createdAt}
        />
      ))}
    </div>
  );
};

export default Tickets;
