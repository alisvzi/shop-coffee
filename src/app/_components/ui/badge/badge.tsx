"use client";
import classNames from "classnames";
import React, { ReactNode } from "react";
import { ComponentBase } from "../../types/component-base.type";
import { Size } from "../../types/size.type";

const sizeClasses: Record<Size, string> = {
  tiny: "badge-xs",
  small: "badge-sm",
  normal: "badge-md",
  large: "badge-lg",
};

export type BadgeProps = Omit<ComponentBase, "isDisabled"> & {
  children: ReactNode;
};

export const Badge: React.FC<BadgeProps> = ({
  variant,
  className,
  children,
  size = "tiny",
}) => {
  const classes = classNames("badge", className, {
    [`badge-${variant}`]: variant,
    [`${sizeClasses[size]}`]: size,
  });

  return <span className={classes}>{children}</span>;
};
