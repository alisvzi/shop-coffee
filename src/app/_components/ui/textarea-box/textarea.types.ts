import { TextareaHTMLAttributes } from "react";
import { ComponentBase } from "../../types/component-base.type";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  ComponentBase;
