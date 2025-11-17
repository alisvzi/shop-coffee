import ticketModel from "@/models/Ticket";
import { ITicket } from "@/types/ticket.interface";
import { authUser } from "@/utils/serverHelpers";
import { NextRequest } from "next/server";
import connectToDB from "../../../../configs/db";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const user = await authUser();
    const ticketBody: ITicket = await req.json();

    const { title, body, department, subdepartment, priority } = ticketBody;

    await ticketModel.create({
      title,
      body,
      department,
      subdepartment,
      priority,
      user: user?._id,
    });

    return Response.json(
      { message: "Ticket saved successfully :))" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
