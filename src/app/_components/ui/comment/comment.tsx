import React from "react";
import { Avatar } from "../avatar";
import { Rating } from "../rating/rating";
import { CommentProps } from "./comment.types";

export const Comment: React.FC<CommentProps> = ({
  userName,
  date,
  score,
  body,
  variant = "neutral",
}) => {
  // const srcPath = userId ? API_URL + "/picture/" + userId : undefined;
  const srcPath = "";
  return (
    <div className={`comment comment-start`}>
      <div className="comment-image">
        <Avatar src={srcPath} size="tiny" variant={variant} />
      </div>
      <div className="comment-header">
        {userName}
        <time className="text-xs opacity-50 mx-2">
          {new Date(date).toLocaleString("fa-IR")}
        </time>
      </div>
      <div className={`comment-bubble ${"comment-bubble-" + variant}`}>
        {body}
      </div>
      {score && score > 0 && (
        <div className="comment-footer">
          <Rating variant="accent" size="tiny" rate={score!} />
        </div>
      )}
    </div>
  );
};
