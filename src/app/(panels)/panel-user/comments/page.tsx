import commentModel from "@/models/Comment";
import { authUser } from "@/utils/serverHelpers";
import { redirect } from "next/navigation";
import connectToDB from "../../../../../configs/db";
import PanelTitle from "../../_components/PanelTitle";
import CommentTable from "./_components/CommentsTable";

const Comments = async () => {
  await connectToDB();
  const user = await authUser();
  if (!user) {
    redirect("/signin");
  }

  const comments = await commentModel
    .find({ user: user._id }, "-__v")
    .populate("product", "name");

  return (
    <div>
      <PanelTitle title="لیست نظرات کاربران" />

      <CommentTable comments={JSON.parse(JSON.stringify(comments))} />
    </div>
  );
};

export default Comments;
