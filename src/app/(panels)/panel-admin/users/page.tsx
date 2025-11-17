import userModel from "@/models/User";
import connectToDB from "../../../../../configs/db";
import PanelTitle from "../../_components/PanelTitle";
import UsersTable from "./_components/UsersTable";

const page = async () => {
  await connectToDB();
  const users = await userModel.find({}).lean();
  console.log(users);

  return (
    <>
      <PanelTitle title="لیست کاربران سایت" />

      <UsersTable users={JSON.parse(JSON.stringify(users))} />
    </>
  );
};

export default page;
