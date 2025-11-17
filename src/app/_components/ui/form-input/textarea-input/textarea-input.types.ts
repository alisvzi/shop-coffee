import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { TextboxProps } from "../../textbox/textbox.types";

export type TextareaInputProps<TFormValues extends FieldValues> = Omit<
  TextboxProps,
  "name"
> &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> & {
    register: UseFormRegister<TFormValues>;
    name: Path<TFormValues>;
    rules?: RegisterOptions<TFormValues, Path<TFormValues>>;
    errors: Partial<DeepMap<TFormValues, FieldError>>;
    variant?: string;
  };
