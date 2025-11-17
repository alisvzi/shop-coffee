import { createData } from "@/core/http-service/http-service";
import { useMutation } from "@tanstack/react-query";
import { Signup } from "../_types/signup.types";

const signIn = (model: Signup): Promise<void> =>
  createData<Signup, void>("/auth/signup", model);

type UseSignUpOptions = {
  onSuccess?: () => void;
};

export const useSignUp = ({ onSuccess }: UseSignUpOptions) => {
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
