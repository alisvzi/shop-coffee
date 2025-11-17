// TicketList.js
import Ticket from "./Ticket";

const TicketList = ({ tickets }) => {
  return (
    <>
      <div className="mb-6">
        {/* اگر بخواهید فیلتر اضافه کنید اینجا قرار دهید */}
      </div>

      <div className="max-w-3xl mx-auto">
        {tickets.length === 0 ? (
          <p className="text-center ">تیکتی وجود ندارد.</p>
        ) : (
          tickets.map((ticket) => (
            <Ticket
              key={ticket._id}
              _id={ticket._id}
              title={ticket.title}
              createdAt={ticket.createdAt}
              department={ticket.department}
              hasAnswer={ticket.hasAnswer}
            />
          ))
        )}
      </div>
    </>
  );
};

export default TicketList;
