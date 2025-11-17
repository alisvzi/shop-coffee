"use client";

import { Comment } from "@/app/_components/ui/comment";
import CommentsForm from "./CommentForm";

const ProductComments = ({ comments, productID }) => {
  // const { userName, date, email, body, score, product } = comments;

  return (
    <div className="flex flex-col md:flex-row justify-between gap-5">
      <div>
        {comments.map((comment) => {
          if (comment?.isAccept) {
            return <Comment key={`comment-${comment._id}`} {...comment} />;
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
