/* eslint-disable react/display-name */
import classNames from "classnames";
import { forwardRef } from "react";
import { TextareaProps } from "./textarea.types";

export const TextareaBox: React.FC<TextareaProps> = forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ variant = "ghost", className, ...rest }, ref) => {
  const classes = classNames("areabox", "w-full", className, {
    [`areabox-${variant}`]: variant,
  });
  return <textarea ref={ref} className={classes} {...rest} />;
});

export default TextareaBox;
