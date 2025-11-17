import commentModel from "@/models/Comment";
import { authUser } from "@/utils/serverHelpers";
import connectToDB from "../../../../../configs/db";
import PanelTitle from "../../_components/PanelTitle";
import CommentTable from "./_components/CommentsTable";

const page = async () => {
  await connectToDB();
  const user = await authUser();

  const comments = await commentModel
    .find({}, "-__v")
    .populate("user")
    .populate("product", "name");

  return (
    <div>
      <PanelTitle title="لیست نظرات کاربران" />

      <CommentTable comments={JSON.parse(JSON.stringify(comments))} />
    </div>
  );
};

export default page;
