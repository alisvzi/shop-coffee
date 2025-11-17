import { createData } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";

const account = (model: ticketType): Promise<void> =>
  createData<ticketType, void>("/tickets", model);

type UseSignUpOptions = {
  onSuccess?: () => void;
};

export const useAccount = ({ onSuccess }: UseSignUpOptions) => {
  const {
    mutate: submit,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: account,
    onSuccess: onSuccess,
  });

  return {
    submit,
    isPending,
    isSuccess,
  };
};
