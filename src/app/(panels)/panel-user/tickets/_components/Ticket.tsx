// Ticket.js
import { Badge } from "@/app/_components/ui/badge";
import Link from "next/link";

const Ticket = ({ _id, title, createdAt, department, hasAnswer }) => {
  return (
    <Link href={`/panel-user/tickets/answer/${_id}`} className="block">
      <div className="flex justify-between items-center p-4 mb-3 bg-base-50 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
        <div>
          <p className="text-lg font-semibold text-base-content/80">{title}</p>
          <p className="text-sm text-base-content/60">{department.title}</p>
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
