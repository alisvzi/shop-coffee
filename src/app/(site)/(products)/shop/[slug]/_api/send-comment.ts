import { createData } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";
import { TComment } from "../_types/send-comment.types";

const sendComment = (model: TComment): Promise<void> =>
  createData<TComment, void>("/comments", model);

type UseSignUpOptions = {
  onSuccess?: () => void;
};

export const useSendComment = ({ onSuccess }: UseSignUpOptions) => {
  const {
    mutate: submit,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: sendComment,
    onSuccess: onSuccess,
  });

  return {
    submit,
    isPending,
    isSuccess,
  };
};
