import PanelTitle from "@/app/(panels)/_components/PanelTitle";
import departmentModel from "@/models/Department";
import subdepartmentModel from "@/models/SubDepartment";
import SendTicketForm from "./SendTicketForm";

const page = async () => {
  const department = await departmentModel.find({}, "-__v");
  const subdepartment = await subdepartmentModel.find({}, "-__v");
  console.log(department, "1");
  console.log(subdepartment, "2");
  return (
    <>
      <PanelTitle
        title="ارسال تیکت جدید"
        link="/panel-user/tickets"
        linkTitle="مشاهده همه‌ی تیکت‌ها"
      />
      <SendTicketForm
        departments={JSON.parse(JSON.stringify(department))}
        subdepartments={JSON.parse(JSON.stringify(subdepartment))}
      />
    </>
  );
};

export default page;
