import { FieldValues, get } from "react-hook-form";
import { TextareaBox } from "../../textarea-box";
import { TextareaInputProps } from "./textarea-input.types";

const TextareaInput = <TFormValues extends FieldValues>({
  name,
  register,
  rules,
  errors,
  variant,
  ...rest
}: TextareaInputProps<TFormValues>) => {
  const error = get(errors, name);
  const hasError = !!error;
  return (
    <div>
      <TextareaBox
        {...register(name, rules)}
        {...(hasError ? { variant: "error" } : { variant: variant })}
        {...rest}
      />
      {hasError && <p className="mt-1 text-sm text-error">{error.message}</p>}
    </div>
  );
};

export default TextareaInput;
