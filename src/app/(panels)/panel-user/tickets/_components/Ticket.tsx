// Ticket.js
import { Badge } from "@/app/_components/ui/badge";
import Link from "next/link";

type TicketProps = {
  _id: string;
  title: string;
  createdAt: string | number | Date;
  department: { title: string } | string;
  hasAnswer: boolean;
};

const Ticket = ({ _id, title, createdAt, department, hasAnswer }: TicketProps) => {
  return (
    <Link href={`/panel-user/tickets/answer/${_id}`} className="block">
      <div className="flex justify-between items-center p-4 mb-3 bg-base-50 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
        <div>
          <p className="text-lg font-semibold text-base-content/80">{title}</p>
          <p className="text-sm text-base-content/60">
            {typeof department === "string" ? department : department.title}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-base-content/50">
            {new Date(createdAt).toLocaleDateString("fa-IR")}
          </p>
          <Badge variant={hasAnswer ? "success" : "error"}>
            {hasAnswer ? "پاسخ داده شده" : "پاسخ داده نشده"}
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default Ticket;
