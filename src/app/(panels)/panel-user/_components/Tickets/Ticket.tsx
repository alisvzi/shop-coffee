import Link from "next/link";

type TicketProps = {
  _id: string;
  title: string;
  department: string;
  hasAnswer: boolean;
  date: string | number | Date;
};

const Ticket = ({ _id, title, department, hasAnswer, date }: TicketProps) => {
  return (
    <Link
      href={`/panel-user/tickets/answer/${_id}`}
      className="flex justify-between bg-base-content text-base-25 p-4 rounded-md "
    >
      <div>
        <p>{title}</p>
        <p className="mt-2 bg-base-100 text-base-content px-2 py-1 text-center rounded-md text-sm ">
          {department}
        </p>
      </div>
      <div>
        <p>{new Date(date as string | number | Date).toLocaleString("fa-IR")}</p>
        <p className="mt-2 px-2 py-1 text-center text-sm">
          {hasAnswer ? " پاسخ داده شده" : "پاسخ داده نشده"}
        </p>
        {/* answer */}
      </div>
    </Link>
  );
};

export default Ticket;
