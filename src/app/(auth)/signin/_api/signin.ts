import { createData } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";
import { SignIn } from "../_types/signin.types";

const signIn = (model: SignIn): Promise<void> =>
  createData<SignIn, void>("/auth/signin", model);

type UseSignUpOptions = {
  onSuccess?: () => void;
};

export const useSignIn = ({ onSuccess }: UseSignUpOptions) => {
  const {
    mutate: submit,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: signIn,
    onSuccess: onSuccess,
  });

  return {
    submit,
    isPending,
    isSuccess,
  };
};
