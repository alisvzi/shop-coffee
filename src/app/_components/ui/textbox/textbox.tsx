/* eslint-disable react/display-name */
import classNames from "classnames";
import { forwardRef } from "react";
import { Size } from "../../types/size.type";
import { TextboxProps } from "./textbox.types";

const sizeClasses: Record<Size, string> = {
  tiny: "textbox-xs",
  small: "textbox-sm",
  normal: "textbox-md",
  large: "textbox-lg",
  xl: "textbox-xl",
};

export const Textbox: React.FC<TextboxProps> = forwardRef<
  HTMLInputElement,
  TextboxProps
>(
  (
    { variant = "ghost", type = "text", className, size = "normal", ...rest },
    ref
  ) => {
    const classes = classNames(
      "textbox",
      "w-full",
      className,
      { [`textbox-${variant}`]: variant },
      { [`${sizeClasses[size]}`]: size }
    );
    return <input ref={ref} type={type} className={classes} {...rest} />;
  }
);

export default Textbox;
