import { createData } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";
import { userType } from "./AccountDetailsForm";

const account = (model: userType): Promise<void> =>
  createData<userType, void>("/user", model);

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
