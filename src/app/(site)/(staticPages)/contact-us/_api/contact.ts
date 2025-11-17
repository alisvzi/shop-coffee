import { createData } from "@/core/http-service/http-service";
import { IContact } from "@/types/contact.interface";
import { useMutation } from "@tanstack/react-query";

const contact = (model: IContact): Promise<void> =>
  createData<IContact, void>("/contact", model);

type UseContactOptions = {
  onSuccess?: () => void;
};

export const useContact = ({ onSuccess }: UseContactOptions) => {
  const {
    mutate: submit,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: contact,
    onSuccess: onSuccess,
  });

  return {
    submit,
    isPending,
    isSuccess,
  };
};
