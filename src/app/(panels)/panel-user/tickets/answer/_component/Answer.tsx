import { Variant } from "@/app/_components/types/variant.type";
import { Avatar } from "@/app/_components/ui/avatar";

type AnswerProps = {
  type: "user" | "admin" | "";
  variant?: Variant | "";
  time?: string | number | Date;
  body: string;
};

const Answer = ({
  type,
  variant,
  time = "8:56 1402/10/21",
  body,
}: AnswerProps) => {
  const isUser = type === "user";
  const avatarVariant: Variant | undefined = variant
    ? (variant as Variant)
    : undefined;
  const bubbleClass = variant
    ? `comment-bubble comment-bubble-${variant}`
    : "comment-bubble";

  return (
    <div className={`comment comment-${isUser ? "end" : "start"}`}>
      <div className="comment-image">
        <Avatar
          src={isUser ? "/images/shahin.jpg" : "/images/admin.jpg"}
          alt={isUser ? "User" : "Admin"}
          size="tiny"
          variant={avatarVariant}
        />
      </div>
      <div className="comment-header">
        {isUser ? " شما " : "ادمین سایت"}
        <time className="text-xs opacity-50 mx-2">
          {new Date(time).toLocaleString("fa-IR")}
        </time>
      </div>
      <div className={bubbleClass}>{body}</div>
      {/* {score && score > 0 && (
        <div className="comment-footer">
          <Rating variant="accent" size="tiny" rate={score!} />
        </div>
      )} */}
    </div>
  );
};

export default Answer;
