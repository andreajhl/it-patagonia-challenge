import { MouseEvent, ReactNode, TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string | ReactNode;
  errorMessage?: string;
  showErrorMessage?: boolean;
  action?: {
    iconClass?: string;
    handleClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  };
}
