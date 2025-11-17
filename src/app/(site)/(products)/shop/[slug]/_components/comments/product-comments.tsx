"use client";

import { Comment } from "@/app/_components/ui/comment";
import CommentsForm from "./CommentForm";
import type { ObjectId } from "mongoose";

type CommentItem = {
  _id: string | ObjectId;
  userName: string;
  date: Date | string;
  email: string;
  body: string;
  score: number | null;
  isAccept: boolean;
};

const ProductComments = ({
  comments,
  productID,
}: {
  comments: CommentItem[];
  productID: string;
}) => {
  // const { userName, date, email, body, score, product } = comments;

  return (
    <div className="flex flex-col md:flex-row justify-between gap-5">
      <div>
        {comments.map((comment) => {
          if (comment?.isAccept) {
            return (
              <Comment key={`comment-${String(comment._id)}`} {...comment} />
            );
          }
        })}

        {/* <div>
        <TextPlaceholder />
      </div> */}
      </div>
      <CommentsForm productID={productID} />
    </div>
  );
};

export default ProductComments;
