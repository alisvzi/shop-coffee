import { Avatar } from "@/app/_components/ui/avatar";

const Answer = ({ type, variant, time = "8:56 1402/10/21", body }) => {
  const isUser = type === "user";

  return (
    <div className={`comment comment-${isUser ? "end" : "start"}`}>
      <div className="comment-image">
        <Avatar
          src={isUser ? "/images/shahin.jpg" : "/images/admin.jpg"}
          alt={isUser ? "User" : "Admin"}
          size="tiny"
          variant={variant}
        />
      </div>
      <div className="comment-header">
        {isUser ? "شاهین مشکل گشا" : "ادمین سایت"}
        <time className="text-xs opacity-50 mx-2">
          {new Date(time).toLocaleString("fa-IR")}
        </time>
      </div>
      <div className={`comment-bubble ${"comment-bubble-" + variant}`}>
        {body}
      </div>
      {/* {score && score > 0 && (
        <div className="comment-footer">
          <Rating variant="accent" size="tiny" rate={score!} />
        </div>
      )} */}
    </div>
  );
};

export default Answer;
